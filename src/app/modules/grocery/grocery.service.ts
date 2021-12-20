import { Injectable } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Path} from "../../core/structs";
import {IGroceryListResponse} from "./grocery.model";
import {Observable} from "rxjs";

@Injectable()
export class GroceryService {
    constructor(public apiService: ApiService) {
    }
    // getGroceryLists(queryParams: any): Observable<IGroceryListResponse> {
    //     return this.apiService.get(Path.groceryList, queryParams);
    // }
}
