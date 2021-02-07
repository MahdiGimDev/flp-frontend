import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { QuizService } from "../../../@core/services/quizz.service";
import {
  QuizDataTableSettings,
  QuizModel,
  QuizResponseModel,
  QuizSessionDataTableSettings,
  QuizSessionModel,
} from "../quizz.model";

@Component({
  selector: "ngx-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.scss"],
})
export class SessionListComponent implements OnInit {
  settings = QuizSessionDataTableSettings;
  source: LocalDataSource = new LocalDataSource();
  quizSess:QuizSessionModel;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private quizService: QuizService
  ) {}

   ngOnInit():void {
    this.loadSessions();
//await this.mentionMethode;
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



  /*async mentionMethode(mention:string){

    if( this.quizSess.result <50)
    {
       mention=="non resussi";
      this.quizSess.mention=mention;
    }
    else if(this.quizSess.result >50)
    {
       mention=="resussi";
      this.quizSess.mention=mention;
    }
    return mention;


    
  }
*/

  onClickRow(event) {
    const quiz: QuizModel = event?.data;
    this.router.navigateByUrl("/pages/quiz/edit/" + quiz.id);
  }
}
