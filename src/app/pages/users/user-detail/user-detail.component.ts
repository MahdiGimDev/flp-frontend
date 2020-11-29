import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {
  UserModel,
  SubscriptionModel,
} from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  id = -1;
  user: UserModel = null;
  updateSuccessMsg = "";
  updateErrorMsg = "";
  delayMessage = 3500;
  editable = false;
  public files: any;
  selectedFile: File;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.loadUser(this.id);
  }

  async loadUser(id) {
    this.spinner.show();
    try {
      const data: any = await this.userService.getUser(id).toPromise();
      this.user = data;
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadCv() {
    this.spinner.show();
    try {
      await this.userService
        .uploadUser(this.user.id, this.selectedFile)
        .toPromise();
      this.loadUser(this.user.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  showUpdateMessage() {
    this.updateErrorMsg = "";
    this.updateSuccessMsg = "User Updated Successfully";
    this.hideMessages();
  }
  showErrorMessage() {
    this.updateSuccessMsg = "";
    this.updateErrorMsg = "Error on updating User";
    this.hideMessages();
  }

  hideMessages() {
    setTimeout(() => {
      this.hideErrorMsg();
      this.hideSuccessMsg();
    }, this.delayMessage);
  }

  hideErrorMsg() {
    this.updateErrorMsg = "";
  }
  hideSuccessMsg() {
    this.updateSuccessMsg = "";
  }
  toggleEdit() {
    this.editable = !this.editable;
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
}
