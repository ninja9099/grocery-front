import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, DecimalPipe} from "@angular/common";
import {CoreModule} from "./core/core.module";
import {LoaderService} from "./core/services/loader.service";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [LoaderService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
