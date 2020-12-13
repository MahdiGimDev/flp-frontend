import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/@core/auth/auth.service';
import { JwtPayload } from 'app/@core/models/auth.model';
import { ExperienceModel, UserModel } from 'app/@core/models/entity.model';
import { UsersService } from 'app/@core/services/users.service';
import { ExperienceService } from 'app/@core/services/experience.service';


@Component({
  selector: 'ngx-experience-create',
  templateUrl: './experience-create.component.html',
  styleUrls: ['./experience-create.component.scss']
})
export class ExperienceCreateComponent implements OnInit {





  experienceForm: FormGroup;
  errorMessageMission = "";
  successMessageMission = "";
  currentType = 0;


  experiences: ExperienceModel = {
   
  id:0,
  title:"",
  startDate: "",
    endDate: "",
    period: 0,
    speciality:"",
    description:"",
    file: "",
    status: "",
    type: "",
    poste:"",
    grade:"",
    ville:"",
    pays:"",
    adress:"",
    etablissement:"",

};

  
  
  
  
  


  user: UserModel;
  currentUser: JwtPayload;
  constructor(
    private userService: UsersService,
    private expService: ExperienceService,
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
    this.experienceForm = this.fb.group({
      title: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      period: ["", Validators.required],
      ville: ["", Validators.required],
      etablissement: ["", Validators.required],
      adress: [""],
      grade: [""],
      speciality: ["", Validators.required],
      poste: ["", Validators.required],
      description: [""],
      pays: [""],

    });
  }


  onChange(value) {
    this.currentType = value;
  }

  async createExperience() {
    this.errorMessageMission = "";
    console.log({ form: this.experienceForm });
    if (this.experienceForm.status == "INVALID") {
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
      type = "CDI";
    } else if (this.currentType == 2) {
      type = "CDD";
    }

    else if (this.currentType == 3) {
      type = "STAGE";
    }

    else if (this.currentType == 4) {
      type = "SVP";
    }

    else if (this.currentType == 5) {
      type = "AUTRE";
    }

    const d = new Date(this.experienceForm.get("startDate").value);
    const df = new Date(this.experienceForm.get("endDate").value);

    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const dateE = df.getMonth() + 1 + "-" + df.getDate() + "-" + df.getFullYear();

    const period = +this.experienceForm.get("period").value;

    this.experiences= {
      id: 0,
      title: this.experienceForm.get("title").value,
      type,
      startDate: date,
      endDate: dateE,
      period,
      ville:this.experienceForm.get("ville").value,
      etablissement:this.experienceForm.get("etablissement").value,
      speciality:this.experienceForm.get("speciality").value,
      adress:this.experienceForm.get("adress").value,
      poste:this.experienceForm.get("poste").value,
      grade:this.experienceForm.get("grade").value,
      pays:this.experienceForm.get("pays").value,
      description:this.experienceForm.get("description").value,
      file: "",
    };
    try {
      const data: any = await this.expService
        .createVacationRequest(this.experiences)
        .toPromise();
      if (window.confirm("Demande ajoutée avec succés"))
        if (data.id) {
          this.router.navigate(["/pages/experiences/all"]);
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
    return this.experienceForm.get("title");
  }
  get startDate() {
    return this.experienceForm.get("startDate");
  }
  get endDate() {
    return this.experienceForm.get("endDate");
  }

  get period() {
    return this.experienceForm.get("period");
  }


get speciality() {
  return this.experienceForm.get("speciality");
}

get poste() {
  return this.experienceForm.get("poste");
}


get grade() {
  return this.experienceForm.get("grade");
}
get ville() {
  return this.experienceForm.get("ville");
}

get pays() {
  return this.experienceForm.get("pays");
}


get adress() {
  return this.experienceForm.get("adress");
}

get etablissement() {
  return this.experienceForm.get("etablissement");
}

get description() {
  return this.experienceForm.get("description");
}











}
