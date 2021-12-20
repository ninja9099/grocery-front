import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GroceryService} from "../grocery.service";
import {BehaviorSubject} from "rxjs";
import {IGroceryListResults} from "../grocery.model";
import {environment} from "../../../../environments/environment";
import {Path} from "../../../core/structs";
import {ToastrService} from "ngx-toastr";
import {IDatePickerConfig} from "ng2-date-picker";

declare var $: any;

@Component({
  selector: 'app-grocery-management',
  templateUrl: './grocery-management.component.html',
  styleUrls: ['./grocery-management.component.scss']
})
export class GroceryManagementComponent implements OnInit {

  public groceryList: IGroceryListResults[];
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
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.dueDate = new Date().toISOString();
    this.initDatePicker()
  }

  onResult($event) {
    this.groceryList = $event.results;
    this.total = $event.count;
  }

  Display($event) {
    this.display = $event;
  }

  displayStr() {
    if (this.display !== undefined && this.groceryList !== undefined) {
      if (this.total === 0) {
        return 'Showing 0-0 lists of 0 Lists';
      } else {
        if ((this.itemsPerPage + parseInt(this.display.offset, 10)) > this.total) {
          return `Showing ${this.display.offset + 1}-${this.total} lists of ${this.total} GroceryLists`;
        } else {
          return `Showing ${this.display.offset + 1}-${this.itemsPerPage + this.display.offset} model of ${this.total} models`;
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
}
