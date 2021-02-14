import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { JobService } from "../../../@core/services/job.service";
import { MissionsService } from "../../../@core/services/missions.service";
import { QuizService } from "../../../@core/services/quizz.service";
import {
  QuizModel,
  QuizQuestionModel,
  QuizSessionModel,
  QuizResponseModel,
} from "../../../pages/quizz/quizz.model";

@Component({
  selector: "ngx-mission-quiz-session",
  templateUrl: "./start-quiz-session.component.html",
  styleUrls: ["./start-quiz-session.component.scss"],
})
export class StartQuizSessionMissionComponent implements OnInit {
  selectedFile: File;
  selectedQuiz: QuizModel = {
    id: 0,
    title: "",
    type: "",
    level: "",
  };
  indexQuestion = 0;
  currentQuestion: QuizQuestionModel = {
    id: 0,
    duration: 0,
    propositions: [],
    score: 0,
    text: "",
  };
  session: QuizSessionModel = {
    email: "",
    name: "",
    jobId: 0,
    missionId: 0,
    phone: "",
    niveau: "",
    experience: 0,
    cv: "",
    profil: "",
    adress: "",
  };
  start = false;
  finish = false;
  responses: Array<QuizResponseModel> = [];
  responses2: QuizResponseModel;
  constructor(
    private route: ActivatedRoute,
    private missionService: MissionsService,
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params.id) {
      this.loadMission(params.id);
    }
  }
  async loadMission(id) {
    let data: any = [];
    try {
      data = await this.missionService.getMissionById(id).toPromise();
      this.selectedQuiz = data.quiz;
      this.session.missionId = data.id;
    } catch (error) {
      console.log({ error });
    }
  }

  async loadSession(id) {
    try {
      const session: any = await this.quizService.getSession(id).toPromise();
      this.start = true;
      this.session = session;
      this.responses = this.session.responses;
      this.indexQuestion = 0;
      this.loadQuestion(this.responses[this.indexQuestion].questionId);
    } catch (error) {
      console.log({ error });
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  timer = 0;
  timerSub;
  async loadQuestion(id) {
    try {
      const question: any = await this.quizService.getQuestion(id).toPromise();
      this.currentQuestion = question;
      this.currentQuestion.propositions.map((prop) => {
        prop.valid = false;
      });
      this.updateCountDown(this.currentQuestion.duration);
    } catch (error) {
      console.log({ error });
    }
  }
  updateCountDown(timer) {
    if (timer <= 10) {
      timer = 30;
    }
    if (!this.timerSub) {
      clearInterval(this.timerSub);
    }
    this.timer = timer;
    // Update the count down every 1 second
    this.timerSub = setInterval(() => {
      console.log("updated");
      this.timer -= 1;
      if (this.timer <= 0) {
        this.onSubmit();
        console.log("submit !!");
        clearInterval(this.timerSub);
      }
    }, 1000);
  }
  async onSubmit() {
    try {
      const response = this.responses[this.indexQuestion];
      const responses = this.currentQuestion.propositions
        .filter((q) => q.valid)
        .reduce((a, b) => [...a, b.id], []);
      await this.quizService
        .submitProposition(response.id, responses)
        .toPromise();
      this.indexQuestion += 1;
      if (this.indexQuestion <= this.responses.length - 1) {
        const rsp = this.responses[this.indexQuestion];
        this.loadQuestion(rsp.questionId);
      } else {
        this.finish = true;
      }
    } catch (error) {
      console.log({ error });
    }
  }
  errorMessage = "";
  async startQuiz() {
    try {
      this.errorMessage = "";
      const session: any = await this.quizService
        .addSessionQuiz(this.selectedQuiz.id, this.session, this.selectedFile)
        .toPromise();
      if (window.confirm("Vous etes sur de vouloir démarrer le test quiz?"))
        this.loadSession(session.id);
    } catch (error) {
      if (error.error) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = "Error on creating";
      }
      console.log({ error });
    }
  }
}
