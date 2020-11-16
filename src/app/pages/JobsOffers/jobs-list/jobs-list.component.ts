import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobModel } from 'app/@core/models/auth.model';
import { JobService } from 'app/@core/services/job.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

 


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
        title: "Titre ",
        type: "string",
      },
    
      poste: {
        title: "Poste ",
        type: "string",
      },

      startDate: {
        title: "Date Debut",
        type: "string",
      },

      formation: {
        title: "Formation ",
        type: "string",
      },


      
     
      status: {
        title: "Status",
        type: "string",
      },

    
  },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
     // const type = `${params.type}`.toLowerCase();
     // this.type = this.types.includes(type) ? type : "all";
      this.loadJobs();
    });
    this.loadJobs();
  }
 

  async loadJobs() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      
        data = await this.jobService.getAllJobs().toPromise();
        this.source.load(data);
      } 
        
     catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  onClickRow(event) {
    const jobID = event?.data?.id;
    this.router.navigate(["/pages/jobs/detail", jobID]);
  }







  async onDeleteConfirm(event) {
    const job: JobModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.jobService.deleteJob(job.id).toPromise();
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
    const job: JobModel = event.data;
    console.log({ job });
    if (window.confirm("Are you sure you want to Edit?")) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


}
