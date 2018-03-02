import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./user";

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  baseUrl = "http://localhost:3000/api";

  loginUser(user: IUser) {
    console.log("inside service");
    this._http.post(this.baseUrl + "/user/login", user)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  };

  registerUser(user: IUser) {
    console.log("inside register function");
    this._http.post(this.baseUrl + "/user/register", user)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

}
