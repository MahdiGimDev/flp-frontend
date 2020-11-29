import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';

@Component({
  selector: 'app-simulateur-questionnaire',
  templateUrl: './simulateur-questionnaire.component.html',
  styleUrls: ['./simulateur-questionnaire.component.scss']
})
export class SimulateurQuestionnaireComponent implements OnInit {

  public  questionnaireId;
  public currIdx : number =0;
  @Input() public questionnaire;

  constructor(private questionnaireService : GestionQuestionnairesService,private route:ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
    this.questionnaireId = id;
    this.questionnaireService.getQuestionnaireByid(this.questionnaireId)
    .subscribe((questionnaire)=>{
      console.log(questionnaire);
     this.questionnaire=questionnaire;
    
    }, (error)=>{
      console.log(error);
   });
  }
  Increment(){
    if (this.currIdx + 1< this.questionnaire.questions.length){
      console.log("nb questions =  " +this.questionnaire.questions.length);
      console.log("position  =  " +this.currIdx );
      this.currIdx ++ ;
    }else{
      console.log("wfaaaaaaaaaaaaaaa");
    }
  }
  desIncrement(){
    if (this.currIdx > 0)
    this.currIdx --  ;
  }
}
