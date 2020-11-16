import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
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
  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
