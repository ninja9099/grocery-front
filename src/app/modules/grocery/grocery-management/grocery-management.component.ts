import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GroceryService} from "../grocery.service";
import {BehaviorSubject} from "rxjs";
import {IGroceryListResults} from "../grocery.model";
import {environment} from "../../../../environments/environment";
import {Path} from "../../../core/structs";
import {ToastrService} from "ngx-toastr";
import {IDatePickerConfig} from "ng2-date-picker";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-grocery-management',
  templateUrl: './grocery-management.component.html',
  styleUrls: ['./grocery-management.component.scss']
})
export class GroceryManagementComponent implements OnInit {

  public groceryList: IGroceryListResults[];
  public groceryListOriginal: IGroceryListResults[];
  public itemsPerPage = 10;
  public changes = new BehaviorSubject<any>([{key: 'limit', value: 3}]);
  public total = 0;
  public display: any;
  public currentPage = 1;
  public url = environment.baseUrl + Path.base + Path.groceryList;
  public queryParams = [{key: 'limit', value: this.itemsPerPage}];
  public newGroceryName: string;
  public dueDate: string;

  constructor(
    private groceryService: GroceryService,
    private toast: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initDatePicker()
  }

  onResult($event) {
    this.groceryList = $event.results;
    this.groceryListOriginal = $event.results;
    this.total = $event.count;
  }

  Display($event) {
    this.display = $event;
  }

  displayStr() {
    if (this.display !== undefined && this.groceryList !== undefined) {
      if (this.total === 0) {
        return 'Showing 0-0 GroceryLists of 0 GroceryLists';
      } else {
        if ((this.itemsPerPage + parseInt(this.display.offset, 10)) > this.total) {
          return `Showing ${this.display.offset + 1}-${this.total} lists of ${this.total} GroceryLists`;
        } else {
          return `Showing ${this.display.offset + 1}-${this.itemsPerPage + this.display.offset} GroceryList of ${this.total} GroceryLists`;
        }
      }
    } else {
      return '';
    }
  }

  createGroceryList(name: string, dueDate: string) {
    this.groceryService.createGroceryList(name, dueDate).subscribe(res => {
      this.toast.success("List created successfully", "Success :)");
      location.reload();
    }, error => {
      this.toast.error("Error creating List", "Error :(");
    })
  }

  deleteGroceryList(id: string) {
    this.groceryService.deleteGroceryLists(id).subscribe(res => {
      this.toast.success("List Deleted successfully", "Success :)");
    }, error => {
      this.toast.error("Error deleting List", "Error :(");
    })
  }

  editGroceryList(id: string) {
    this.router.navigate(['grocery', id])
  }

  initDatePicker() {
    function formatDate(date) {
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear()
      );
    }

    var currentDate = formatDate(new Date());
    $(".due-date-button").datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      startDate: currentDate,
      orientation: "bottom right"
    });
    var self = this;
    $(".due-date-button").on("click", function (event) {
      $(".due-date-button")
        .datepicker("show")
        .on("changeDate", function (dateChangeEvent) {
          $(".due-date-button").datepicker("hide");
          $(".due-date-label").show().text(formatDate(dateChangeEvent.date));
          self.dueDate = dateChangeEvent.date.toISOString();
        });
    });
  };

  filterGroceryList(event) {
    if (event.target.value === 'all') {
      this.changes.next(this.queryParams)
      return
    }

    let queryParams = this.queryParams;
    queryParams.push({key: 'status', value: event.target.value})
    this.changes.next(queryParams)
    // // filters the list locally
    // this.groceryList = this.groceryListOriginal;
    // if (event.target.value === 'all'){
    //   return;
    // }
    // this.groceryList = this.groceryListOriginal.filter(item => item.status === event.target.value)
  }
}
