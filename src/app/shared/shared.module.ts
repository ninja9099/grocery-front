import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PaginationComponent} from './pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "./loader/loader.component";


@NgModule({
  declarations: [
    PaginationComponent,
    LoaderComponent
  ],
  exports: [
    PaginationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class SharedModule {
}
