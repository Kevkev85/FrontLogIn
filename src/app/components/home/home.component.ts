import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  LoginStatus$: Observable<boolean>;
  role: string = "";

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.LoginStatus$ = this.auth.isLoggedIn;
    this.auth.currentUserRole.subscribe(r => (this.role = r));
  }

  displayRole() {
    return this.role;
  }
}
