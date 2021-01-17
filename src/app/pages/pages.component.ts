import { Component } from "@angular/core";
import { AuthService } from "../@core/auth/auth.service";

import { MENU_ITEMS_ADMIN, MENU_ITEMS_EMPLOYEE, MENU_ITEMS_COMMERCIAL,MENU_ITEMS_PROVIDER, MENU_ITEMS_RH, MENU_ITEMS_OPERATIONAL } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS_EMPLOYEE;

  constructor(private authService: AuthService) {
    const user = authService.getTokenData();
    if (user.role == "ADMIN") {
      this.menu = MENU_ITEMS_ADMIN;
    }
    else if (user.role == "COMMERCIAL") {
      this.menu = MENU_ITEMS_COMMERCIAL;
    }
    else if (user.role == "OPERATIONAL") {
      this.menu = MENU_ITEMS_OPERATIONAL;
    }
    else if (user.role == "RH") {
      this.menu = MENU_ITEMS_RH;
    }
    else if (user.role == "PROVIDER") {
      this.menu = MENU_ITEMS_PROVIDER;
    }
  }
}
