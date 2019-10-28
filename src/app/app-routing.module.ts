import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AccessDeniedComponent } from "./components/access-denied/access-denied.component";
import { UserComponent } from "./components/user/user.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuardService } from "./guards/auth-guard.service";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "user", component: UserComponent, canActivate: [AuthGuardService] },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "access-denied", component: AccessDeniedComponent },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
