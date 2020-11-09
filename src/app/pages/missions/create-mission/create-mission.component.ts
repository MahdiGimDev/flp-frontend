import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MissionCreateModel,
  missionModel,
  RegisterModel,
  skillsModel,
} from "app/@core/models/auth.model";
import { INgxSelectOption } from "ngx-select-ex";
import { MissionsService } from "../../../@core/services/missions.service";
import { SkillsService } from "../../../@core/services/skills.service";

@Component({
  selector: "ngx-create-mission",
  templateUrl: "./create-mission.component.html",
  styleUrls: ["./create-mission.component.scss"],
})
export class CreateMissionComponent {
  skills: Array<skillsModel> = [];
  mission: MissionCreateModel = {
    id: 0,
    address: "",
    description: "",
    period: 0,
    title: "",
    status: "",
    technologies: "",
    type: "",
    startDate: "",
    level: "",
    skills: [],
    skillsIds: [],
  };
  missionForm: FormGroup;
  currentLevel = 1;
  currentType = 1;
  errorMessageMission = "";
  successMessageMission = "";
  selectedSkills = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionsService,
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

  createForm() {
    this.missionForm = this.fb.group({
      title: ["", Validators.required],
      type: ["", Validators.required],
      technologies: ["", Validators.required],
      level: ["", Validators.required],
      startDate: ["", Validators.required],
      period: [" ", Validators.required],
      address: ["", Validators.required],
      description: ["", Validators.required],
      status: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  onChange(value) {
    this.currentType = value;
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

  async createMission() {
    if (this.mission.status == "VALID") {
      this.errorMessageMission = "valid form";
      return false;
    }
    if (this.currentLevel === 0) {
      this.errorMessageMission = "Invalid level";
      return false;
    }
    if (this.currentType === 0) {
      this.errorMessageMission = "Invalid Type";
      return false;
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";
    let level: any;

    if (this.currentLevel == 2) {
      level = "SENIOR";
    } else if (this.currentLevel == 3) {
      level = "EXPERT";
    } else {
      level = "JUNIOR";
    }
    let type: any;
    if (this.currentType == 1) {
      type = "FORMATION";
    } else if (this.currentType == 2) {
      type = "AUDIT";
    } else if (this.currentType == 3) {
      type = "CONSULTING";
    } else {
      type = "OTHER";
    }
    const d = new Date(this.missionForm.get("startDate").value);
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    this.mission = {
      id: 0,
      title: this.missionForm.get("title").value,
      type,
      skillsIds: this.selectedSkills,
      technologies: this.missionForm.get("technologies").value,
      startDate: date,
      period: this.missionForm.get("period").value,
      address: this.missionForm.get("address").value,
      description: this.missionForm.get("description").value,
      status: this.missionForm.get("status").value,
      level,
    };
    try {
      const data: any = await this.missionService
        .createMission(this.mission)
        .toPromise();
      if (data.id) {
        this.router.navigate(["/pages/missions/all"]);
        this.successMessageMission = "Created successfully";
      } else {
        this.errorMessageMission = data?.message?.message;
      }
    } catch (error) {
      this.errorMessageMission = "Error on creating";
    }
    console.log({ mission: this.mission });
  }

  get id() {
    return this.missionForm.get("id");
  }

  get title() {
    return this.missionForm.get("title");
  }
  get type() {
    return this.missionForm.get("mission type");
  }
  /* get skills() {
    return this.missionForm.get("skills");
  }*/
  get technologies() {
    return this.missionForm.get("technologies");
  }
  get experienceLevel() {
    return this.missionForm.get("experience level");
  }

  get startDate() {
    return this.missionForm.get("startDate");
  }

  get period() {
    return this.missionForm.get("period");
  }
  get address() {
    return this.missionForm.get("address");
  }
  get description() {
    return this.missionForm.get("description");
  }

  get status() {
    return this.missionForm.get("status");
  }
}
