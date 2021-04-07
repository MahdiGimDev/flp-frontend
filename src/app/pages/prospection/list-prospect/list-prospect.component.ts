import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/@core/auth/auth.service';
import { prospectCreateModel } from 'app/@core/models/auth.model';
import { ProspectService } from 'app/@core/services/prospect.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-list-prospect',
  templateUrl: './list-prospect.component.html',
  styleUrls: ['./list-prospect.component.scss']
})
export class ListProspectComponent implements OnInit {



  status= "all";
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
      nom: {
        title: "nom prospect",
        type: "string",
      },
      email: {
        title: "Email",
        type: "string",
      },
     
      phonenumber: {
        title: "Numero Tel",
        type: "string",
      },
      startDate: {
        title: "Date",
        type: "string",
      },
     
    
      status: {
        title: "Status",
        type: "string",
      },
    },
  };




  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private prospectService: ProspectService
  ) { 


    
  }

  ngOnInit(): void {
    this.loadProspects();
 
   }
   source: LocalDataSource = new LocalDataSource();

   async loadProspects() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (this.status.toLocaleLowerCase() == "all") {
        data = await this.prospectService.getAllProspect().toPromise();
        this.source.load(data);
      } else {
        data = await this.prospectService.getProspectsByType(this.status).toPromise();
        this.source.load(data);
      }
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }



  async onDeleteConfirm(event) {
    const prospect: prospectCreateModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.prospectService.deletePros(prospect.id).toPromise();
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
    const mission: prospectCreateModel = event.data;
    console.log({ mission });
    if (window.confirm("Are you sure you want to Edit?")) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onClickRow(event) {
    const userID = event?.data?.id;
    this.router.navigate(["/pages/prospects/detail", userID]);
  }






  }

