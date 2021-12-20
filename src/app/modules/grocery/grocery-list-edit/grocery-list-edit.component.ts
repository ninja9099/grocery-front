import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroceryService} from "../grocery.service";
import {ToastrService} from "ngx-toastr";
import {IGroceryListItem, IGroceryListResults} from "../grocery.model";

@Component({
  selector: 'app-grocery-list-edit',
  templateUrl: './grocery-list-edit.component.html',
  styleUrls: ['./grocery-list-edit.component.scss']
})
export class GroceryListEditComponent implements OnInit {

  public groceryListId: string;
  public groceryListItems: IGroceryListItem[];
  public groceryListDetails: IGroceryListResults;
  constructor(
    private route: ActivatedRoute,
    private groceryService: GroceryService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      debugger;
      this.groceryListId = params.id;
      this.getGroceryListDetails(this.groceryListId)
      this.getGroceryListItems(this.groceryListId)
    });
  }

  getGroceryListDetails(groceryListId: string){
    this.groceryService.getGroceryListDetails(groceryListId).subscribe(res =>{
      this.groceryListDetails = res.body;
    })
  }


  getGroceryListItems(groceryListId: string){
    this.groceryService.getGroceryItems(groceryListId).subscribe( res =>{
      this.groceryListItems = res.body;
    })
  }
}
