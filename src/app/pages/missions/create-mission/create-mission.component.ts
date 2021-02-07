import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MissionCreateModel,
  missionModel,
  RegisterModel,
  skillsModel,
} from "app/@core/models/auth.model";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import { UserModel } from "../../../@core/models/entity.model";
import { MissionsService } from "../../../@core/services/missions.service";
import { SkillsService } from "../../../@core/services/skills.service";
import { UsersService } from "../../../@core/services/users.service";

@Component({
  selector: "ngx-create-mission",
  templateUrl: "./create-mission.component.html",
  styleUrls: ["./create-mission.component.scss"],
})
export class CreateMissionComponent {
  skills: Array<skillsModel> = [];
  selectedUser: UserModel = null;

  public files: any;
  selectedFile: File;


  mission: MissionCreateModel = {
    id: 0,
    clientId: 0,
    address: "",
    invoice: "",
    purchase: "",
    description: "",
    planfile:"",
    period: 0,
    title: "",
    technologies: "",
    type: "",
    startDate: "",
    endDate: "",
    level: "",
    categorie:"",
    skills: [],
    skillsIds: [],
  };




  missionForm: FormGroup;
  currentLevel = 1;
  currentType = 1;
  currentCategorie=1;
  errorMessageMission = "";
  successMessageMission = "";
  selectedSkills = [];
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      firstName: {
        title: "First Name",
        type: "string",
      },
      lastName: {
        title: "Last Name",
        type: "string",
      },
     
      
      
      email: {
        title: "E-mail",
        type: "string",
      },
      role: {
        title: "Role",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "ADMIN", title: "Admin" },
              { value: "EMPLOYEE", title: "Employee" },
              { value: "RH", title: "RH" },
              { value: "PROVIDER", title: "Provider" },
              { value: "OPERATIONAL", title: "Operational" },
              { value: "COMMERCIAL", title: "Commercial" },
              { value: "CLIENT", title: "Client" },
            ],
          },
        },
      },
    },
  };
  userSource: LocalDataSource = new LocalDataSource();

  constructor(
    private userService: UsersService,
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
      technologies: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      planfile: [""],
      period: ["", Validators.required],
      address: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSkills();
    this.loadUsers();
  }

  async loadUsers() {
    let users: any = [];
    try {
      let skills = "";
      this.mission.skills.map((skill) => {
        skills += skill.label + ",";
      });
      users = await this.userService.getUsersByRole("client").toPromise();
      this.userSource.load(users);
    } catch (error) {
      console.log({ error });
    }
  }

  onChange(value) {
    this.currentType = value;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onChangeCategorie(value) {
    this.currentCategorie = value;
  }

  onSelectUser(event) {
    this.selectedUser = event?.data;
    console.log({ user: this.selectedUser });
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
    this.errorMessageMission = "";
    console.log({ form: this.missionForm });
    if (this.missionForm.status == "INVALID") {
      this.errorMessageMission = "Fill Required Fields";
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

    let categorie: any;
    if (this.currentCategorie == 1) {
      categorie = "EN DISTANCIEL";
    } else if (this.currentCategorie == 2) {
      categorie = "EN PRESENTIEL";
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

    const d1 = new Date(this.missionForm.get("endDate").value);
    
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const date1 = d1.getMonth() + 1 + "-" + d1.getDate() + "-" + d1.getFullYear();
    const diff = d1.getTime() - d.getTime();
    const days = diff / (1000 * 3600 * 24);
    const period = +this.missionForm.get("period").value;
    if (diff <= 0) {
      this.errorMessageMission = "End Date Should Be After Start Date";
      return false;
    }
    if (days < period) {
      this.errorMessageMission = "Period Should be Between Start and End Dates";
      return false;
    }
    if (!this.selectedUser) {
      this.errorMessageMission = "Client is required";
      return false;
    }
    this.mission = {
      id: 0,
      title: this.missionForm.get("title").value,
      type,
      clientId: this.selectedUser.id,
      skillsIds: this.selectedSkills,
      technologies: this.missionForm.get("technologies").value,
      categorie,
      startDate: date,
      endDate: date1,
      planfile:"",
      period,
      purchase:"false",
      invoice:"false",
      address: this.missionForm.get("address").value,
      description: this.missionForm.get("description").value,
      level,
    };
    try {
      const data: any = await this.missionService
        .createMission(this.mission,this.selectedFile)
        .toPromise();
        if (window.confirm('mission ajoutée avec succés'))
      if (data.id) {
        this.router.navigate(["/pages/missions/all"]);
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
  get startDate(){
    return this.missionForm.get("startDate");   
  }

get endDate (){
  return this.missionForm.get("endDate");
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

  get planfile() {
    return this.missionForm.get("planfile");
  }

  uploadFile($event) {
    console.log($event.target.files[0]); // outputs the first file
}

async uploader(){

}

}
