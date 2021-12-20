import {Component, ComponentRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroceryService} from "../grocery.service";
import {ToastrService} from "ngx-toastr";
import {IGroceryListItem, IGroceryListResults} from "../grocery.model";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-grocery-list-edit',
  templateUrl: './grocery-list-edit.component.html',
  styleUrls: ['./grocery-list-edit.component.scss']
})
export class GroceryListEditComponent implements OnInit {
  public mode: string;
  public groceryListId: string;
  public groceryListItemsOriginal: IGroceryListItem[];
  public groceryListItems: IGroceryListItem[];
  public groceryListDetails: IGroceryListResults;
  public currentItem: IGroceryListItem;
  windowRef = null;
  modalRef2: BsModalRef;
  ref: ComponentRef<any>;
  createEditForm: FormGroup;
  @ViewChild('createEditPopup') createEditPopup: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private groceryService: GroceryService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createEditForm = this.fb.group({
      grocery_list: ['', Validators.required],
      name: ['', Validators.required],
      unit_of_measure: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groceryListId = params.id;
      this.getGroceryListDetails(this.groceryListId)
      this.getGroceryListItems(this.groceryListId)
    });
  }

  filterGroceryList(event) {
    if (event.target.value === 'all'){
      this.groceryListItems = this.groceryListItemsOriginal;
      return;
    }
    this.groceryListItems = this.groceryListItemsOriginal;
    this.groceryListItems = this.groceryListItems.filter(item => item.status === event.target.value)
  }

  getGroceryListDetails(groceryListId: string) {
    this.groceryService.getGroceryListDetails(groceryListId).subscribe(res => {
      this.groceryListDetails = res.body;
    })
  }

  getGroceryListItems(groceryListId: string) {
    this.groceryService.getGroceryItems(groceryListId).subscribe(res => {
      this.groceryListItems = res.body;
      this.groceryListItemsOriginal = this.groceryListItems;
    })
  }

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {
      backdrop: 'static',
      class: 'modal-lg',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true
    };
    this.modalRef2 = this.modalService.show(template, config);
  }

  public closeModel(modalRef: BsModalRef<any>) {
    if (!modalRef) {
      return;
    }
    modalRef.hide();
    modalRef = null;
  }

  addNewItem() {
    this.mode = 'create';
    this.createEditForm.patchValue({
      grocery_list: this.groceryListId,
    })
    this.openModal(this.createEditPopup)
  }

  editItem(itemId: number) {
    this.currentItem = this.groceryListItems.filter(item => item.id === itemId)[0]
    this.mode = 'edit';
    this.openModal(this.createEditPopup)
    this.createEditForm.patchValue({
      grocery_list: this.groceryListId,
      name: this.currentItem.name,
      unit_of_measure: this.currentItem.unit_of_measure,
      quantity: this.currentItem.quantity,
    });
  }

  onSubmit(event) {
    const formData = this.createEditForm.value;
    if (this.mode == 'create') {
      this.groceryService.createGroceryListItem(formData).subscribe(res => {
        this.groceryListItems.push(res.body);
        this.closeModel(this.modalRef2)
        this.toast.success("Item created successfully", "Success!")
      }, error => {
        this.toast.error(JSON.stringify(error.error()), "Error!")
      });
    } else {
      this.groceryService.editGroceryListItem(this.currentItem.id, formData).subscribe(res => {
        this.groceryListItems = this.groceryListItems.filter(item => item.id !== this.currentItem.id)
        this.groceryListItems.push(res.body)
        this.closeModel(this.modalRef2)
        this.toast.success("Item updated successfully", "Success!")

      }, error => {
        this.toast.error("Error updating item", "Error!")
      });
    }
  }

  deleteGroceryListItem(GroceyListItemId: number) {
    this.groceryService.deleteGroceryListItem(GroceyListItemId).subscribe(res => {
      this.toast.success("Item deleted successfully", "Success!")
      this.groceryListItems = this.groceryListItems.filter(item => item.id !== GroceyListItemId)
      this.closeModel(this.modalRef2)
    }, error => {
      this.toast.error("Error deleting item", "Error!")
    })
  }

  toggleItemStatus(GroceyListItemId) {
    const currentItem = this.groceryListItems.filter(item => item.id === GroceyListItemId)[0]
    const status = currentItem.status === 'pending' ? 'done' : 'pending';
    const formData = new FormData();
    formData.set('status', status)
    this.groceryService.editGroceryListItem(GroceyListItemId, formData).subscribe(res => {
      this.toast.success("Item updated successfully", "Success!")
      this.groceryListItems = this.groceryListItems.filter(item => item.id !== GroceyListItemId)
      this.groceryListItems.push(res.body);
    }, error => {
      this.toast.error("Error updating item", "Error!")
    })
  }
}
