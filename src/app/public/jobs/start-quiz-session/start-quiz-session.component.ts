import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { QuizService } from "../../../@core/services/quizz.service";
import {
  QuizModel,
  QuizQuestionModel,
  QuizSessionModel,
  QuizResponseModel,
} from "../../../pages/quizz/quizz.model";

@Component({
  selector: "ngx-start-quiz-session",
  templateUrl: "./start-quiz-session.component.html",
  styleUrls: ["./start-quiz-session.component.scss"],
})
export class StartQuizSessionComponent implements OnInit {
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
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.loadQuiz(params.id);
      }
    });
  }

  async loadQuiz(id) {
    try {
      const quiz: any = await this.quizService.getQuiz(id).toPromise();
      this.selectedQuiz = quiz;
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
    console.log({ timer });
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
      console.log({ filecv: this.selectedFile });
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
