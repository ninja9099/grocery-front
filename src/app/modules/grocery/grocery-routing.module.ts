import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroceryManagementComponent} from "./grocery-management/grocery-management.component";
import {GroceryListEditComponent} from "./grocery-list-edit/grocery-list-edit.component";

const routes: Routes = [
  {
    path: '',
    component: GroceryManagementComponent,
    pathMatch: 'full'
  },
  {
    path: 'grocery/:id',
    component: GroceryListEditComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
