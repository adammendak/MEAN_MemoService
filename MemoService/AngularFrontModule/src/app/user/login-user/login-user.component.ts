import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private _user: UserService) { }

  user = new User();

  ngOnInit() {
  }

  login(loginForm: NgForm): void {

    console.log("trying to login in component");
    this._user.loginUser(this.user);
}

}
