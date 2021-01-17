import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { QuizService } from "../../../@core/services/quizz.service";
import { UsersService } from "../../../@core/services/users.service";
import { QuizDataTableSettings, QuizModel } from "../quizz.model";

@Component({
  selector: "ngx-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrls: ["./quiz-list.component.scss"],
})
export class QuizListComponent implements OnInit {
  settings = QuizDataTableSettings;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  async loadSkills() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      const quizList: any = await this.quizService.getAllQuiz().toPromise();
      this.source.load(quizList);
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  onClickRow(event) {
    const quiz: QuizModel = event?.data;
    this.router.navigateByUrl("/pages/quiz/edit/" + quiz.id);
  }

  async onDeleteConfirm(event) {
    const quiz: QuizModel = event.data;
    console.log({ quiz });
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        // await this.userService.deleteUser(user.id).toPromise();
        event.confirm.resolve();
      } catch (error) {
        console.log({ error });
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }
}
