import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroceryManagementComponent} from "./grocery-management/grocery-management.component";

const routes: Routes = [
  {
    path: '',
    component: GroceryManagementComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
