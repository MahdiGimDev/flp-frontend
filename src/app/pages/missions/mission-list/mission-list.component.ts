import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtPayload, missionModel } from "app/@core/models/auth.model";
import { MissionsService } from "app/@core/services/missions.service";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../../@core/auth/auth.service";

@Component({
  selector: "ngx-mission-list",
  templateUrl: "./mission-list.component.html",
  styleUrls: ["./mission-list.component.scss"],
})
export class MissionListComponent implements OnInit {
  types = ["formation", "audit", "consulting", "autre"];
  settings = {
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

    display: {
      editButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      title: {
        title: "Titre Mission",
        type: "string",
      },
      type: {
        title: "Type",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "FORMATION", title: "Junior" },
              { value: "AUDIT", title: "Audit" },
              { value: "CONSULTING", title: "Consulting" },
              { value: "AUTRE", title: "AUTRE" },
            ],
          },
        },
      },
      startDate: {
        title: "Date Debut",
        type: "string",
      },
      period: {
        title: "Nombre de jours",
        type: "string",
      },
      status: {
        title: "Status",
        type: "string",
      },
  },
  };

  source: LocalDataSource = new LocalDataSource();
  currentUser: JwtPayload;
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private missionService: MissionsService
  ) {
    this.currentUser = this.authService.getTokenData();
  }

  async ngOnInit() {
    this.loadMissions();
  }

  async loadMissions() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (this.currentUser.role == "CLIENT") {
        data = await this.missionService
          .getAllClientMissions(this.currentUser.id)
          .toPromise();
      } else if (
        this.currentUser.role == "RH" ||
        this.currentUser.role == "ADMIN"
      ) {
        data = await this.missionService.getAllMissions().toPromise();
      }
      this.source.load(data);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  onClickRow(event) {
    const missionID = event?.data?.id;
    this.router.navigate(["/pages/missions/detail", missionID]);
  }

  async onDeleteConfirm(event) {
    const mission: missionModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.missionService.deleteMission(mission.id).toPromise();
        event.confirm.resolve();
      } catch (error) {
        console.log({ error });
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event) {
    const mission: missionModel = event.data;
    console.log({ mission });
    if (window.confirm("Are you sure you want to Edit?")) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  //methode to load mission in detail mission by id
}
