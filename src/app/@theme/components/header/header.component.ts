import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { AuthService } from "../../../@core/auth/auth.service";
import { Router } from "@angular/router";
import { JwtPayload } from "../../../@core/models/auth.model";
import { UserService } from "../../../@core/mock/users.service";
import { UsersService } from "../../../@core/services/users.service";
import { UserModel } from "../../../@core/models/entity.model";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: UserModel;
  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Profile" }, { title: "Log out" }];

  constructor(
    private authService: AuthService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private router: Router,
    private userService: UsersService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.loadUser(this.authService.getTokenData().id);
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );
    this.menuService.onItemClick().subscribe((event) => {
      this.onContextItemSelection(event.item.title);
    });
    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  async loadUser(id) {
    try {
      const data: any = await this.userService.getUser(id).toPromise();
      this.user = data;
    } catch (error) {
      console.log({ error });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  onContextItemSelection(title) {
    if (title === "Log out") {
      this.logout();
    } else if (title === "Profile") {
      this.router.navigateByUrl("/pages/users/detail/"+this.authService.getTokenData().id);
    }
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl("/auth");
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
