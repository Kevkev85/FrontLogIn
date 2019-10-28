import { Component, OnInit } from "@angular/core";
import { LoginInfo } from "src/app/model/LoginInfo";
import { FormControl, NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: any = {};
  loginInfo: LoginInfo;
  returnUrl: string;
  ErrorMessage: string = "";
  InvalidLogin: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  onSubmit() {
    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.auth.login(this.loginInfo).subscribe(
      result => {
        this.InvalidLogin = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.InvalidLogin = true;
        this.ErrorMessage = "Invalid details";
      }
    );
  }
}
