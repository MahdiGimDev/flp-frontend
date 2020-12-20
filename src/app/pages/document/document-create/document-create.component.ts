import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DocumentCreateModel } from "app/@core/models/auth.model";
import { UserModel } from "app/@core/models/entity.model";
import { DocumentService } from "app/@core/services/document.service";
import { UsersService } from "app/@core/services/users.service";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import { NgxSpinnerService } from "ngx-spinner";
import { DocumentModule } from "../document.module";

@Component({
  selector: "ngx-document-create",
  templateUrl: "./document-create.component.html",
  styleUrls: ["./document-create.component.scss"],
})
export class DocumentCreateComponent implements OnInit {
  public files: any;
  selectedFile: File;
  document: DocumentCreateModel = null;
  selectedUser: UserModel = null;
  documentDTO: DocumentCreateModel = {
    id: 0,
    // clientId: 0,
    sujet: "",
    description: "",
    title: "",
    type: "",
    startDate: "",
    file: "",
  };

  documentForm: FormGroup;
  currentLevel = 1;
  currentType = 1;
  errorMessageMission = "";
  successMessageMission = "";
  selectedSkills = [];
  userSource: LocalDataSource = new LocalDataSource();
  constructor(
    private router: Router,
    private documentService: DocumentService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.createForm();
  }
  public doSelectOptions = (options: INgxSelectOption[]) => {
    options.map((option) => {});
  };
  createForm() {
    this.documentForm = this.fb.group({
      title: ["", Validators.required],
      startDate: ["", Validators.required],
      sujet: ["", Validators.required],
      file: [""],
      description: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onChange(value) {
    this.currentType = value;
  }

  onSelectUser(event) {
    this.selectedUser = event?.data;
    console.log({ user: this.selectedUser });
  }

  async createDocument() {
    console.log({ document: this.documentDTO });
    if (this.currentType == 0) {
      this.errorMessageMission = "type invalid veuillez choisir un type";
      return false;
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";
    let type: any;
    if (this.currentType == 1) {
      type = "FACTURE";
    } else if (this.currentType == 2) {
      type = "BON DE COMMANDE";
    } else if (this.currentType == 3) {
      type = "COMPTABILITE";
    } else {
      type = "AUTRE";
    }
    const d = new Date(this.documentForm.get("startDate").value);

    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();

    this.document = {
      id: 0,
      title: this.documentForm.get("title").value,
      type,
      sujet: this.documentForm.get("sujet").value,
      startDate: date,
      description: this.documentForm.get("description").value,
      file: "",
    };
    try {
      const data: any = await this.documentService
        .createMission(this.document, this.selectedFile)
        .toPromise();
      if (window.confirm("Fichier ajoutée avec succés"))
        if (data.id) {
          this.router.navigate(["/pages/documents/all"]);
          this.successMessageMission = "Created successfully";
        } else {
          this.errorMessageMission = data?.message?.message;
        }
    } catch (error) {
      if (error.error) {
        this.errorMessageMission = error.error.message;
      } else {
        this.errorMessageMission = "Error on creating";
      }
    }
  }
  get id() {
    return this.documentForm.get("id");
  }

  get title() {
    return this.documentForm.get("title");
  }
  get type() {
    return this.documentForm.get("type");
  }

  get startDate() {
    return this.documentForm.get("startDate");
  }

  get file() {
    return this.documentForm.get("file");
  }
  get sujet() {
    return this.documentForm.get("sujet");
  }
  get description() {
    return this.documentForm.get("description");
  }

  async onUploadDocument() {
    this.spinner.show();
    try {
      await this.documentService
        .uploadDocument(this.document.id, this.selectedFile)
        .toPromise();
      this.document.id;
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }
}
