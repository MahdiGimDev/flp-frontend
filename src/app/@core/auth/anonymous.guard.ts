import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): boolean {
    return true; // temp config
    if (!this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(["/dashboard"]);
    return false;
  }
}
