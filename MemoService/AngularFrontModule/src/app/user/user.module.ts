import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { userRoutes } from "./userRoutes";

@NgModule({
  declarations: [
    LoginUserComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [

  ]
})
export class UserModule { }
