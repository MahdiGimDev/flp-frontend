import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { skillsModel } from "../../../@core/models/auth.model";
import { SkillsService } from "../../../@core/services/skills.service";

@Component({
  selector: "ngx-skills-list",
  templateUrl: "./skills-list.component.html",
  styleUrls: ["./skills-list.component.scss"],
})
export class SkillsListComponent implements OnInit {
  settings = {
    actions: {
      add: false,
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
      label: {
        title: "label",
        type: "string",
      },
      description: {
        title: "description",
        type: "textarea",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private skillsService: SkillsService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.loadSkills();
    });
    this.loadSkills();
  }

  async loadSkills() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      data = await this.skillsService.getAllSkills().toPromise();
      this.source.load(data);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onDeleteConfirm(event) {
    const mission: skillsModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.skillsService.deleteSkills(mission.id).toPromise();
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
    const mission: skillsModel = event.data;
    console.log({ mission });
    if (window.confirm("Are you sure you want to Edit?")) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
