import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { missionModel } from 'app/@core/models/auth.model';
import { MissionsService } from 'app/@core/services/missions.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
 type = "all";
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
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      titre: {
        title: "title",
        type: "string",
      },
      profil: {
        title: "profil",
        type: "string",
      },
      type: {
        title: "type",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "FORMATION", title: "Junior" },
              { value: "AUDIT", title: "Audit" },
              { value: "CONSULTING", title: "Consulting" },
              { value: "AUTRE", title: "AUTRE" },
            ],
          },
        },
      },
      skills: {
        title: "skills",
        type: "string",
      },
     technologies: {
        title: "technologies",
        type: "string",
      },



      niveauEx: {
        title: "level Experience",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "JUNIOR", title: "Junior" },
              { value: "SENIOR", title: "Senior" },
              { value: "EXPERT", title: "Expert" },
           
            ],
          },
        },
      },

    dateDebut: {
        title: "date debut",
        type: "string",
      },

     durée: {
        title: "durée",
        type: "string",
      },

      emplacement: {
        title: "location",
        type: "string",
      },

     description: {
        title: "description",
        type: "string",
      },


      status: {
        title: "status",
        type: "string",
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private missionService: MissionsService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const type = `${params.type}`.toLowerCase();
      this.type = this.types.includes(type) ? type : "all";
      console.log({ type });
      this.loadMissions();
    });
    this.loadMissions();
  }

  async loadMissions() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (this.type  == "all") {
        data = await this.missionService.getAllMissions().toPromise();
        this.source.load(data);
      } else {
        data = await this.missionService.getMissionsByType(this.type).toPromise();
        this.source.load(data);
      }
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onDeleteConfirm(event) {
    const mission: missionModel = event.data;
    console.log({ mission });
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
}
