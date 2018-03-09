import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./user";
import {Router} from "@angular/router";
import {config} from "../../config";

@Injectable()
export class UserService {

  constructor(private _http: HttpClient, private router: Router) { }

  loginUser(user: IUser) {
    console.log("inside service");
    this._http.post(config.endpoint + "/user/login", user)
      .subscribe(
        res => {
          console.log("to jest obj" + JSON.stringify(res));
          this.router.navigate(['/welcome']);
          localStorage.setItem('token', res.token);

        },
            err => console.log(err)
      )};

  registerUser(user: IUser) {
    console.log("inside register function");
    this._http.post(config.endpoint + "/user/register", user)
      .subscribe(
        res => {
          console.log("to jest obj" + JSON.stringify(res));
          this.router.navigate(['/welcome']);
          localStorage.setItem('token', res.token);
        },
            err => console.log(err)
        )
  }

  logoutUser() {
    console.log('clearing local storage');
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

}
