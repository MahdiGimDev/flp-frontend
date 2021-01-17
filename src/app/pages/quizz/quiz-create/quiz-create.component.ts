import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbSpinnerService } from "@nebular/theme";
import { INgxSelectOption } from "ngx-select-ex";
import { NgxSpinnerService } from "ngx-spinner";
import { skillsModel } from "../../../@core/models/auth.model";
import { QuizService } from "../../../@core/services/quizz.service";
import { SkillsService } from "../../../@core/services/skills.service";
import { QuizModel, QuizQuestionModel } from "../quizz.model";

@Component({
  selector: "ngx-quiz-create",
  templateUrl: "./quiz-create.component.html",
  styleUrls: ["./quiz-create.component.scss"],
})
export class QuizCreateComponent implements OnInit {
  selectedQuiz: QuizModel = {
    id: 0,
    title: "",
    type: "",
    level: "JUNIOR",
    skillIds: [],
  };
  edit = false;
  selectedLevel = 0;
  newQuestion: QuizQuestionModel = {
    score: 0,
    duration: 0,
    text: "",
    propositions: [{ text: "", valid: false }],
  };
  skills: Array<skillsModel> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    this.loadSkills();
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.loadQuiz(params.id);
      }
    });
  }
  async addQuiz() {
    try {
      this.edit = true;
      if (this.selectedLevel === 0) {
        return false;
      }
      if (this.selectedLevel == 2) {
        this.selectedQuiz.level = "SENIOR";
      } else if (this.selectedLevel == 3) {
        this.selectedQuiz.level = "EXPERT";
      } else {
        this.selectedQuiz.level = "JUNIOR";
      }
      const data: any = await this.quizService
        .addQuiz(this.selectedQuiz)
        .toPromise();
      this.loadQuiz(data.id);
    } catch (error) {
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

  async loadQuiz(id) {
    try {
      this.edit = true;
      const quiz: any = await this.quizService.getQuiz(id).toPromise();
      this.selectedQuiz = quiz;
    } catch (error) {
      console.log({ error });
    }
  }

  addProposition() {
    this.newQuestion.propositions.push({
      text: "",
      valid: false,
    });
  }
  async addQuestion() {
    this.spinner.show();
    try {
      this.edit = true;
      const data = await this.quizService
        .addQuestionToQuiz(this.selectedQuiz.id, this.newQuestion)
        .toPromise();
      await this.loadQuiz(this.selectedQuiz.id);
      this.newQuestion = {
        score: 0,
        duration: 0,
        text: "",
        propositions: [{ text: "", valid: false }],
      };
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedQuiz.skillIds = [];
    options.map((option) => {
      this.selectedQuiz.skillIds.push(option.data?.id);
    });
  };
}
