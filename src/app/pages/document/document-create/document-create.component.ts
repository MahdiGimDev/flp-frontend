import { Component, OnChanges, OnInit, Type } from "@angular/core";
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
    clientId: 0,
    sujet: "",
    description: "",
    title: "",
    type: "",
    version: "",
    startDate: "",
    file: "",
  };

  documentForm: FormGroup;

  currentLevel = 1;
  currentType = 1;
  
  selectedType = '';
  currentVersion = 1;
  errorMessageMission = "";
  successMessageMission = "";


  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
   
    columns: {
     
      firstName: {
        title: "First Name",
        type: "string",
      },
      lastName: {
        title: "Last Name",
        type: "string",
      },
   
   
   
      email: {
        title: "E-mail",
        type: "string",
      },


      /*typep: {
        title: "Type",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "PHYSIQUE", title: "physique" },
              { value: "MORAL", title: "moral" },
            
            ],
          },
        },
      },*/

      role: {
        title: "Role",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "ADMIN", title: "Admin" },
              { value: "EMPLOYEE", title: "Employee" },
              { value: "RH", title: "RH" },
              { value: "PROVIDER", title: "Provider" },
              { value: "OPERATIONAL", title: "Operational" },
              { value: "COMMERCIAL", title: "Commercial" },
              { value: "CLIENT", title: "Client" },
            ],
          },
        },
      },
    },
  };

  /*settings2 = {
    
    columns: {
   
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
*/
  
 userSource: LocalDataSource = new LocalDataSource();
  constructor(
    private router: Router,
    private documentService: DocumentService,
    private usersService: UsersService,

    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.createForm();
  }
  public doSelectOptions = (options: INgxSelectOption[]) => {
    options.map((option) => { });
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

  ngOnInit(): void {
  this.loadUsers();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  async onChange(value) {
    this.currentType = value;
    console.log({value});
    let users: any = [];
    if (this.currentType == 3 ||this.currentType == 5) {
      this.userSource.load([]);
      users = await this.usersService.getUsersByRole("provider").toPromise();
      this.userSource.load(users);
    }else if (this.currentType == 2 || this.currentType == 1 ||this.currentType == 7) {
      this.userSource.load([]);
      users = await this.usersService.getUsersByRole("client").toPromise();
      this.userSource.load(users);
    }
    else if (this.currentType ==6 ){
      this.userSource.load([]);
      users = await this.usersService.getUsersByType("MORAL").toPromise();
      this.userSource.load(users);


    }

    else if (this.currentType == 9 || this.currentType == 4 ) {
      this.userSource.load([]);
      users = await this.usersService.getUsersByRole("employee").toPromise();
      this.userSource.load(users);
    }
    else {
      this.userSource.load([]);
      users = await this.usersService.getAllUsers().toPromise();
      this.userSource.load(users);

    }
}

  onChange2(value) {
    this.currentVersion = value;

  }
 
  async loadUsers() {
    let users: any = [];
    users = await this.usersService.getUsersByRole("CLIENT").toPromise();
    this.userSource.load(users);
  }
  catch(error) {
    console.log({ error });
  }

  ///LA METHODE QUI FONCTIONNE load user by role client
  /*users = await this.usersService.getUsersByRole("client").toPromise();
  this.userSource.load(users);
} catch (error) {
  console.log({ error });
}

*/


  async onSelectUser(event) {
    this.selectedUser = event?.data;
    console.log({ user: this.selectedUser });
  }

  onSelectType(event) {
    this.selectedType = event?.data;
    console.log({ user: this.selectedType });
  }


  /*async selected (event){
  let type: any;
  let selected:any;
  this.selectedType = event?.data;
  
     if (this.currentType == 3) {
      selected = "BON DE COMMANDE FOURNISSEUR"
  }
  
  
  }*/
  async createDocument() {
    console.log({ document: this.documentDTO });
    let type: any;
    let version: any;


    if (this.currentVersion == 0) {
      this.errorMessageMission = "version invalid veuillez choisir un type";
      return false;
    }
    if (this.currentVersion == 1) {
      version = "VERSION REMPLIE";

    } else if (this.currentVersion == 2) {
      version = "VERSION BASIQUE";
    }
    this.errorMessageMission = "";
    this.successMessageMission = "";


    if (this.currentType == 0) {
      this.errorMessageMission = "type invalid veuillez choisir un type";
      return false;
    }
    if (this.currentType == 1) {
      type = "FACTURE CLIENT";



    } else if (this.currentType == 2) {
      type = "BON DE COMMANDE CLIENT";
    } else if (this.currentType == 3) {


      type = "BON DE COMMANDE FOURNISSEUR";
      this.loadUsers;

    }
    else if (this.currentType == 4) {
      type = "CONTRAT EMPLOYEE";


    }
    else if (this.currentType == 5) {
      type = "CONTRAT FOURNISSEUR PHYSIQUE";
    }
    else if (this.currentType == 6) {
      type = "CONTRAT CLIENT";
    }
    else if (this.currentType == 7) {
      type = "CONTRAT FOURNISSEUR MORAL";
    }
    else if (this.currentType == 8) {
      type = "CONTRAT CLIENT";
    }
    else if (this.currentType == 9) {
      type = "DOCUMENT COMPTABILITE";
    }
    else if (this.currentType == 10) {
      type = "DOCUMENT DE PAIE";
    }

    else {
      type = "AUTRE";
    }
    const d = new Date(this.documentForm.get("startDate").value);

    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();

    this.document = {
      id: 0,
      title: this.documentForm.get("title").value,
      type,
      clientId: this.selectedUser.id,
      version,
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

  /*async onUploadDocument() {
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
  }*/
}
