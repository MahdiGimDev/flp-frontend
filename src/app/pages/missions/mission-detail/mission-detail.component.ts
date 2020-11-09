import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import {
  skillsModel,
  MissionCreateModel,
} from "../../../@core/models/auth.model";
import { UserModel } from "../../../@core/models/entity.model";
import { MissionsService } from "../../../@core/services/missions.service";
import { SkillsService } from "../../../@core/services/skills.service";
import { UsersService } from "../../../@core/services/users.service";

@Component({
  selector: "ngx-mission-detail",
  templateUrl: "./mission-detail.component.html",
  styleUrls: ["./mission-detail.component.scss"],
})
export class MissionDetailComponent implements OnInit {
  skills: Array<skillsModel> = [];
  users: Array<UserModel> = [];
  selectedUser: UserModel = null;
  userSource: LocalDataSource = new LocalDataSource();
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
      username: {
        title: "username",
        type: "string",
      },
      salaire: {
        title: "salaire",
        type: "number",
      },
      dateBirth: {
        title: "Date of birth",
        type: "Date",
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
            ],
          },
        },
      },
    },
  };
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
  currentLevel = 1;
  currentType = 1;
  errorMessageMission = "";
  successMessageMission = "";
  selectedSkills = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionsService,
    private userService: UsersService,
    private skillsService: SkillsService,
    private fb: FormBuilder
  ) {}
  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadMission(id);
      this.loadUsers();
    });
    this.loadSkills();
  }

  onChange(value) {
    this.currentType = value;
  }

  onChangeLevel(value) {
    this.currentLevel = value;
  }

  async loadUsers() {
    let users: any = [];
    try {
      let skills = "";
      this.mission.skills.map((skill) => {
        skills += skill.label + ",";
      });
      users = await this.userService.getUsersBySkills(skills).toPromise();
      this.users = users;
      this.userSource.load(users);
    } catch (error) {
      console.log({ error });
    }
  }
  async loadMission(id) {
    let data: any = [];
    try {
      data = await this.missionService.getMissionById(id).toPromise();
      console.log({ data });
      this.mission = data;
    } catch (error) {
      console.log({ error });
    }
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

  onSelectUser(event) {
    this.selectedUser = event?.data;
    console.log({ user: this.selectedUser });
  }

  async onAssign() {
    let data: any = [];
    try {
      data = await this.missionService
        .assignUserToMission(this.mission.id, this.selectedUser.id)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
  }
}
