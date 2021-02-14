import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NbDialogRef } from "@nebular/theme";
import { UserService } from "app/@core/mock/users.service";
import {
  certifsModel,
  RegisterModel,
  skillsModel,
} from "app/@core/models/auth.model";
import { CertifsService } from "app/@core/services/certifs.service";
import { SkillsService } from "app/@core/services/skills.service";
import { UsersService } from "app/@core/services/users.service";
import { UserDetailComponent } from "app/pages/users/user-detail/user-detail.component";
import { UserModel } from "../../../@core/models/entity.model";

@Component({
  selector: "ngx-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(
    public dialogRef: NbDialogRef<UserProfileComponent>,
    private skillservice: SkillsService,
    private certifService: CertifsService,
    private userService: UsersService,
    private router: Router
  ) {}
  user: UserModel;
  detail: UserDetailComponent;
  admin: boolean = false;
  userForm: FormGroup;
  currentRole: 0;
  errorMessageUser = "";
  successMessageUser = "";
  ngOnInit(): void {
    this.loadUser();
  }

  onChange(value) {
    this.currentRole = value;
  }

  close() {
    this.dialogRef.close();
  }

  async loadUser() {
    console.log('loading user !!!!');
    
    try {
      const data: any = await this.userService
        .getUser(this.user.id)
        .toPromise();
      this.user = data;
    } catch (error) {
      console.log({ error });
    }
  }

  onClickRow() {
    const userID = this.user.id;
    this.router.navigate(["/pages/users/detail", userID]);
  }
}
