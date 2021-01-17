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
  currentType2 = 0;
  currentCategorie = 0;
  formation: FormationModel = {
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    establishment: "",
    categorie:"",
    period: 0,
    post:"",
    speciality:"",
    description:"",
    file: "",
    type: "",
    type2:"",
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
      description: [""],
      post: [""],
      establishment: [""],

    });
  }

  onChange(value) {
    this.currentType = value;
  }

  onChangeType2(value) {
    this.currentType2 = value;
  }
  onChangeCategorie(value) {
    this.currentCategorie = value;
  }


  async createMission() {
    this.errorMessageMission = "";
    console.log({ form: this.formationForm });
    if (this.formationForm.status == "INVALID") {
      this.errorMessageMission = "Fill Required Fields";
      return false;
    }
    if (this.currentType2 === 0 || this.currentType === 0 || this.currentCategorie===0) {
      this.errorMessageMission = "Invalid Type";
      return false;
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";

    let type: any;
    if (this.currentType == 1) {
      type = "universitaire";
    } else if (this.currentType == 2) {
      type = "professionnelle";
    }

    else if (this.currentType == 3) {
      type = "autre type";
    }
    let type2: any;
    if (this.currentType2 == 1) {
      type2 = "EXPERIENCE";
    } 
    
    
    
    else if (this.currentType2 == 2) {
      type2 = "FORMATION";
    }

    else if (this.currentType2 == 3) {
      type2 = "PROJET";
    }



let categorie :any;
if (this.currentCategorie ==1){

  categorie = "En cours"



}
else if (this.currentCategorie ==2){

  categorie = "Accomplie "


}

    const d = new Date(this.formationForm.get("startDate").value);
    const df = new Date(this.formationForm.get("endDate").value);

    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const dateE = df.getMonth() + 1 + "-" + df.getDate() + "-" + df.getFullYear();


    this.formation = {
      id: 0,
      title: this.formationForm.get("title").value,
      speciality: this.formationForm.get("speciality").value,
      description: this.formationForm.get("description").value,
      post: this.formationForm.get("post").value,

      categorie,
      type,
      type2,
      establishment: this.formationForm.get("establishment").value,
      startDate: date,
      endDate: dateE,
      period:0,
      file: "",
    };
    try {
      const data: any = await this.vacationService
        .createFormationRequest(this.formation)
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

  


get speciality() {
  return this.formationForm.get("speciality");
}

get categorie() {
  return this.formationForm.get("categorie");
}




get description() {
  return this.formationForm.get("description");
}


get type() {
  return this.formationForm.get("type");
}


get type2() {
  return this.formationForm.get("type2");
}


get post() {
  return this.formationForm.get("post");
}
get establishment() {
  return this.formationForm.get("establishment");
}

}
