import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import { Questionnaire } from '../../questionnaire';

@Component({
  selector: 'app-update-questionnaire',
  templateUrl: './update-questionnaire.component.html',
  styleUrls: ['./update-questionnaire.component.scss']
})
export class UpdateQuestionnaireComponent implements OnInit {

  submitted = false;
  questionnaireForm : FormGroup;
  questionnaire : Questionnaire;
  public questionnaireId;
  
  constructor(private router: Router, private route:ActivatedRoute,private questionnaireService: GestionQuestionnairesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionnaireForm = this.formBuilder.group({
      titre_questionnaire: ['', Validators.required],
      niveau: ['', Validators.required],
      nb_questions: ['', Validators.required],
      dateUpdate: ['', Validators.required],

    });
    this.questionnaire = this.questionnaireService.getter();
  }
  get f() {
    return this.questionnaireForm.controls;
  }
  processForm(){
    this.submitted = true;
 
    if (this.questionnaireForm.invalid) {
      return;
    }
    
  
      const id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
      this.questionnaireId = id;
      this.questionnaireService.updateQuestionnaire(this.questionnaireId, this.questionnaire).subscribe((questionnaire)=>{
        console.log(questionnaire);
        this.router.navigate(['/GestionQuestionnaires']);
      }, (error)=>{
         console.log(error);              
        });
   
  }
}
