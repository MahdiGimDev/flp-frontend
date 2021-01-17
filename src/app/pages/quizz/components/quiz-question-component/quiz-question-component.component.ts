import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { QuizService } from "../../../../@core/services/quizz.service";
import { QuizModel, QuizQuestionModel } from "../../quizz.model";

@Component({
  selector: "ngx-quiz-question-component",
  templateUrl: "./quiz-question-component.component.html",
  styleUrls: ["./quiz-question-component.component.scss"],
})
export class QuizQuestionComponentComponent implements OnInit {
  @Input()
  quiz: QuizModel;
  indexQuestion = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {}

  onPrevious() {
    this.indexQuestion -= 1;
  }

  onNext() {
    this.indexQuestion += 1;
  }

  async removeQuestion(questionID) {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const data = await this.quizService
          .deleteQuestion(questionID)
          .toPromise();
        this.indexQuestion = 0;
        this.quiz.questions = this.quiz.questions.filter(
          (question) => question.id !== questionID
        );
      }
    } catch (error) {
      console.log({ error });
    }
  }
}
