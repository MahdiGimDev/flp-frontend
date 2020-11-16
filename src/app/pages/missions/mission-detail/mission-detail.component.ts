import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import { AuthService } from "../../../@core/auth/auth.service";
import {
  skillsModel,
  MissionCreateModel,
  JwtPayload,
} from "../../../@core/models/auth.model";
import { UserModel } from "../../../@core/models/entity.model";
import { MissionsService } from "../../../@core/services/missions.service";
import { SkillsService } from "../../../@core/services/skills.service";
import { UsersService } from "../../../@core/services/users.service";
import { UserProfileComponent } from "../../../shared/components/user-profile/user-profile.component";

@Component({
  selector: "ngx-mission-detail",
  templateUrl: "./mission-detail.component.html",
  styleUrls: ["./mission-detail.component.scss"],
})
export class MissionDetailComponent implements OnInit {
  skills: Array<skillsModel> = [];
  users: Array<UserModel> = [];
  userSource: LocalDataSource = new LocalDataSource();
  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: "view",
          title: '<span class="btn btn-sm btn-info">View</span>',
        },
        {
          name: "invite",
          title: '<span class="btn btn-sm btn-success">Invite</span>',
        },
      ],
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
    endDate: "",
    level: "",
    skills: [],
    skillsIds: [],
    suggestion: [],
  };
  currentLevel = 1;
  currentType = 1;
  errorMessageMission = "";
  successMessageMission = "";
  selectedSkills = [];
  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private missionService: MissionsService,
    private userService: UsersService,
    private authService: AuthService,
    private skillsService: SkillsService
  ) {}
  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };
  errorLogin = "";
  currentUser: JwtPayload;
  ngOnInit(): void {
    this.currentUser = this.authService.getTokenData();
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadMission(id);
      if (this.currentUser.role == "RH" || this.currentUser.role == "ADMIN") {
        this.loadUsers();
        this.loadSkills();
      }
    });
  }

  onChange(value) {
    this.currentType = value;
  }

  onChangeLevel(value) {
    this.currentLevel = value;
  }

  async loadUsers() {
    if (this.mission.status != "FINDING" && this.mission.status != "PENDING") {
      return;
    }
    let users: any = [];
    try {
      let skills = "";
      this.mission.skills.map((skill) => {
        skills += skill.label + ",";
      });
      users = await this.userService.getUsersBySkills(skills).toPromise();
      this.users = users.filter(
        (u) => !this.mission.suggestion.find((user) => user.id === u.id)
      );
      this.userSource.load(this.users);
    } catch (error) {
      console.log({ error });
    }
  }
  async loadMission(id) {
    let data: any = [];
    try {
      data = await this.missionService.getMissionById(id).toPromise();
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
    // this.selectedUser = event?.data;
    // console.log({ user: this.selectedUser });
  }
  testVar: any;
  async viewProfile(user: UserModel) {
    this.dialogService.open(UserProfileComponent, {
      context: { user, admin: this.currentUser.role == "ADMIN" ||  this.currentUser.role == "RH"},
    });
  }
  async onCustomAction(event) {
    const user: UserModel = event.data;
    if (event.action === "invite") {
      this.onInvite(user);
    } else if (event.action === "view") {
      this.viewProfile(user);
    }
  }
  async onRemoveInvite(user: UserModel) {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .removeInvitationToMission(this.mission.id, user.id)
        .toPromise();
      await this.loadMission(this.mission.id);
      this.loadUsers();
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onAcceptInvitation(user: UserModel) {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .assignUserToMission(this.mission.id, user.id)
        .toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onConfirm() {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .confirmMission(this.mission.id)
        .toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onInvite(user: UserModel) {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .inviteUserToMission(this.mission.id, user.id)
        .toPromise();
      await this.loadMission(this.mission.id);
      this.loadUsers();
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
}
