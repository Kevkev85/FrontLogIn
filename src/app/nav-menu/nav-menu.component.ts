import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit {
  LoginStatus$: Observable<boolean>;
  UserName$: Observable<string>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.LoginStatus$ = this.auth.isLoggedIn;
    this.UserName$ = this.auth.currentUsername;
  }

  onLogout() {
    this.auth.logout();
  }
}
