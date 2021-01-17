import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/@core/auth/auth.service';
import { DocumentModel } from 'app/@core/models/entity.model';
import { DocumentService } from 'app/@core/services/document.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  type= "all";
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
      title: {
        title: "Titre document",
        type: "string",
      },
      sujet: {
        title: "Sujet",
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
        title: "Date",
        type: "string",
      },
    
      version: {
        title: "version",
        type: "string",
      },
    },
  };




  constructor(


    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private docService: DocumentService


  ) { }

  documents : Array<DocumentModel> [];
  
  ngOnInit(): void {
   this.loadDocuments();

  }
  source: LocalDataSource = new LocalDataSource();


  async loadDocuments() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (this.type.toLocaleLowerCase() == "all") {
        data = await this.docService.getAllDocuments().toPromise();
        this.source.load(data);
      } else {
        data = await this.docService.getDocumentsByType(this.type).toPromise();
        this.source.load(data);
      }
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onDeleteConfirm(event) {
    const mission: DocumentModel = event.data;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.docService.deleteDocument(mission.id).toPromise();
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
    const mission: DocumentModel = event.data;
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
    this.router.navigate(["/pages/documents/detail", userID]);
  }

  }


