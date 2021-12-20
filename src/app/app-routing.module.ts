import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PRIVATE_ROUTES, PUBLIC_ROUTES} from "./router";

@NgModule({
  imports: [RouterModule.forRoot(
    [...PUBLIC_ROUTES, ...PRIVATE_ROUTES ], {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
