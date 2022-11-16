import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './admin/test/test.component';
import {SharedModule} from "./shared/shared.module";
import { AddOrEditComponent } from './admin/test/add-or-edit/add-or-edit.component';
import {CoreModule} from "./core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AddOrEditComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        SharedModule,
        CoreModule,
        ReactiveFormsModule,
        TranslocoRootModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
