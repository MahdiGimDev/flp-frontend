import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/@core/auth/auth.service';
import { JwtPayload } from 'app/@core/models/auth.model';
import { FormationModel, UserModel } from 'app/@core/models/entity.model';
import { FormationService } from 'app/@core/services/formation.service';
import { UsersService } from 'app/@core/services/users.service';


@Component({
  selector: 'ngx-formation-create',
  templateUrl: './formation-create.component.html',
  styleUrls: ['./formation-create.component.scss']
})
export class FormationCreateComponent implements OnInit {

  formationForm: FormGroup;
  errorMessageMission = "";
  successMessageMission = "";
  currentType = 0;

  formation: FormationModel = {
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    period: 0,
    speciality:"",
    description:"",
    file: "",
    status: "",
    type: "",
  };
  user: UserModel;
  currentUser: JwtPayload;
  constructor(
    private userService: UsersService,
    private vacationService: FormationService,
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
    this.formationForm = this.fb.group({
      title: ["", Validators.required],
      speciality: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: [""],
      period: [""],
      description: [""],

    });
  }

  onChange(value) {
    this.currentType = value;
  }


  async createMission() {
    this.errorMessageMission = "";
    console.log({ form: this.formationForm });
    if (this.formationForm.status == "INVALID") {
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
      type = "universitaire";
    } else if (this.currentType == 2) {
      type = "pro";
    }

    else if (this.currentType == 3) {
      type = "autre type";
    }
    const d = new Date(this.formationForm.get("startDate").value);
    const df = new Date(this.formationForm.get("endDate").value);

    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const dateE = df.getMonth() + 1 + "-" + df.getDate() + "-" + df.getFullYear();

    const period = +this.formationForm.get("period").value;

    this.formation = {
      id: 0,
      title: this.formationForm.get("title").value,
      speciality: this.formationForm.get("speciality").value,
      description: this.formationForm.get("description").value,
      type,
      startDate: date,
      endDate: dateE,
      period,
      file: "",
    };
    try {
      const data: any = await this.vacationService
        .createVacationRequest(this.formation)
        .toPromise();
      if (window.confirm("Demande ajoutée avec succés"))
        if (data.id) {
          this.router.navigate(["/pages/formations/all"]);
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
    return this.formationForm.get("title");
  }
  get startDate() {
    return this.formationForm.get("startDate");
  }
  get endDate() {
    return this.formationForm.get("endDate");
  }

  get period() {
    return this.formationForm.get("period");
  }


get speciality() {
  return this.formationForm.get("speciality");
}



get description() {
  return this.formationForm.get("description");
}






}
