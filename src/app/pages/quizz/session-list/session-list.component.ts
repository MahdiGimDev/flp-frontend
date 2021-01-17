import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { QuizService } from "../../../@core/services/quizz.service";
import {
  QuizDataTableSettings,
  QuizModel,
  QuizSessionDataTableSettings,
} from "../quizz.model";

@Component({
  selector: "ngx-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.scss"],
})
export class SessionListComponent implements OnInit {
  settings = QuizSessionDataTableSettings;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  async loadSessions() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      const quizList: any = await this.quizService.getAllSessions().toPromise();
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
}
