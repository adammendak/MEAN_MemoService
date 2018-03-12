import { Component, OnInit } from '@angular/core';
import {IUser, User} from "../user";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user: IUser = new User();

  password2;

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  //add validation if passwords do not match

  register(registerForm: NgForm) {
    console.log(this.user);
    this._userService.registerUser(this.user);
  }

}
