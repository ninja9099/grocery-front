import { Injectable } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Path} from "../../core/structs";
import {IGroceryListResponse} from "./grocery.model";
import {Observable} from "rxjs";

@Injectable()
export class GroceryService {
    constructor(public apiService: ApiService) {
    }
    getGroceryLists(queryParams: any): Observable<IGroceryListResponse> {
        return this.apiService.get(Path.groceryList, queryParams);
    }
    deleteGroceryLists(id: string){
      return this.apiService.delete(`${Path.base}${Path.groceryList}${id}`)
    }
    createGroceryList(name: string, dueDate: string){
      let formData = new FormData()
      formData.set('name', name);
      if(dueDate){
        formData.set('due_date', dueDate);
      }
      return this.apiService.post(`${Path.base}${Path.groceryList}`, formData)
    }
}
