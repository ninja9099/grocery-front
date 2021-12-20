import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryRoutingModule } from './grocery-routing.module';
import { GroceryManagementComponent } from './grocery-management/grocery-management.component';
import {GroceryService} from "./grocery.service";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GroceryManagementComponent
  ],
    imports: [
        CommonModule,
        GroceryRoutingModule,
        CoreModule,
        SharedModule,
        FormsModule
    ],
  providers: [
    GroceryService
  ]
})
export class GroceryModule { }
