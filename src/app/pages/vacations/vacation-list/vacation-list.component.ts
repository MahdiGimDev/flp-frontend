import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../../@core/auth/auth.service";
import { UserService } from "../../../@core/mock/users.service";
import { JwtPayload } from "../../../@core/models/auth.model";
import { VacationModel } from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
import { VacationService } from "../../../@core/services/vacation.service";

@Component({
  selector: "ngx-vacation-list",
  templateUrl: "./vacation-list.component.html",
  styleUrls: ["./vacation-list.component.scss"],
})
export class VacationListComponent implements OnInit {
  statusList = ["all", "en attente", "refusee", "acceptee"];
  status = "all";
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
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
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
        title: "Titre Repos",
        type: "string",
      },

      profil: {
        title: "Titre Repos",
        type: "string",
      },
      type: {
        title: "Type",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "SICKNESS", title: "Maladie" },
              { value: "VACATION", title: "Repos" },
            ],
          },
        },
      },
      startDate: {
        title: "Date Debut",
        type: "string",
      },
      endDate: {
        title: "Date fin",
        type: "string",
      },
      period: {
        title: "Nombre de jours",
        type: "string",
      },
      status: {
        title: "Status",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "EN ATTENTE", title: "EN ATTENTE" },
              { value: "ACCEPTEE", title: "ACCEPTEE" },
              { value: "REFUSEE", title: "REFUSEE" },
            ],
          },
        },
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  currentUser: JwtPayload;
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private vacationService: VacationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getTokenData();
    this.route.params.subscribe(async (params) => {
      const status = `${params.status}`.toLowerCase();
      this.status = this.statusList.includes(status) ? status : "all";
      this.loadVacations();
    });
  }

  async loadVacations() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (
        this.currentUser.role == "PROVIDER" ||
        this.currentUser.role == "EMPLOYEE" 
        
      ) {
        if (this.status.toLowerCase() === "all") {
          data = await this.vacationService
            .getMyVacations()
            .toPromise();
        } else {
          data = await this.vacationService
            .getMyVacationsByStatus(this.status)
            .toPromise();
        }
      } else if (
        this.currentUser.role == "RH" ||
        this.currentUser.role == "ADMIN"
      ) {
        if (this.status.toLowerCase() === "all") {
          data = await this.vacationService.getAllVacations().toPromise();
        } else {
          data = await this.vacationService
            .getVacationsByStatus(this.status)
            .toPromise();
        }
      }
      console.log({ data });
      this.source.load(data);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  onClickRow(event) {
    const vacationID = event?.data?.id;
    this.router.navigate(["/pages/vacations/detail", vacationID]);
  }

  async onDeleteConfirm(event) {
    const vacation: VacationModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.vacationService.deleteVacation(vacation.id).toPromise();
        event.confirm.resolve();
        this.loadVacations();
      } catch (error) {
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }
}
