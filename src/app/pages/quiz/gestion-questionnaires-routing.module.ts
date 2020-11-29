import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListOfAllQuestionnairesComponent } from './questionnaires/list-of-all-questionnaires/list-of-all-questionnaires.component';
import { CreateQuestionnaireComponent } from './questionnaires/create-questionnaire/create-questionnaire.component';
import { UpdateQuestionnaireComponent } from './questionnaires/update-questionnaire/update-questionnaire.component';
import { ListOfPropositionsComponent } from './propositions/list-of-propositions/list-of-propositions.component';
import { CreateUpdateQuestionComponent } from './questions/create-update-question/create-update-question.component';
import { UpdateQuestionComponent } from './questions/update-question/update-question.component';
import { CreatePropositionComponent } from './propositions/create-proposition/create-proposition.component';
import { SimulateurQuestionnaireComponent } from './questionnaires/simulateur-questionnaire/simulateur-questionnaire.component';
import { ListOfQuestionsComponent } from './questions/list-of-questions/list-of-questions.component';

const routes: Routes = [
  { path: 'all', component: ListOfAllQuestionnairesComponent },
    {path: 'new', component: CreateQuestionnaireComponent},
    {path: 'UpdateQuestionnaire/:id_questionnaire', component: UpdateQuestionnaireComponent},
  //  {path: 'UpdateQuestionnaire/:id_questionnaire', component: UpdateQuestionnaireComponent},
    { path: 'Questions/:id_questionnaire', component: ListOfQuestionsComponent},
    { path: 'Questions/:id_questionnaire/Propositions/:id_question', component: ListOfPropositionsComponent},
    { path: 'Questions/:id_questionnaire/Create' , component: CreateUpdateQuestionComponent},
    { path: 'Questions/:id_questionnaire/UpdateQuestion/:id_question' , component: UpdateQuestionComponent},
    { path: 'Questions/:id_questionnaire/Question/:id_question/Propositions' , component: CreatePropositionComponent},
    { path: 'simulateurQuestionnaire/:id_questionnaire', component: SimulateurQuestionnaireComponent},
    //{ path: 'simulateurQuestionnaire/:id_questionnaire', component: SimulateurQuestionComponent}
 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionQuestionnairesRoutingModule { }
