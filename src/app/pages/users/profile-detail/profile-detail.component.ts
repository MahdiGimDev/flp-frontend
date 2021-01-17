import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router } from "@angular/router";
import { User } from "app/@core/data/users";
import { certifsModel, skillsModel } from "app/@core/models/auth.model";
import { CertifsService } from "app/@core/services/certifs.service";
import { SkillsService } from "app/@core/services/skills.service";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import { NgxSpinnerService } from "ngx-spinner";
import { userInfo } from "os";
import { AuthService } from "../../../@core/auth/auth.service";
import {
  UserModel,
  SubscriptionModel,
} from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
import { VacationService } from "../../../@core/services/vacation.service";
@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.css"],
})
export class ProfileDetailComponent implements OnInit {
  skills: Array<skillsModel> = [];
  certifs: Array<certifsModel> = [];
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
  userEdit: UserModel = null;
  updateSuccessMsg = "";
  updateErrorMsg = "";
  delayMessage = 3500;
  editable = false;
  public files: any;
  selectedFile: File;
  ImageFile: File;
  selectedFileC: File;
  selectedSkills = [];
  selectedCertifs = [];

  constructor(
    private route: ActivatedRoute,

    private skillsService: SkillsService,
    private certifsService: CertifsService,
    private auth: AuthService,
    private router: Router,
    private userService: UsersService,
    private vacationService: VacationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.id = this.auth.getTokenData().id;
   this.loadUser(this.id);
    this.loadSkills();
    this.loadCertifs();
  }

  async loadSkills() {
    let data: any = [];
    try {
      data = await this.skillsService.getAllSkills().toPromise();
      this.skills = data;
    } catch (error) {
      console.log({ error });
    }
  }

  async loadCertifs() {
    let data: any = [];
    try {
      data = await this.certifsService.getAllCertifs().toPromise();
      this.certifs = data;
    } catch (error) {
      console.log({ error });
    }
  }

  public doSelectOptionsSkills = (options: INgxSelectOption[]) => {
    this.selectedSkills = [this.userEdit.skills];
    this.selectedSkills= this.userEdit.skills
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };

  public doSelectOptionsCertif = (options: INgxSelectOption[]) => {
    this.selectedCertifs = [this.userEdit.certifs];
    this.selectedCertifs= this.userEdit.certifs;
    options.map((option) => {
      this.selectedCertifs.push(option.data?.id);
    });
  };

  async loadUser(id) {
    this.spinner.show();
    try {
      this.editable = false;
      const data: any = await this.userService.getUser(id).toPromise();
      this.user = data;
      this.userEdit = { ...data };
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

  async onUploadImage() {
    this.spinner.show();
    try {
      await this.userService
        .uploadImageUser(this.user.id, this.ImageFile)
        .toPromise();
      this.loadUser(this.user.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadCv() {
    this.spinner.show();
    try {
      await this.userService
        .uploadCvUser(this.user.id, this.selectedFile)
        .toPromise();
      this.loadUser(this.user.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadCertif() {
    this.spinner.show();
    try {
      await this.userService
        .uploadCertifUser(this.user.id, this.selectedFileC)
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
    this.userEdit = { ...this.user };
    this.editable = !this.editable;
  }
  onImageChanged(event) {
    this.ImageFile = event.target.files[0];
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onFileChangedC(event) {
    this.selectedFileC = event.target.files[0];
  }
  onClickRow(event) {
    const vacationID = event?.data?.id;
    this.router.navigate(["/pages/vacations/detail", vacationID]);
  }
  async onSaveChanges() {
    try {
      const payload = { ...this.userEdit, selectedSkills : this.selectedSkills.length!=0
        && this.selectedSkills!=this.userEdit.skills ? this.selectedSkills :this.userEdit.skills };
      await this.userService.updateProfileUser(payload).toPromise();
      this.loadUser(this.userEdit.id);
    } catch (error) {
      console.log({ error });
    }
    console.log({ edit: this.userEdit });
  }
}
