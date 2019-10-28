import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isLoggedIn.pipe(
      take(1),
      map((loginStatus: boolean) => {
        const destination: string = state.url;

        //Check if user is logged in
        if (!loginStatus) {
          this.router.navigate(["/login"], {
            queryParams: { returnUrl: state.url }
          });
          return false;
        }

        //ifAlready logged in
        switch (destination) {
          case "/user": {
            if (
              localStorage.getItem("role") === "ROLE_USER" ||
              localStorage.getItem("role") === "ROLE_ADMIN"
            ) {
              return true;
            }
          }

          case "/admin": {
            if (localStorage.getItem("role") === "ROLE_USER") {
              this.router.navigate(["/access-denied"]);
              return false;
            }

            if (localStorage.getItem("role") === "ROLE_ADMIN") {
              return true;
            }
          }

          default:
            return false;
        }
      })
    );
  }
}
