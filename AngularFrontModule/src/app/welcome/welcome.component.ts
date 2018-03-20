import {Component, OnInit, OnDestroy} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  user = null;

  title: String = "Memo Service";
  isLoggedIn: boolean = this._user.getLoggedIn();

  constructor( private _toastr: ToastrService, private _user: UserService) {
    this._user.userLoggedInEmitter
      .subscribe((boolean?) => {
        this.isLoggedIn = boolean;
        this.user = localStorage.getItem('user');
      })
  }

  ngOnInit() {
    this._toastr.info("user logged in");
  }

  ngOnDestroy() {
    this._user.userLoggedInEmitter.unsubscribe();
  }

}
