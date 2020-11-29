import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';
import { Proposition } from '../../proposition';
import { PropositionService } from '../../proposition.service';



@Component({
  selector: 'app-create-proposition',
  templateUrl: './create-proposition.component.html',
  styleUrls: ['./create-proposition.component.scss']
})
export class CreatePropositionComponent implements OnInit {

  submitted = false;
  propositionForm : FormGroup;
  p : Proposition;
  public questionnaireId;
  public questionId;
  constructor(private route: ActivatedRoute,  private propositionservice: PropositionService,   private questionnaireService: GestionQuestionnairesService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.propositionForm = this.formBuilder.group({
      proposition: ['', Validators.required],
      reponse: ['', Validators.required],
      

    });
    this.p = this.propositionservice.getter();
  }
  get f() {
    return this.propositionForm.controls;
  }
  processForm(){
    this.submitted = true;
 
    if (this.propositionForm.invalid) {
      return;
    }
    
   if(this.p.id_proposition == undefined){
    let id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
    this.questionnaireId = id;
    let id1 = parseInt(this.route.snapshot.paramMap.get('id_question'));
    this.questionId = id;
      this.questionnaireService.AddProposition(this.questionnaireId, this.questionId,this.p)
      .subscribe((p)=>{
        console.log(p);
       
      
      }, (error)=>{
              console.log(error);
      });
    }
  }
}
