import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionQuestionService } from '../../gestion-question.service';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import {Question} from '../../question'


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {
  question : Question;
  public questionnaireId;
  submitted = false;
  questionsForm : FormGroup;
  public questionId;

  constructor(private questionnaireService: GestionQuestionnairesService, private questionService: GestionQuestionService, private router: Router,private route:ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionsForm = this.formBuilder.group({
      type_question: ['', Validators.required],
      nb_propositions: ['', Validators.required],
      text_question: ['', Validators.required]
    });
    this.question = this.questionService.getter();
  }
  get f() {
    return this.questionsForm.controls;
  }
  
  processForm(){
    this.submitted = true;
 
    if (this.questionsForm.invalid) {
      return;
    }
  
    let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
    this.questionnaireId = id;
    let id1 = parseInt(this.route.snapshot.paramMap.get('id_question'));
    this.questionId = id1;
    if(this.question.id_question == undefined){
      this.questionnaireService.createQuestion(this.questionnaireId, this.question)
      .subscribe((question)=>{
        console.log(question);
        this.router.navigate(['/GestionQuestionnaires/UpdateQuestionnaire/'+this.questionnaireId]);
      }, (error)=>{
              console.log(error);
      });
    }else {
      this.questionnaireService.updateQuestion(this.questionnaireId,this.questionId, this.question).subscribe((questionnaire)=>{
        console.log(this.question);
        this.router.navigate(['/GestionQuestionnaires/UpdateQuestionnaire/'+this.questionnaireId]);
      }, (error)=>{
         console.log(error);              
        });
    }
}
}
