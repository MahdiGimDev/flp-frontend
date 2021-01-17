import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { prospectCreateModel } from 'app/@core/models/auth.model';
import { UserModel } from 'app/@core/models/entity.model';
import { ProspectService } from 'app/@core/services/prospect.service';
import { UsersService } from 'app/@core/services/users.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-create-prospect',
  templateUrl: './create-prospect.component.html',
  styleUrls: ['./create-prospect.component.scss']
})
export class CreateProspectComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router,
    private prosService: ProspectService,
    private fb: FormBuilder
  ) { 


   

    this.createForm();

  }

  ngOnInit(): void {
  }

  createForm() {
    this.prospForm = this.fb.group({
      nom: ["Brain Consulting"],
      secteur: ["IT"],
      startDate: [new Date()],
      endDate:[new Date()],
      sujet: ["consulting"],
      addresse: ["Lac1,Tunis",],
     description: ["n'importe",],
    });
  }




   currentType=1;
  selectedUser: UserModel = null;
  prosp: prospectCreateModel = {
  id:0,
  nom: "",
  type: "",
  secteur: "",
  sujet: "",
  startDate: "",
  endDate: "",
  addresse: "",
  file: "",
  email: "",
  description: "",
  status:"",
  phonenumber:"",
  ville:"",
  pays:"",
  yearsExperience:0

  };
  prospForm: FormGroup;

  currentStatus = 1;
  errorMessageMission = "";
  successMessageMission = "";
  userSource: LocalDataSource = new LocalDataSource();

 
   
  onChange(value) {
    this.currentStatus = value;
  }








  async createProspect() {
    this.errorMessageMission = "";
    console.log({ form: this.prospForm });
    if (this.prospForm.status == "INVALID") {
      this.errorMessageMission = "error lors de la creation veuillez verifier";
      return false;
    }
    
    if (this.currentStatus === 0) {
      this.errorMessageMission = "Invalid Type";
      return false;
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";
    let stat: any;
    if (this.currentStatus==1){

      stat=='non prospecté';

    }
    else if (this.currentStatus==2){

      stat=='EN COURS DE PROSPECTION';

      
    }
    else if (this.currentStatus==3){

      stat=='Prospécté avec succés';


    }
    else if (this.currentStatus==4){

      stat=='a recontacter';
     
    }
    else if (this.currentStatus==5){
      stat=='prospécté avec refus';

    }


    const d2 = new Date(this.prospForm.get("endDate").value);

    const d = new Date(this.prospForm.get("startDate").value);
   
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const dateE = d2.getMonth() + 1 + "-" + d2.getDate() + "-" + d2.getFullYear();

    const diff = d2.getTime() - d.getTime();
    const days = diff / (1000 * 3600 * 24);
    this.prosp = {
      id: 0,
      nom: this.prospForm.get("nom").value,
      secteur: this.prospForm.get("secteur").value,
      startDate: date,
      endDate: dateE,
      file: this.prosp.file,
      pays: this.prosp.pays,
      type: this.prosp.type,

      ville: this.prosp.ville,
      email: this.prosp.email,
      phonenumber: this.prosp.phonenumber,
      sujet: this.prospForm.get("sujet").value,
      status,
      yearsExperience:0,
      addresse: this.prospForm.get("addresse").value,
      description: this.prospForm.get("description").value,
    };
    try {
      const data: any = await this.prosService
        .createPros(this.prosp)
        .toPromise();
        if (window.confirm('prospect ajoutée avec succés'))
      if (data.id) {
        this.router.navigate(["/pages/prospections/all"]);
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
    console.log({ mission: this.prosp });
  }

  get id() {
    return this.prospForm.get("id");
  }

  get nom() {
    return this.prospForm.get("nom");
  }
  get secteur() {
    return this.prospForm.get("secteur");
  }
  get type() {
    return this.prospForm.get("type");
  }

  get sujet() {
    return this.prospForm.get("sujet");
  }
  get email() {
    return this.prospForm.get("email");
  }
  get startDate() {
    return this.prospForm.get("startDate");
  }
  get endDate() {
    return this.prospForm.get("endDate");
  }


  get phonenumber() {
    return this.prospForm.get("phonenumber");
  }

  get ville() {
    return this.prospForm.get("ville");
  }
  get pays() {
    return this.prospForm.get("pays");
  }
  get file() {
    return this.prospForm.get("file");
  }

  get yearsExperience() {
    return this.prospForm.get("yearsExperience");
  }
  get description() {
    return this.prospForm.get("description");
  }
  get addresse() {
    return this.prospForm.get("addresse");
  }

 

  get status() {
    return this.prospForm.get("status");
  }
}
