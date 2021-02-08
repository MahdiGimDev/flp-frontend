import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  JobCreateModel,
  JwtPayload,
  skillsModel,
} from "app/@core/models/auth.model";
import { UserModel } from "app/@core/models/entity.model";
import { JobService } from "app/@core/services/job.service";
import { SkillsService } from "app/@core/services/skills.service";
import { UsersService } from "app/@core/services/users.service";
import { LocalDataSource } from "ng2-smart-table";
import { INgxSelectOption } from "ngx-select-ex";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../@core/auth/auth.service";
import { QuizService } from "../../../@core/services/quizz.service";
import {
  QuizDataTableSettings,
  QuizModel,
  QuizSessionDataTableSettings,
} from "../../quizz/quizz.model";

@Component({
  selector: "ngx-jobs-detail",
  templateUrl: "./jobs-detail.component.html",
  styleUrls: ["./jobs-detail.component.scss"],
})
export class JobsDetailComponent implements OnInit {
  skills: Array<skillsModel> = [];
  currentUser: JwtPayload;
  errorLogin = "";
  quizSource: LocalDataSource = new LocalDataSource();
  responseSettings = QuizSessionDataTableSettings;
  responseSource: LocalDataSource = new LocalDataSource();
  link = environment.baseUrl;
  settings = {
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
  job: JobCreateModel = {
    id: 0,
    title: "",
    poste: "",
    profil: "",
    specialite: "",
    formation: "",
    ville: "",
    pays: "",
    addresse: "",
    description: "",
    contrat: "",
    startDate: "",
    level: "",
    status: "",
    skills: [],
    skillsIds: [],
  };
  currentLevel = 1;
  errorMessageJob = "";
  successMessageJob = "";
  selectedSkills = [];
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private jobService: JobService,
    private authService: AuthService,
    private skillsService: SkillsService,
    private router: Router
  ) {}
  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };
  ngOnInit(): void {
    this.currentUser = this.authService.getTokenData();

    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadJob(id);
    });
    this.loadSkills();
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
  onChangeLevel(value) {
    this.currentLevel = value;
  }
  async loadJob(id) {
    let data: any = [];
    try {
      data = await this.jobService.getJobById(id).toPromise();
      this.link = environment.baseUrl + "/jobs/" + id;
      this.job = data;
      this.loadQuiz();
      this.loadSessions();
    } catch (error) {
      console.log({ error });
    }
  }

  async loadQuiz() {
    let quiz: any = [];
    try {
      let skills = "";
      this.job.skills.map((skill, i) => {
        skills += skill.label;
        if (i < this.job.skills.length - 1) {
          skills += ",";
        }
      });
      quiz = await this.quizService
        .getQuizBySkills(skills, this.job.level)
        .toPromise();
      console.log({ quiz });
      this.quizSource.load(quiz);
    } catch (error) {
      console.log({ error });
    }
  }

  async onCustomAction(event) {
    const quiz: QuizModel = event.data;
    if (event.action === "assign") {
      this.onAssign(quiz);
    } else if (event.action === "view") {
      this.goToQuiz(quiz);
    }
  }

  async onAssign(quiz: QuizModel) {
    this.errorLogin = "";
    try {
      await this.jobService.assignQuizToJob(this.job.id, quiz.id).toPromise();
      this.loadJob(this.job.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }

  async onUnAssign() {
    this.errorLogin = "";
    try {
      await this.jobService.removeQuizFromJob(this.job.id).toPromise();
      this.loadJob(this.job.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  goToQuiz(quiz: QuizModel) {
    this.router.navigateByUrl("/pages/quiz/edit/" + quiz.id);
  }

  async loadSessions() {
    let data: any = [];
    this.responseSource.load(data);
    try {
      const quizList: any = await this.quizService
        .findSessionsByJob(this.job.id)
        .toPromise();
      this.responseSource.load(quizList);
    } catch (error) {
      console.log({ error });
    }
  }
}
