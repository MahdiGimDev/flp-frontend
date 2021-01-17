import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentModel } from 'app/@core/models/entity.model';
import { DocumentService } from 'app/@core/services/document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  id = -1;
  constructor(

    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private docService:DocumentService

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.loadDocument(this.id);

  }

  document: DocumentModel = null;
  documentEdit: DocumentModel = null;
  updateSuccessMsg = "";
  updateErrorMsg = "";
  delayMessage = 3500;
  editable = false;
  public files: any;
  selectedFile: File;






  async loadDocument(id) {
    this.spinner.show();
    try {
      this.editable = false;
      const data: any = await this.docService.getUser(id).toPromise();
      this.document = data;
      this.documentEdit = { ...data };
      
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }
  async onUploadDocument() {
    this.spinner.show();
    try {
      await this.docService
        .uploadDocument(this.document.id, this.selectedFile)
        .toPromise();
      this.loadDocument(this.document.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }


  hideMessages() {
    setTimeout(() => {
      this.hideErrorMsg();
      this.hideSuccessMsg();
    }, this.delayMessage);
  }

  hideErrorMsg() {
    this.updateErrorMsg = "";
  }
  hideSuccessMsg() {
    this.updateSuccessMsg = "";
  }
  toggleEdit() {
    this.documentEdit = { ...this.document };
    this.editable = !this.editable;
  }
  async onSaveChanges() {
    try {
    

      const payload = { ...this.documentEdit };
      await this.docService.updateProfileUser(payload).toPromise();
      this.loadDocument(this.documentEdit.id);
    } catch (error) {
      console.log({ error });
    }
    console.log({ edit: this.documentEdit });
  }
}
