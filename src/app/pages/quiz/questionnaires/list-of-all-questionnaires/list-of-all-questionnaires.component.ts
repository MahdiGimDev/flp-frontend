import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import { Questionnaire } from '../../questionnaire';

@Component({
  selector: 'app-list-of-all-questionnaires',
  templateUrl: './list-of-all-questionnaires.component.html',
  styleUrls: ['./list-of-all-questionnaires.component.scss']
})
export class ListOfAllQuestionnairesComponent implements OnInit {

  public questionnaires : Questionnaire[];
  questionnaire : Questionnaire;
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private questionnaireService : GestionQuestionnairesService, private router: Router) { }

  ngOnInit() {
    
    this.questionnaireService.getQuestionnaires()
    .subscribe((questionnaires)=>{
      console.log(questionnaires);
      this.questionnaires=questionnaires;
      this.dtTrigger.next();
    }, (error)=>{
      console.log(error);
    });
   
  }

  deleteQuestionnaire(questionnaire){
    this.questionnaireService.deleteQuestionnaire(questionnaire.id_questionnaire)
    .subscribe((data)=>{
      this.questionnaires.splice(this.questionnaires.indexOf(questionnaire),1);
    }, (error)=>{
         console.log(error);
    });
     }

   newQuestionnaire(){
      let questionnaire = new Questionnaire();
      this.questionnaireService.setter(questionnaire);
      this.router.navigate(['new']);
  }
  GetQuestionnaireByid(questionnaire){
    this.router.navigate(['GestionQuestionnaires/simulateurQuestionnaire', questionnaire.id_questionnaire]);
  }
  saveOrUpdateQuestionnaire(questionnaire){  
    this.questionnaireService.setter(questionnaire);
    this.router.navigate(['GestionQuestionnaires/UpdateQuestionnaire', questionnaire.id_questionnaire])
   }

}
