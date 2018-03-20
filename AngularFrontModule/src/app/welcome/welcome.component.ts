import {Component, Inject, OnInit} from '@angular/core';
// import { Toastr } from "../common/toastr-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user = null;

  title: String = "Memo Service";

  constructor( private _toastr: ToastrService) { }

  ngOnInit() {
    this._toastr.info("user logged in");
  }

}
