import { Component, OnInit, Input } from '@angular/core';
import { Questionnaire } from '../../questionnaire';
import { Proposition } from '../../proposition';
import { Question } from '../../question';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { GestionQuestionnairesService } from '../../gestion-questionnaires.service';

@Component({
  selector: 'app-question-simulateur',
  templateUrl: './question-simulateur.component.html',
  styleUrls: ['./question-simulateur.component.scss']
})
export class QuestionSimulateurComponent implements OnInit {


  public  questionnaireId;
  form: FormGroup;
  selectedProp : number;
  selectedcheck : number;
  currIdx : number =0;
  radioindex : number = 0;
  score : number =0;
  public questionId;
  public result : boolean;
  questionnaire :  Questionnaire;
  proposition : Proposition;
  @Input() public question : Question;
  public  propositions:Proposition[];
questions : Question[];
  constructor(private questionnaireService : GestionQuestionnairesService,private route:ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id_questionnaire'));
    this.questionnaireId = id;
 
    this.questionnaireService.GetPropositions(this.questionnaireId,this.question.id_question)
    .subscribe((propositions)=>{
      console.log(propositions);
     this.propositions=propositions;
     const controls = this.propositions.map(c => new FormControl(false));
     //controls[0].setValue(true); // Set the first checkbox to true (checked)
     this.form = this.formBuilder.group({
       propositions: new FormArray(controls)
     });
    }, (error)=>{
      console.log(error);
   });
  }
  
  OnSelected(event : any){
    this.selectedProp = event.target.value;
     
}

/*verif() {
  if(this.question.type_question == "one choice") {
  console.log("la valeur sélectionné est " +this.selectedProp);
  console.log("le questionnaire est "+this.questionnaireId);
  console.log("la question est "+ this.question.id_question);
  this.questionnaireService.GetPropositionByid(this.questionnaireId,this.question.id_question,this.selectedProp)
  .subscribe((proposition)=>{
    console.log(proposition);
    if(proposition.reponse == true){
      
      this.score = this.score + 1;
      alert("reponse est vrai"+ this.score);
    }else {
      this.score = this.score -1;
      alert("c faux votre score sera " +this.score);
    }
    
  });
}
  const selectedPropIds = this.form.value.propositions
  .map((v, i) => v ? this.propositions[i].id_proposition: null)
  .filter(v => v !== null);
  console.log("le nombre de proposition est " +this.question.propositions.length);
  // console.log(this.propositions[this.currIdx].id_proposition + "est égal à " + selectedPropIds);
  // console.log("vous etes a la position "+ this.currIdx);
  if(this.question.type_question == "multiple choice"){
  
            do{    
                   console.log("vous avez sélectionnez la reponse" + selectedPropIds);
                        if(this.question.propositions[this.currIdx].reponse == true){
                             console.log("la reponse est " + true);
                            this.score = this.score + 1;
                            this.result = true;
                            console.log("votre score est" + this.score)
                           
                        }else {
                           this.score = this.score -1;
                           this.result = false;
                          console.log("votre score est" + this.score);
                         console.log("la reponse est" + false);
                        }
                        this.currIdx ++;
            }while(this.result = false);
}*/

verif(){
console.log("DEBUT VERIFICATION ..............");

const selectedPropIds = this.form.value.propositions
.map((v, i) => v ? this.propositions[i].id_proposition: null)
.filter(v => v !== null);
console.log("le nombre de proposition est " +this.question.propositions.length);
// console.log(this.propositions[this.currIdx].id_proposition + "est égal à " + selectedPropIds);
// console.log("vous etes a la position "+ this.currIdx);
if(this.question.type_question == "multiple choice"){

          do{    
               console.log("vous avez sélectionnez la reponse" + selectedPropIds);
                      if(this.question.propositions[this.currIdx].reponse == true){
                           console.log("la reponse est " + true);
                          this.score = this.score + 1;
                          this.result = true;
                          console.log("votre score est" + this.score)
                         
                      }else {
                         this.score = this.score -1;
                         this.result = false;
                        console.log("votre score est" + this.score);
                       console.log("la reponse est" + false);
                      }
                      this.currIdx ++;
          }while(this.result = false);
}else {
          console.log(this.selectedProp);
          this.questionnaireService.GetPropositionByid(this.questionnaireId,this.question.id_question,this.selectedProp)
          .subscribe((proposition)=>{
            console.log(proposition);
            if(proposition.reponse == true){
              
              this.score = this.score + 1;
              alert("reponse est vrai votre score sera"+ this.score);
            }else {
              this.score = this.score -1;
              alert("c'est faux votre score sera " +this.score);
            }
            
      });
      
}
          
console.log("le score final est "+ this.score)  ;

}

}
