import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { GestionQuestionService } from '../../gestion-question.service';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import { Question } from '../../question';
import { Questionnaire } from '../../questionnaire';


@Component({
  selector: 'app-list-of-questions',
  templateUrl: './list-of-questions.component.html',
  styleUrls: ['./list-of-questions.component.scss']
})
export class ListOfQuestionsComponent implements OnInit {

  questionnaire: Questionnaire;
  public questionId;
  public questions : Question[];
  public question : Question;
  public questionnaireId;

  constructor(private questionnaireService : GestionQuestionnairesService, private questionService: GestionQuestionService, private router : Router,private route:ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
    this.questionnaireId = id;
    this.questionnaireService.getQuestions(this.questionnaireId)
    .subscribe((questions)=>{
      console.log(questions);
     this.questions=questions;
    }, (error)=>{
      console.log(error);
    });

  }

  newQuestion(){
    // let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
     //this.questionnaireId = id;
    let question = new Question();
      this.questionService.setter(question);
     this.router.navigate(['GestionQuestionnaires/Questions/'+this.questionnaireId+'/Create']);
     }
     saveOrUpdateQuestion(question){  
       this.questionService.setter(question);
       console.log(question.id_question);
       
    this.router.navigate(['GestionQuestionnaires/Questions/'+this.questionnaireId+'/UpdateQuestion',question.id_question]);
      }
      deleteQuestion(question){
      // let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
       //this.questionnaireId = id;
       this.questionnaireService.deleteQuestion(this.questionnaireId,question.id_question)
       .subscribe((data)=>{
         this.questions.splice(this.questions.indexOf(question),1);
       }, (error)=>{
            console.log(error);
       });
   }
   AffichePropositions(question){
     //let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
       //this.questionnaireId = id;
     this.router.navigate(['GestionQuestionnaires/Questions/'+this.questionnaireId+'/Propositions',question.id_question]);
    } 
 

}
