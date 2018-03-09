import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = null;

  constructor(private _user: UserService) { }

  ngOnInit() {
  }

  logout() {
    this._user.logoutUser();
  }

}
