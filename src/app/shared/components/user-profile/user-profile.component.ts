import { Component, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from "@nebular/theme";
import { UserService } from 'app/@core/mock/users.service';
import { certifsModel, RegisterModel, skillsModel } from 'app/@core/models/auth.model';
import { CertifsService } from 'app/@core/services/certifs.service';
import { SkillsService } from 'app/@core/services/skills.service';
import { UsersService } from 'app/@core/services/users.service';
import { UserDetailComponent } from 'app/pages/users/user-detail/user-detail.component';
import { UserModel } from "../../../@core/models/entity.model";

@Component({
  selector: "ngx-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(public dialogRef: NbDialogRef<UserProfileComponent>, private router: Router) { }
  user: UserModel;
  skills: Array<skillsModel> = [];
  certifs: Array<certifsModel> = [];

  detail: UserDetailComponent;

  admin: boolean = false;
  userForm: FormGroup;
  skillservice: SkillsService;
  certifService: CertifsService;
  userService: UsersService;

  currentRole: 0;
  errorMessageUser = "";
  successMessageUser = "";
  ngOnInit(): void {
    console.log({user:this.user});   
    this.loadSkills();
    this.loadcertifs();
  }

  

  onChange(value) {
    this.currentRole = value;
  }

  close() {
    this.dialogRef.close();
  }
  async loadSkills() {
    let data: any = [];
    try {
      data = await this.skillservice.getAllSkills().toPromise();
      this.skills = data;
    } catch (error) {
      console.log({ error });
    }
  }


  /*async loadUserSkills() {
    let data: any = [];
    try {
      data = await this.userService.getAllSkillsByUser(this.skills, this.user.id).toPromise();
      this.skills = data;
    } catch (error) {
      console.log({ error });
    }
  }*/



  async loadcertifs() {
    let data: any = [];
    try {
      data = await this.certifService.getAllCertifs().toPromise();
      this.certifs = data;
    } catch (error) {
      console.log({ error });
    }
  }



  onClickRow() {
    const userID = this.user.id;
    this.router.navigate(["/pages/users/detail", userID]);
  }





}
