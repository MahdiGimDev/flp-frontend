import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../@core/auth/auth.service";
import { UserService } from "../../../@core/mock/users.service";
import { JwtPayload } from "../../../@core/models/auth.model";
import { UserModel, VacationModel } from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
import { VacationService } from "../../../@core/services/vacation.service";

@Component({
  selector: "ngx-vacation-create",
  templateUrl: "./vacation-create.component.html",
  styleUrls: ["./vacation-create.component.scss"],
})
export class VacationCreateComponent implements OnInit {
  vacationForm: FormGroup;
  errorMessageMission = "";
  successMessageMission = "";
  currentType = 0;

  vacation: VacationModel = {
    id: 0,
    title: "",
    startDate: "",
    period: 0,
    file: "",
    status: "",
    type: "",
  };
  user: UserModel;
  currentUser: JwtPayload;
  constructor(
    private userService: UsersService,
    private vacationService: VacationService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getTokenData();
    this.loadUser(this.currentUser.id);
  }

  createForm() {
    this.vacationForm = this.fb.group({
      title: ["", Validators.required],
      startDate: ["", Validators.required],
      period: ["", Validators.required],
    });
  }

  onChange(value) {
    this.currentType = value;
  }

  async createMission() {
    this.errorMessageMission = "";
    console.log({ form: this.vacationForm });
    if (this.vacationForm.status == "INVALID") {
      this.errorMessageMission = "Fill Required Fields";
      return false;
    }
    if (this.currentType === 0) {
      this.errorMessageMission = "Invalid Type";
      return false;
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";

    let type: any;
    if (this.currentType == 1) {
      type = "VACATION";
    } else if (this.currentType == 2) {
      type = "SICKNESS";
    }
    const d = new Date(this.vacationForm.get("startDate").value);
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const period = +this.vacationForm.get("period").value;

    this.vacation = {
      id: 0,
      title: this.vacationForm.get("title").value,
      type,
      startDate: date,
      period,
      file: "",
    };
    try {
      const data: any = await this.vacationService
        .createVacationRequest(this.vacation)
        .toPromise();
      if (window.confirm("Demande ajoutée avec succés"))
        if (data.id) {
          this.router.navigate(["/pages/vacations/all"]);
          this.successMessageMission = "Created successfully";
        } else {
          this.errorMessageMission = data?.message?.message;
        }
    } catch (error) {
      if (error.error) {
        this.errorMessageMission = error.error.message;
      } else {
        this.errorMessageMission = "Error on creating";
      }
    }
  }
  async loadUser(id) {
    try {
      const data: any = await this.userService.getUser(id).toPromise();
      this.user = data;
    } catch (error) {
      console.log({ error });
    }
  }

  get title() {
    return this.vacationForm.get("title");
  }
  get startDate() {
    return this.vacationForm.get("startDate");
  }
  get period() {
    return this.vacationForm.get("period");
  }
}
