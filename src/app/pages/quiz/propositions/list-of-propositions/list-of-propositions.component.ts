import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Questionnaire } from '../../questionnaire';
import { Proposition } from '../../proposition';
import { GestionPropositionsService } from '../../gestion-propositions.service';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';


@Component({
  selector: 'app-list-of-propositions',
  templateUrl: './list-of-propositions.component.html',
  styleUrls: ['./list-of-propositions.component.scss']
})
export class ListOfPropositionsComponent implements OnInit {

  public questionId;
  public questionnaireId;
  questionnaire : Questionnaire;
 public propositions : Proposition[];
 public p: Proposition;
 display='none';

  submitted = false;
  propositionForm : FormGroup;
  proposition : Proposition;

  @Input() public ParentDatas;

  constructor(private propositionservice: GestionPropositionsService, private formBuilder: FormBuilder, private route:ActivatedRoute, private questionnaireService : GestionQuestionnairesService, private router: Router) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id_question'));
    this.questionId = id;
    let id1 = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
    this.questionnaireId = id1;
    this.questionnaireService.GetPropositions(this.questionnaireId,this.questionId)
    .subscribe((propositions)=>{
      console.log(propositions);
      this.propositions=propositions;
    }, (error)=>{
      console.log(error);
    });
    /* to create proposition */
    this.propositionForm = this.formBuilder.group({
      proposition: ['', Validators.required],
      reponse: ['', Validators.required],
    });
    this.proposition = this.propositionservice.getter();
  }
  
  get f() {
    return this.propositionForm.controls;
  }
  createUpdateProposition() {
    this.router.navigate(['GestionQuestionnaires/Questions/'+this.questionnaireId+'/Question/'+this.questionId+'/Propositions']);
  }
  processForm(){
    this.submitted = true;
 
    if (this.propositionForm.invalid) {
      return;
    }
    
   if(this.proposition.id_proposition == undefined){
      this.questionnaireService.AddProposition(this.questionnaireId,this.questionId,this.proposition)
      .subscribe((proposition)=>{
        console.log(proposition);
        this.router.navigate(['/GestionQuestionnaires']);
      }, (error)=>{
              console.log(error);
      });
    }
  }
}
