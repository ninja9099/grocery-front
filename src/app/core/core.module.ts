import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TwoDigitPipe} from "./pipe/two-digit.pipe";
import {SafeHtmlPipe} from "./pipe/safe.html.pipe";
import {ControlDirective} from "./directives/dynamic.directive";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {DataService} from "./services/data.service";
import {ApiService} from "./services/api.service";
import {ErrorService} from "./services/error.service";
import {LoaderInterceptorService} from "./services/loader-interceptor.service";
import {UtilityService} from "./services/utility.service";
import {AuthGuard} from "./guards/auth.guard";
import {TokenService} from "./services/token.service";

@NgModule({
  declarations: [
    TwoDigitPipe,
    SafeHtmlPipe,
    ControlDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    ApiService,
    ErrorService,
    UtilityService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
    exports: [
        TwoDigitPipe,
        SafeHtmlPipe,
        ControlDirective,
    ]
})
export class CoreModule {}
