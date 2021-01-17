import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/@core/auth/auth.service';
import { JwtPayload } from 'app/@core/models/auth.model';
import { FormationModel } from 'app/@core/models/entity.model';
import { FormationService } from 'app/@core/services/formation.service';
import { VacationService } from 'app/@core/services/vacation.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {

  statusList = ["all", "approuvee", "refusee", "non approuvee"];
  typelist = ["experience", "formation", "projet"];

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
        title: "Titre",
        type: "string",
      },

      categorie: {
        title: "Situation",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "PRO", title: "PRO" },
              { value: "UNIVERSITAIRE", title: "UNIVERSITAIRE" },
              { value: "AUTRE", title: "AUTRE" },
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
      
      type: {
        title: "Categorie",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "EN COURS", title: "EN COURS" },
              { value: "ACCEPTEE", title: "ACCEPTEE" },
              { value: "REFUSEE", title: "REFUSEE" },
            ],
          },
        },
      },
      type2: {
        title: "Type",
        type: "html",
        editor: {
          type: "selected",
          config: {
            selected: [
              { value: "EN COURS", title: "EN COURS" },
              { value: "ACCEPTEE", title: "ACCEPTEE" },
              { value: "REFUSEE", title: "REFUSEE" },
            ],
          },
        },
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
    private formationService: FormationService
  ) {}


  ngOnInit(): void {
    this.currentUser = this.authService.getTokenData();
    this.route.params.subscribe(async (params) => {
      const status = `${params.status}`.toLowerCase();
      this.status = this.statusList.includes(status) ? status : "all";
      this.loadFormations();
    });
  }

  async loadFormations() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (
        this.currentUser.role == "PROVIDER" ||
        this.currentUser.role == "EMPLOYEE" ||
        this.currentUser.role == "COMMERCIAL" ||
        this.currentUser.role == "OPERATIONAL" 
        
      ) {
        if (this.status.toLowerCase() === "all") {
          data = await this.formationService
            .getMyVacations()
            .toPromise();
        } else {
          data =await this.formationService.getMyVacations().toPromise();
          data=data.filter(e=>e.status.toLocaleLowerCase()==this.status);
          console.log(this.status.toLocaleLowerCase());
        }
      } else if (
        this.currentUser.role == "RH" ||
        this.currentUser.role == "ADMIN"
      ) {
        if (this.status.toLowerCase() === "all") {
          data = await this.formationService.getAllFormations().toPromise();
        } else {
          data =await this.formationService.getAllFormations().toPromise();
          data=data.filter(e=>e.status.toLocaleLowerCase()==this.status);
          console.log(this.status.toLocaleLowerCase());
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
    const formationID = event?.data?.id;
    this.router.navigate(["/pages/formations/detail", formationID]);
  }
  async onDeleteConfirm(event) {
    const formation: FormationModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.formationService.deleteVacation(formation.id).toPromise();
        event.confirm.resolve();
        this.loadFormations();
      } catch (error) {
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }


}
