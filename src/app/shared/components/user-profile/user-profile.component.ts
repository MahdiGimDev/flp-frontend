import { Component, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { NbDialogRef } from "@nebular/theme";
import { RegisterModel } from 'app/@core/models/auth.model';
import { UserModel } from "../../../@core/models/entity.model";

@Component({
  selector: "ngx-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(public dialogRef: NbDialogRef<UserProfileComponent>) {}
  user: UserModel;
  admin: boolean = false;
  userForm: FormGroup;
  currentRole:0;
  ngOnInit(): void {}

  onChange(value) {
    this.currentRole = value;
  }

  close() {
    this.dialogRef.close();
  }


  async roleT (){




  }
 


}
