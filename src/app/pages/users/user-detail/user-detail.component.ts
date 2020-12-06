import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import {
  UserModel,
  SubscriptionModel,
} from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
import { VacationService } from "../../../@core/services/vacation.service";
@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  id = -1;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    display: {
      editButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      title: {
        title: "Titre Repos",
        type: "string",
      },
      type: {
        title: "Type",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "SICKNESS", title: "Maladie" },
              { value: "VACATION", title: "Repos" },
            ],
          },
        },
      },
      startDate: {
        title: "Date Debut",
        type: "string",
      },
      period: {
        title: "Nombre de jours",
        type: "string",
      },
      status: {
        title: "Status",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "PENDING", title: "En Attente" },
              { value: "ACCEPTED", title: "ACCEPTER" },
              { value: "REFUSED", title: "REFUSE" },
            ],
          },
        },
      },
    },
  };
  user: UserModel = null;
  updateSuccessMsg = "";
  updateErrorMsg = "";
  delayMessage = 3500;
  editable = false;
  public files: any;
  selectedFile: File;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private vacationService: VacationService,
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
      this.loadVacations();
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async loadVacations() {
    let data: any = [];
    this.source.load(data);
    try {
      this.spinner.show();
      data = await this.vacationService
        .getVacationsByUser(this.user.id)
        .toPromise();
      this.source.load(data);
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
  onClickRow(event) {
    const vacationID = event?.data?.id;
    this.router.navigate(["/pages/vacations/detail", vacationID]);
  }

}
