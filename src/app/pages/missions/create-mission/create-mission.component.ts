import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { missionModel, RegisterModel } from 'app/@core/models/auth.model';

@Component({
  selector: 'ngx-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.scss']
})
export class CreateMissionComponent  {



  mission: missionModel;
  missionForm: FormGroup;
  currentLevel = 1;
  currentType = 1;
  errorMessageMission = "";
  successMessageMission = "";


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    
    ) { 

      this.createForm();


   
 

  }


  createForm() {
    this.missionForm = this.fb.group(
      {
        title: ["", Validators.required],
       profil: ["", Validators.required],
        
      },
     
    );
  }

  ngOnInit(): void {

  }
  onChange(value) {
    this.currentType = value;
  }


  onChangeLevel(value) {
    this.currentLevel = value;
  }

  async createMission() {
    if (!this.missionForm.valid) {
      this.errorMessageMission = "Invalid form";
      return false;
    }



    if (this.currentLevel === 0) {
      this.errorMessageMission = "Invalid level";
      return false;
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";
    let  niveauEx: any;
    if (this.currentLevel == 1) {
      niveauEx = "Junior";
    }
    if (this.currentLevel == 2) {
      niveauEx = "Senior";
    }
    if (this.currentLevel == 3) {
      niveauEx = "Expert";
    }
    let type: any;
    if (this.currentType == 1) {
      type = "Formation";
    }
    if (this.currentType == 2) {
      type = "Audit";
    }
    if (this.currentType == 3) {
      type = "Consulting";
    }

    if (this.currentType == 4) {
      type = "Autre";
    }
    this.mission = {
      id: this.missionForm.get("id").value,
      titre: this.missionForm.get("title").value,
      profil: this.missionForm.get(" profil").value,
      type,
      skills: this.missionForm.get("skills").value,
      technologies: this.missionForm.get("technologies").value,
      niveauEx,
      dateDebut: this.missionForm.get("date debut").value,
      durée: this.missionForm.get("durée").value,
      emplacement: this.missionForm.get("emplacement").value,
      description: this.missionForm.get("description").value,
      statusMission: this.missionForm.get("status ").value
    
    };

     
    console.log({ mission: this.mission });
  }



  get id() {
    return this.missionForm.get("id");
  }

  get titre() {
    return this.missionForm.get("titre");
  }
  get profil() {
    return this.missionForm.get("profile");
  }
  get type() {
    return this.missionForm.get("mission type");
  }
  get skills() {
    return this.missionForm.get("skills");
  }
  get technologies() {
    return this.missionForm.get("technologies");
  }
  get experienceLevel() {
    return this.missionForm.get("experience level");
  }

  get dateDebut() {
    return this.missionForm.get("date debut");
  }

  get duree() {
    return this.missionForm.get("duree");
  }
  get emplacement() {
    return this.missionForm.get("emplacement");
  }
  get description() {
    return this.missionForm.get("description");
  }

  get status() {
    return this.missionForm.get("status");
  }













}

