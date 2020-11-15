import { Component } from "@angular/core";
import { AuthService } from "../@core/auth/auth.service";

import { MENU_ITEMS_ADMIN, MENU_ITEMS_CLIENT } from "./pages-menu";

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
  menu = MENU_ITEMS_CLIENT;

  constructor(private authService: AuthService) {
    const user = authService.getTokenData();
    if (user.role == "RH" || user.role == "ADMIN") {
      this.menu = MENU_ITEMS_ADMIN;
    }
  }
}
