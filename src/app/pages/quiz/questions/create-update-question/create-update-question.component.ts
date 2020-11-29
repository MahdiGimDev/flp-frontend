import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../../question';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import { GestionQuestionService } from '../../gestion-question.service';

@Component({
  selector: 'app-create-update-question',
  templateUrl: './create-update-question.component.html',
  styleUrls: ['./create-update-question.component.scss']
})
export class CreateUpdateQuestionComponent implements OnInit {

  question : Question;
  public questionnaireId;
  submitted = false;
  questionsForm : FormGroup;
  public questionId = 1;

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
    if(this.question.id_question == undefined){
      this.questionnaireService.createQuestion(this.questionnaireId, this.question)
      .subscribe((question)=>{
        console.log(question);
        this.router.navigate(['Questions/:id_questionnaire/Create'+this.questionnaireId]);
      }, (error)=>{
              console.log(error);
      });
    }else {
      this.questionnaireService.updateQuestion(this.questionnaireId,this.question.id_question, this.question).subscribe((questionnaire)=>{
        console.log(this.question);
        this.router.navigate(['/GestionQuestionnaires/UpdateQuestionnaire/'+this.questionnaireId]);
      }, (error)=>{
         console.log(error);              
        });
    }
}
}
