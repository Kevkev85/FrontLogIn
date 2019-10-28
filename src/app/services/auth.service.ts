import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SignUpInfo } from "../model/SignupInfo";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { LoginInfo } from "../model/LoginInfo";

const httpOptions = {
  headers: new HttpHeaders()
};
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private BASE_URL: string = "http://localhost:8080/api";
  private LOGIN_URL: string = `${this.BASE_URL}/auth/signin`;
  private REGISTER_URL: string = `${this.BASE_URL}/auth/signup`;

  private LoginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  private Username = new BehaviorSubject<string>(
    localStorage.getItem("username")
  );

  private Role = new BehaviorSubject<string>(localStorage.getItem("role"));

  checkLoginStatus(): boolean {
    let loginCookie = localStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      return true;
    }
    return false;
  }

  register(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.REGISTER_URL, info, httpOptions);
  }

  login(info: LoginInfo) {
    return this.http.post<any>(this.LOGIN_URL, info).pipe(
      map(result => {
        if (result && result.token) {
          this.LoginStatus.next(true);
          localStorage.setItem("loginStatus", "1");
          localStorage.setItem("jwt", result.token);
          localStorage.setItem("username", result.username);
          localStorage.setItem("role", result.authorities[0].authority);
          this.Username.next(localStorage.getItem("username"));
          this.Role.next(localStorage.getItem("role"));
        }
        return result;
      })
    );
  }

  logout() {
    this.LoginStatus.next(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.setItem("loginStatus", "0");
    this.router.navigate(["/login"]);
  }

  get isLoggedIn() {
    return this.LoginStatus.asObservable();
  }

  get currentUsername() {
    return this.Username.asObservable();
  }

  get currentUserRole() {
    return this.Role.asObservable();
  }
}
