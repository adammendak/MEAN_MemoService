import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user = null;
  isLoggedIn: boolean = this._user.getLoggedIn();

  constructor(private _user: UserService) {
    this._user.userLoggedInEmitter
      .subscribe((boolean?) => {
        this.isLoggedIn = boolean;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._user.userLoggedInEmitter.unsubscribe();
  }

  logout() {
    this._user.logoutUser();
  }

}
