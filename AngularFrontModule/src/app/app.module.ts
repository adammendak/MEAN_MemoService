import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { MemosComponent } from './memos/memos.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { WelcomeComponent } from './welcome/welcome.component';
import { AddMemosComponent } from './memos/add-memos/add-memos.component';
import { ToastrModule } from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {UserModule} from "./user/user.module";
import {HttpModule} from "@angular/http";
import {UserService} from "./user/user.service";
import {MemosService} from "./memos/memos.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    MemosComponent,
    WelcomeComponent,
    AddMemosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      preventDuplicates: true
    })
  ],
  providers: [
    UserService,
    MemosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
