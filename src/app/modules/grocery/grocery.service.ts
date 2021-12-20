import { Injectable } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Path} from "../../core/structs";
import {IGroceryListResponse} from "./grocery.model";
import {Observable} from "rxjs";

@Injectable()
export class GroceryService {
    constructor(public apiService: ApiService) {
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
    getGroceryListDetails(groceryListId: string){
      return this.apiService.get(`${Path.base}${Path.groceryList}${groceryListId}`, {})
    }

    getGroceryItems(groceryListId: string){
      return this.apiService.get(`${Path.base}${Path.groceryList}${groceryListId}/grocery_items`, {})
    }

    createGroceryListItem(formData: FormData){
      return this.apiService.post(`${Path.base}${Path.groceryListItem}`, formData)
    }

    editGroceryListItem(groceryListId: string){
      return this.apiService.put(`${Path.base}${Path.groceryListItem}`, {})
    }

    deleteGroceryListItem(groceryListId: string){
      return this.apiService.delete(`${Path.base}${Path.groceryListItem}`, {})
    }
}
