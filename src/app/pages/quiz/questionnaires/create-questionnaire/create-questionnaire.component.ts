import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import { Questionnaire } from '../../questionnaire';


@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})
export class CreateQuestionnaireComponent implements OnInit {
  submitted = false;
  questionnaireForm : FormGroup;
  questionnaire : Questionnaire;

  constructor(private questionnaireService: GestionQuestionnairesService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionnaireForm = this.formBuilder.group({
      titre_questionnaire: ['', Validators.required],
      niveau: ['', Validators.required],
      nb_questions: ['', Validators.required],
      dateCreation: ['', Validators.required],
      dateUpdate: ['', Validators.required],
    });
  }
  get f() {
    return this.questionnaireForm.controls;
  }

  processForm(){
    this.submitted = true;
 
    if (this.questionnaireForm.invalid) {
      return;
    }
    
   if(this.questionnaire.id_questionnaire == undefined){
      this.questionnaireService.createQuestionnaire(this.questionnaire)
      .subscribe((questionnaire)=>{
        console.log(questionnaire);
        alert("Questionnaire"+this.questionnaire.titre_questionnaire+"a été bien créer");
        this.router.navigate(['/GestionQuestionnaires']);
      }, (error)=>{
              console.log(error);
      });
    }
  }
}
