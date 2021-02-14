import {
  DatePipe,
  getLocaleDateFormat,
  getLocaleDateTimeFormat,
} from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbRoleProvider } from "@nebular/security";
import { NbDialogService } from "@nebular/theme";
import { CertifsService } from "app/@core/services/certifs.service";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../../@core/auth/auth.service";
import { UsersSettings } from "../../../@core/data/variables";
import pdfMake from "pdfmake/build/pdfmake";

import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {
  skillsModel,
  MissionCreateModel,
  JwtPayload,
  certifsModel,
  tarifModel,
} from "../../../@core/models/auth.model";
import { UserModel } from "../../../@core/models/entity.model";
import { MissionsService } from "../../../@core/services/missions.service";
import { SkillsService } from "../../../@core/services/skills.service";
import { UsersService } from "../../../@core/services/users.service";
import { UserProfileComponent } from "../../../shared/components/user-profile/user-profile.component";
import { url } from "inspector";
import { table } from "console";
import { format, getDate, getDay, getMonth } from "date-fns";
import {
  QuizDataTableSettings,
  QuizModel,
  QuizSessionDataTableSettings,
} from "app/pages/quizz/quizz.model";
import { environment } from "environments/environment";
import { QuizService } from "app/@core/services/quizz.service";

@Component({
  selector: "ngx-mission-detail",
  templateUrl: "./mission-detail.component.html",
  styleUrls: ["./mission-detail.component.scss"],
})
export class MissionDetailComponent implements OnInit {
  public files: any;
  selectedFileDevise: File;
  selectedFileVisa: File;
  selectedFileLogement: File;

  selectedFileTransport: File;

  selectedFileBonfile: File;

  selectedPlanFile: File;

  tarifForm: FormGroup;

  link = environment.baseUrl;
  quizSource2: LocalDataSource = new LocalDataSource();
  responseSettings2 = QuizSessionDataTableSettings;
  responseSource2: LocalDataSource = new LocalDataSource();

  skills: Array<skillsModel> = [];
  certifs: Array<certifsModel> = [];

  users: Array<UserModel> = [];
  userSource: LocalDataSource = new LocalDataSource();
  settings2 = {
    ...QuizDataTableSettings,
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: "view",
          title: '<span class="btn btn-sm btn-info">View</span>',
        },
        {
          name: "assign",
          title: '<span class="btn btn-sm btn-success">Assign</span>',
        },
      ],
    },
  };
  settings = {
    ...UsersSettings,
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: "view",
          title: '<span class="btn btn-sm btn-info">View</span>',
        },
        {
          name: "invite",
          title: '<span class="btn btn-sm btn-success">Envoyer</span>',
        },
      ],
    },
  };
  mission: MissionCreateModel = {
    id: 0,
    address: "",
    description: "",
    period: 0,
    title: "",
    status: "",
    planfile: "",
    bonfile: "",
    purchase: "",
    invoice: "",
    visa: "",
    logement: "",
    categorie: "",
    transport: "",
    devise: "",
    technologies: "",
    type: "",
    startDate: "",
    endDate: "",
    level: "",
    skills: [],
    skillsIds: [],
    suggestion: [],
  };
  currentLevel = 1;
  currentType = 1;
  errorMessageMission = "";
  successMessageMission = "";
  id = -1;
  errorLogin = "";
  currentUser: JwtPayload;
  selectedSkills = [];

  Date2 = new Date();
  date = Date.now();

  private fb: FormBuilder;

  constructor(
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private missionService: MissionsService,
    private userService: UsersService,
    private router: Router,
    private authService: AuthService,
    private skillsService: SkillsService,
    private certifsService: CertifsService,
    private spinner: NgxSpinnerService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.currentUser = this.authService.getTokenData();
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadMission(id);
      if (this.currentUser.role == "RH" || this.currentUser.role == "ADMIN") {
        this.loadUsers();
        this.loadSkills();
        this.loadCertifs();
      }
    });
  }

  myFunction(): string {
    const d = new Date(this.Date2);

    const date = d.getDate() + "-" + d.getMonth() + 1 + "-" + d.getFullYear();

    return date;
  }

  /////////////////////////////////

  ////////////////////////////////////calcule des total ttc && total Hors taxe
  tva: string;
  tvaf: string;
  tvafm: string;
  tarifclient: string;
  totalttcf: number;
  totalhtf: number;
  totalttc: number;
  totalht: number;
  tjm: number;
  numFacture: string;
  designation: string;

  //methode calcul Tjm:

  tjmMethode(tjm: number) {
    tjm: 0;
    if (this.mission.categorie == "EN DISTANCIEL") {
      this.tjm = this.mission.user.tjmd;
    } else this.tjm = this.mission.user.tjme;

    return this.tjm;
  }

  ///methode Total facture
  tarifMethode() {
    this.totalht = parseInt(this.tarifclient) * this.mission.period;

    this.totalttc =
      ((parseInt(this.tva) * parseInt(this.tarifclient)) / 100 +
        parseInt(this.tarifclient)) *
      this.mission.period;
  }

  //methode total bon commande
  totalttcMethodeFournisseur() {
    if (this.mission.categorie == "EN PRESENTIEL") {
      this.totalhtf = this.mission.user.tjme * this.mission.period;
      this.totalttcf =
        (parseInt(this.tva) * this.totalhtf) / 100 + this.totalhtf;
    } else {
      this.totalhtf = this.mission.user.tjmd * this.mission.period;
      this.totalttcf =
        (parseInt(this.tva) * this.mission.user.tjmd * this.mission.period) /
          100 +
        this.mission.user.tjmd * this.mission.period;
    }
  }

  ///////////////////////
  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };

  onChange(value) {
    this.currentType = value;
  }

  onChangeLevel(value) {
    this.currentLevel = value;
  }

  async loadUsers() {
    if (this.mission.status != "LIBRE") {
      return;
    }
    let users: any = [];
    try {
      let skills = "";
      this.mission.skills.map((skill) => {
        skills += skill.label + ",";
      });
      users = await this.userService
        .getUsersBySkills(skills, this.mission.id)
        .toPromise();

      this.users = users.filter(
        (u) => !this.mission.suggestion.find((user) => user.id === u.id)
      );
      this.users = users.filter((c) => c.role != "CLIENT");

      this.userSource.load(this.users);
    } catch (error) {
      console.log({ error });
    }
  }

  async loadMission(id) {
    tjm: Number;
    let data: any = [];
    try {
      data = await this.missionService.getMissionById(id).toPromise();
      this.link = environment.baseUrl + "/missions/" + id;

      this.mission = data;
      await this.loadQuiz();
      await this.loadSessions();
    } catch (error) {
      console.log({ error });
    }
  }

  async loadSessions() {
    let data: any = [];
    this.responseSource2.load(data);
    try {
      const quizList: any = await this.quizService
        .findSessionsByMission(this.mission.id)
        .toPromise();
      this.responseSource2.load(quizList);
    } catch (error) {
      console.log({ error });
    }
  }

  async loadQuiz() {
    let quiz: any = [];
    try {
      let skills = "";
      this.mission.skills.map((skill, i) => {
        skills += skill.label;
        if (i < this.mission.skills.length - 1) {
          skills += ",";
        }
      });
      quiz = await this.quizService
        .getQuizBySkills(skills, this.mission.level)
        .toPromise();
      console.log({ quiz });
      this.quizSource2.load(quiz);
    } catch (error) {
      console.log({ error });
    }
  }

  async onUnAssign2() {
    this.errorLogin = "";
    console.log('onUnAssign2');
    try {
      await this.missionService
        .removeQuizFromMission(this.mission.id)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  goToQuiz2(quiz: QuizModel) {
    this.router.navigateByUrl("/pages/quiz/edit/" + quiz.id);
  }

  async onCustomAction2(event) {
    const quiz: QuizModel = event.data;
    if (event.action === "assign") {
      this.onAssign2(quiz);
    } else if (event.action === "view") {
      this.goToQuiz2(quiz);
    }
  }
  async onAssign2(quiz: QuizModel) {
    this.errorLogin = "";
    try {
      await this.missionService
        .assignQuizToMission(this.mission.id, quiz.id)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }

  async loadSkills() {
    let data: any = [];
    try {
      data = await this.skillsService.getAllSkills().toPromise();
      this.skills = data;
    } catch (error) {
      console.log({ error });
    }
  }

  async loadCertifs() {
    let data: any = [];
    try {
      data = await this.certifsService.getAllCertifs().toPromise();
      this.certifs = data;
    } catch (error) {
      console.log({ error });
    }
  }

  onSelectUser(event) {
    // this.selectedUser = event?.data;
    // console.log({ user: this.selectedUser });
  }
  testVar: any;
  async viewProfile(user: UserModel) {
    this.dialogService.open(UserProfileComponent, {
      context: {
        user,
        admin: true,
      },
    });
  }
  async onCustomAction(event) {
    const user: UserModel = event.data;
    if (event.action === "invite") {
      this.onInvite(user);
    } else if (event.action === "view") {
      this.viewProfile(user);
    }
  }
  async onRemoveInvite(user: UserModel) {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .removeInvitationToMission(this.mission.id, user.id)
        .toPromise();
      await this.loadMission(this.mission.id);
      this.loadUsers();
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onAcceptInvitation(user: UserModel) {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .acceptMission(this.mission.id, this.currentUser.id)
        .toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onConfirm() {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .confirmMission(this.mission.id)
        .toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }

  ///////////Mission status En cours

  async onCancel() {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .cancelMission(this.mission.id)
        .toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }

  async onAvailable() {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .availableMission(this.mission.id)
        .toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }

  async onUploadPlanMission() {
    this.spinner.show();
    try {
      await this.missionService
        .uploadPlanFileMission(this.mission.id, this.selectedPlanFile)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadBonfile() {
    this.spinner.show();
    try {
      await this.missionService
        .uploadBonfileMission(this.mission.id, this.selectedFileBonfile)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadBonVisa() {
    this.spinner.show();
    try {
      await this.missionService
        .uploadVisaMission(this.mission.id, this.selectedFileVisa)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadBonLogement() {
    this.spinner.show();
    try {
      await this.missionService
        .uploadLogementMission(this.mission.id, this.selectedFileLogement)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadBonTransport() {
    this.spinner.show();
    try {
      await this.missionService
        .uploadTransportMission(this.mission.id, this.selectedFileTransport)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onUploadBonDevise() {
    this.spinner.show();
    try {
      await this.missionService
        .uploadDeviseMission(this.mission.id, this.selectedFileDevise)
        .toPromise();
      this.loadMission(this.mission.id);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  onFileChangePlanfile(event) {
    this.selectedPlanFile = event.target.files[0];
  }
  onFileChanged(event) {
    this.selectedFileBonfile = event.target.files[0];
  }

  onFileChangedVisa(event) {
    this.selectedFileVisa = event.target.files[0];
  }

  onFileChangedDevise(event) {
    this.selectedFileDevise = event.target.files[0];
  }
  onFileChangedLogement(event) {
    this.selectedFileLogement = event.target.files[0];
  }
  onFileChangedTransport(event) {
    this.selectedFileTransport = event.target.files[0];
  }
  currentInvoice = 1;
  currentPurchase = 1;

  onChangeInvoice(value) {
    this.currentInvoice = value;
  }
  onChangePurchase(value) {
    this.currentPurchase = value;
  }

  async methodePurchaseInvoice() {
    let invoice: any;
    let purchase: any;
    if (this.currentInvoice == 2) {
      invoice = "true";
    } else if (this.currentInvoice == 1) {
      invoice = "false";
    }

    if (this.currentPurchase == 2) {
      purchase = "true";
    } else if (this.currentPurchase == 1) {
      purchase = "false";
    }
  }

  async onBlock() {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService.lockMission(this.mission.id).toPromise();
      await this.loadMission(this.mission.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onInvite(user: UserModel) {
    this.errorLogin = "";
    let data: any = [];
    try {
      data = await this.missionService
        .inviteUserToMission(this.mission.id, user.id)
        .toPromise();
      await this.loadMission(this.mission.id);
      this.loadUsers();
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }

  /*
  async TvaClacul(tvac:number,){
const tv =  

 
}
*/

  /////////////Generate Pdf Facture && bon de commande
  generateFacturePdf(action = "open") {
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition() {
    sessionStorage.setItem("mission", JSON.stringify(this.mission));
    const exs = [];

    return {
      content: [
        {
          columns: [
            [
              {
                image:
                  "data:image/png;base64,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",
              },
            ],

            this.getFactureObject2(),

            [],
          ],
        },

        {
          columns: [
            [],

            [],

            [
              {
                text: "Facture n° :" + this.numFacture,
                style: "jobtitle",
                margin: [0, 20, 30, 10],
              },
              {
                text: "Date :" + this.myFunction(),
                style: "facture",
              },
            ],
          ],
        },

        {
          columns: [
            [
              {
                text: "Nom : Freelance provider",
                style: "tel3",
              },
              {
                text: "Adresse  : Rue du Lac Huron ",
                style: "tel3",
              },

              {
                text: " Residence les Cascades BLOC1-B05  ",
                style: "tel3",
              },
              {
                text: " Code postal - Ville:Les Berges du Lac - 1053",
                style: "tel3",
              },

              {
                text: "Tel: +0033 25645558899",
                style: "tel2",
              },
            ],
            [this.getFactureObject(this.mission)],
          ],
        },

        {
          text: "Commande fournisseur PO1",
          style: "jobTitle",
        },
        {
          text: "Date de commande :",
          style: "facture",
        },

        this.getDetailsObject(this.mission),
        this.getDetailsTva(this.mission),

        {
          text: "En votre aimable règlement,",
        },
        {
          text: "Cordialement,",
          style: "tel6",
        },

        {
          text:
            "Conditions de paiement : 30 jours après la réception de la facture.",
          style: "tel4",
        },

        {
          text:
            "Nom du compte : Freelance Provider - RIB 08 008 0000 6751024965 39- Agence El Menzah (67)IBAN TN59 0800 80006751 0249 6539 Carte d Identification Fiscale: 1624513X",
          style: "tel5",
        },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: "underline",
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        name2: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 10],
        },
        tel: {
          margin: [0, 0, 0, 50],
        },

        tel2: {
          margin: [0, 0, 0, 20],
        },

        tel3: {
          margin: [0, 0, 0, 10],
        },
        tel4: {
          color: "#696969",
          margin: [0, 0, 0, 40],
        },
        tel6: {
          margin: [0, 0, 0, 40],
        },
        tel5: {
          alignment: "center",
          margin: [0, 0, 0, 40],
        },

        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        jobTitle2: {
          fontSize: 14,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 10],
          decoration: "underline",
        },
        jobTitle4: {
          fontSize: 14,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 0],
          decoration: "underline",
        },

        jobTitle10: {
          fontSize: 10,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 0],
        },
        jobTitle3: {
          fontSize: 30,
          bold: true,
          fillColor: "#4169E1",
          italics: true,
          margin: [0, 0, 0, 30],
        },
        facture: {
          fontSize: 14,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 12],
        },

        tableHeader: {
          bold: true,
          fillColor: "#C71585",
          color: "white",
        },

        tableHeader3: {
          margin: [25, 10, 10, 5],
          color: "black",
        },

        tableHeader6: {
          bold: "true",
          color: "black",
          margin: [25, 10, 10, 5],
        },

        tableHeader2: {
          bold: true,

          color: "blue",
        },
        tableHeader8: {
          bold: true,
          margin: [10, 10, 10, 10],
        },
      },
    };
  }

  getFactureObject(experience: MissionCreateModel) {
    const exs = [];
    exs.push([
      {
        columns: [
          [
            {
              text: "Facturé à :",
              style: "jobTitle4",
            },
            {
              text:
                "Nom : " +
                experience.client.lastName +
                " " +
                experience.client.firstName,
            },
            {
              text: "Adresse : " + experience.client.adress,
            },
            {
              text: "code-postal-ville : " + experience.client.ville,
              //alignment: 'right'
            },
            {
              text: "Tel :+" + experience.client.phonenumber,
              style: "tel",
            },
          ],
        ],
      },
    ]);

    return {
      table: {
        alignment: "right",
        widths: ["*"],
        body: [...exs],
      },
    };
  }
  /*getProfilePicObject() {
      return {
       // image:'assets/images/imageFlprovider.jpg',
        width: 75,
        alignment : 'right'
      };
    

  }*/

  /////////////////////

  getFactureObject2() {
    const exs = [];
    exs.push([
      {
        columns: [
          [
            {
              text: "Facture",
              fillColor: "red",
              style: "jobTitle10",
              alignment: "center",
              fontSize: 25,
              margin: [0, 30, 0, 30],
            },
          ],
        ],

        //////////////////// essaie
      },
    ]);

    return {
      table: {
        alignment: "right",
        fillColor: "red",
        widths: ["*"],
        body: [...exs],
      },
    };
  }

  getDetailsObject(educations: MissionCreateModel) {
    return {
      margin: [0, 0, 0, 35],
      table: {
        widths: ["*", "*", "*", "*"],
        margin: [0, 0, 0, 30],

        body: [
          [
            {
              text: "Qte",
              style: "tableHeader",
            },
            {
              text: "Designation",
              style: "tableHeader",
            },
            {
              text: "Prix unitaire HT",
              style: "tableHeader",
            },
            {
              text: "Total",
              style: "tableHeader",
            },
          ],

          [
            educations.period,
            this.designation,
            this.tarifclient,
            parseInt(this.tarifclient) * educations.period,
          ],

          [
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
          ],
          [
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
          ],
        ],
      },
    };
  }

  getDetailsTva(educations: MissionCreateModel) {
    return {
      margin: [320, 0, 0, 0],
      table: {
        weights: ["*", "*"],

        body: [
          [
            {
              text: "Total HT",
              style: "tableHeader3",
            },
            {
              text: [parseInt(this.tarifclient) * educations.period] + "" + "€",
              style: "tableHeader3",
            },
          ],
          [
            {
              text: "T.V.A" + this.tva + "" + "%",
              style: "tableHeader3",
            },
            {
              text:
                [
                  (parseInt(this.tva) *
                    (parseInt(this.tarifclient) * educations.period)) /
                    100,
                ] + "€",
              style: "tableHeader3",
            },
          ],

          [
            {
              text: "Total TTC",
              style: "tableHeader3",
            },
            {
              text:
                [
                  parseInt(this.tarifclient) * educations.period +
                    (parseInt(this.tva) *
                      (parseInt(this.tarifclient) * educations.period)) /
                      100,
                ] +
                "" +
                "€",
              style: "tableHeader6",
            },
          ],
        ],
      },
    };
  }

  /////////Part of Generate BON COMMADE FILE:

  generatePdfboncommande(action = "open") {
    const documentDefinition = this.getDocumentDefinitionbc();

    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinitionbc() {
    sessionStorage.setItem("mission", JSON.stringify(this.mission));
    const exs = [];
    exs.push([
      {
        columns: [
          [
            {
              text: "Bon de commande",
              fillColor: "red",
              style: "jobTitle10",
              alignment: "center",
              fontSize: 25,
              margin: [0, 30, 0, 30],
            },
          ],
        ],

        //////////////////// essaie
      },
    ]);

    return {
      content: [
        {
          columns: [
            [],

            [
              {
                text: "Bon de commande n° :" + this.numFacture,
                style: "jobtitle",
                margin: [0, 20, 30, 10],
              },
              {
                text: "Date :" + this.myFunction(),
                style: "facture",
              },
            ],
          ],
        },

        {
          columns: [
            [
              {
                text: "Nom : Freelance provider",
                style: "tel3",
              },
              {
                text: "Adresse  : Rue du Lac Huron ",
                style: "tel3",
              },

              {
                text: " Residence les Cascades BLOC1-B05  ",
                style: "tel3",
              },
              {
                text: " Code postal - Ville:Les Berges du Lac - 1053",
                style: "tel3",
              },

              {
                text: "Tel: +0033 25645558899",
                style: "tel2",
              },
            ],
            [this.getFactureObjectBonCommande(this.mission)],
          ],
        },
        {
          text: "Commande fournisseur PO1",
          style: "jobTitle",
        },
        {
          text: "Date de commande :",
          style: "facture",
        },

        this.getDetailsObjectBonCommande(this.mission),
        this.getDetailsTvaBonCommande(this.mission),

        {
          text: "En votre aimable règlement,",
        },
        {
          text: "Cordialement,",
          style: "tel6",
        },

        {
          text:
            "Conditions de paiement : 40  jours après la fin de la mission.",
          style: "tel4",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: "underline",
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        name2: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 10],
        },
        tel: {
          margin: [0, 0, 0, 50],
        },

        tel2: {
          margin: [0, 0, 0, 20],
        },

        tel3: {
          margin: [0, 0, 0, 10],
        },
        tel4: {
          color: "#696969",
          margin: [0, 0, 0, 40],
        },
        tel6: {
          margin: [0, 0, 0, 40],
        },
        tel5: {
          alignment: "center",
          margin: [0, 0, 0, 40],
        },

        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        jobTitle2: {
          fontSize: 14,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 10],
          decoration: "underline",
        },
        jobTitle4: {
          fontSize: 14,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 0],
          decoration: "underline",
        },

        jobTitle10: {
          fontSize: 10,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 0],
        },
        jobTitle3: {
          fontSize: 30,
          bold: true,
          fillColor: "#4169E1",
          italics: true,
          margin: [0, 0, 0, 30],
        },
        facture: {
          fontSize: 14,
          bold: true,
          italics: true,
          margin: [0, 0, 0, 12],
        },

        tableHeader: {
          bold: true,
          fillColor: "#C71585",
          color: "white",
        },

        tableHeader3: {
          margin: [25, 10, 10, 5],
          color: "black",
        },

        tableHeader6: {
          bold: "true",
          color: "black",
          margin: [25, 10, 10, 5],
        },

        tableHeader2: {
          bold: true,

          color: "blue",
        },
        tableHeader8: {
          bold: true,
          margin: [10, 10, 10, 10],
        },
      },
    };
  }

  getFactureObjectBonCommande(experience: MissionCreateModel) {
    const exs = [];
    exs.push([
      {
        columns: [
          [
            {
              text: "Facturé à :",
              style: "jobTitle4",
            },
            {
              text:
                "Nom : " +
                experience.user.firstName +
                " " +
                experience.user.lastName,
            },
            {
              text: "Adresse : " + experience.user.adress,
            },
            {
              text: "code-postal-ville : " + experience.user.ville,
              //alignment: 'right'
            },
            {
              text: "Tel :+" + experience.user.phonenumber,
              //alignment: 'right'
            },
          ],
        ],
      },
    ]);

    return {
      table: {
        alignment: "right",
        fillColor: "red",
        widths: ["*"],
        body: [...exs],
      },
    };
  }
  /*getProfilePicObject() {
     return {
      // image:'assets/images/imageFlprovider.jpg',
       width: 75,
       alignment : 'right'
     };
   

 }*/

  getDetailsObjectBonCommande(educations: MissionCreateModel) {
    return {
      margin: [0, 0, 0, 35],
      table: {
        widths: ["*", "*", "*", "*"],
        margin: [0, 0, 0, 30],
        body: [
          [
            {
              text: "Qte",
              style: "tableHeader",
            },
            {
              text: "Designation",
              style: "tableHeader",
            },
            {
              text: "Prix unitaire HT",
              style: "tableHeader",
            },
            {
              text: "Total",
              style: "tableHeader",
            },
          ],

          [
            educations.period,
            this.designation,

            this.tjmMethode(this.tjm),
            educations.period * this.tjmMethode(this.tjm),
          ],

          [
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
          ],
          [
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
            {
              text: "",
              style: "tableHeader8",
            },
          ],
        ],
      },
    };
  }
  getDetailsTvaBonCommande(educations: MissionCreateModel) {
    return {
      margin: [320, 0, 0, 0],
      table: {
        weights: ["*", "*"],

        body: [
          [
            {
              text: "Total HT",
              style: "tableHeader3",
            },
            {
              text: [this.tjmMethode(this.tjm) * educations.period] + "" + "€",
              style: "tableHeader3",
            },
          ],
          [
            {
              text: "T.V.A" + "" + +this.tva + "" + "%",
              style: "tableHeader3",
            },
            {
              text:
                [
                  (parseInt(this.tva) *
                    (this.tjmMethode(this.tjm) * educations.period)) /
                    100,
                ] +
                "" +
                "€",
              style: "tableHeader3",
            },
          ],

          [
            {
              text: "Total TTC",
              style: "tableHeader3",
            },
            {
              text:
                [
                  this.tjmMethode(this.tjm) * educations.period +
                    (parseInt(this.tva) *
                      (this.tjmMethode(this.tjm) * educations.period)) /
                      100,
                ] +
                "" +
                "€",
              style: "tableHeader6",
            },
          ],
        ],
      },
    };
  }
}
