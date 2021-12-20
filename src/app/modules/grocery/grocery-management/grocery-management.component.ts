import {Component, OnInit} from '@angular/core';
import {GroceryService} from "../grocery.service";
import {BehaviorSubject} from "rxjs";
import {IGroceryListResults} from "../grocery.model";
import {environment} from "../../../../environments/environment";
import {Path} from "../../../core/structs";

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

  constructor() { }

  ngOnInit(): void {
  }

  onResult($event) {
    debugger;
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
}
