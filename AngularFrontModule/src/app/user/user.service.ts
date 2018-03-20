import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./user";
import {Router} from "@angular/router";
import {config} from "../../config";

@Injectable()
export class UserService {

  userLoggedInEmitter: EventEmitter<any> = new EventEmitter<any>();
  isLoggedIn: boolean = false;
  user = null;

  constructor(private _http: HttpClient, private router: Router) { }

  loginUser(user: IUser) {
    console.log("inside service");
    this._http.post(config.endpoint + "/user/login", user)
      .subscribe(
        (res) => {
          // res = JSON.stringify(res);
          console.log("to jest obj" + JSON.stringify(res));
          localStorage.setItem('token', res['token']);
          localStorage.setItem('user', res['user']);
          this.isLoggedIn = true;
          this.userLoggedInEmitter.emit(true);
          this.router.navigate(['/welcome']);
        },
            err => console.log(err)
      )};

  registerUser(user: IUser) {
    console.log("inside register function");
    this._http.post(config.endpoint + "/user/register", user)
      .subscribe(
        res => {
          console.log("to jest obj" + JSON.stringify(res));
          this.isLoggedIn = true;
          this.userLoggedInEmitter.emit(true);
          localStorage.setItem('token', res['token']);
          this.router.navigate(['/welcome']);
        },
            err => console.log(err)
        )
  }

  logoutUser() {
    console.log('clearing local storage');
    localStorage.clear();
    this.isLoggedIn = false;
    this.userLoggedInEmitter.emit(false);
    this.router.navigate(['/welcome']);
  }

  getLoggedIn(): boolean {
    return this.isLoggedIn;
  }

}
