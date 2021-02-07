import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { JobCreateModel, skillsModel } from "app/@core/models/auth.model";
import { JobService } from "app/@core/services/job.service";
import { SkillsService } from "app/@core/services/skills.service";
import { INgxSelectOption } from "ngx-select-ex";

@Component({
  selector: "ngx-jobs-create",
  templateUrl: "./jobs-create.component.html",
  styleUrls: ["./jobs-create.component.scss"],
})
export class JobsCreateComponent {
  jobForm: FormGroup;
  currentLevel = 1;
  currentContrat = 1;
  currentFormation = 1;

  errorMessageJob = "";
  successMessageJob = "";
  selectedSkills = [];

  skills: Array<skillsModel> = [];
  job: JobCreateModel = {
    id: 0,
    title: " ",
    profil: " ",
    poste: " ",
    specialite: " ",
    startDate: "",
    formation: " ",
    contrat: " ",
    pays: "",
    ville: "",
    addresse: " ",
    level: " ",
    description: " ",
    skills: [],
    skillsIds: [],
    status: "",
  };

  ngOnInit(): void {
    this.loadSkills();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private skillsService: SkillsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };

  onChangeContrat(value) {
    this.currentContrat = value;
  }

  onChangeFormation(value) {
    this.currentFormation = value;
  }

  onChangeLevel(value) {
    this.currentLevel = value;
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

  createForm() {
    this.jobForm = this.fb.group({
      title: ["", Validators.required],
      poste: ["", Validators.required],
      profil: ["", Validators.required],
      specialite: ["", Validators.required],
      formation: ["", Validators.required],
      startDate: ["", Validators.required],
      addresse: ["", Validators.required],
      contrat: ["", Validators.required],
      level: ["", Validators.required],
      description: [""],
      pays: [""],
      ville: [""],
      status: ["", Validators.required],
    });
  }

  async createJob() {
    /*if (this.jobForm.status !== "VALID") {
      this.errorMessageJob = "Invalid form";
      return false;
    }*/
    console.log(this.jobForm);
    if (this.currentLevel === 0) {
      this.errorMessageJob = "Invalid level";
      return false;
    }

    this.errorMessageJob = "";
    this.successMessageJob = "";
    let level: any;
    let formation: any;
    let contrat: any;

    if (this.currentLevel == 2) {
      level = "SENIOR";
    } else if (this.currentLevel == 3) {
      level = "EXPERT";
    } else {
      level = "JUNIOR";
    }

    if (this.currentContrat == 1) {
      contrat = "CDI";
    } else if (this.currentContrat == 2) {
      contrat = "CDD";
    } else if (this.currentContrat == 3) {
      contrat = "SVP";
    } else if (this.currentContrat == 3) {
      contrat = "STAGE";
    } else {
      contrat = "AUTRE";
    }

    if (this.currentFormation == 1) {
      formation = "BAC";
    }

    if (this.currentFormation == 2) {
      formation = "BAC+2";
    }
    if (this.currentFormation == 3) {
      formation = "BAC+3";
    }
    if (this.currentFormation == 4) {
      formation = "BAC+4";
    }
    if (this.currentFormation == 5) {
      formation = "BAC+5";
    }
    if (this.currentFormation == 6) {
      formation = "DOCTORANT";
    }
    if (this.currentFormation == 7) {
      formation = "PLUS";
    }

    const d = new Date(this.jobForm.get("startDate").value);
    if (d.getTime() < new Date().getTime()) {
      this.errorMessageJob = "Date Invalide";
      return false;
    }
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();

    this.job = {
      id: 0,
      title: this.jobForm.get("title").value,
      profil: this.jobForm.get("profil").value,
      poste: this.jobForm.get("poste").value,
      specialite: this.jobForm.value.specialite,
      formation,
      skillsIds: this.selectedSkills,
      level,
      startDate: date,
      pays: this.jobForm.get("pays").value,
      ville: this.jobForm.get("ville").value,
      addresse: this.jobForm.get("addresse").value,
      description: this.jobForm.get("description").value,
      contrat,
      status: this.jobForm.get("status").value,
    };
    try {
      const data: any = await this.jobService.createJob(this.job).toPromise();
      if (data.id) {
        const jobID = data.id;
        this.router.navigate(["/pages/jobs/detail", jobID]);
        this.successMessageJob = "Created successfully";
      } else {
        this.errorMessageJob = data?.message?.message;
      }
    } catch (error) {
      this.errorMessageJob = "Error on creating";
    }
    console.log({ job: this.job });
  }

  get id() {
    return this.jobForm.get("id");
  }

  get title() {
    return this.jobForm.get("title");
  }

  get profil() {
    return this.jobForm.get("profil");
  }

  get pays() {
    return this.jobForm.get("pays");
  }

  get ville() {
    return this.jobForm.get("ville");
  }

  get poste() {
    return this.jobForm.get("poste");
  }
  get specialite() {
    return this.jobForm.get("specialite");
  }
  /* get skills() {
    return this.missionForm.get("skills");
  }*/

  get formation() {
    return this.jobForm.get("formation");
  }

  get contrat() {
    return this.jobForm.get("contrat");
  }
  get Level() {
    return this.jobForm.get("experience level");
  }

  get startDate() {
    return this.jobForm.get("startDate");
  }

  get addresse() {
    return this.jobForm.get("addresse");
  }
  get description() {
    return this.jobForm.get("description");
  }

  get status() {
    return this.jobForm.get("status");
  }
}
