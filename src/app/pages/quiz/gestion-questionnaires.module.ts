import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionQuestionnairesRoutingModule } from './gestion-questionnaires-routing.module';
import { ListOfAllQuestionnairesComponent } from './questionnaires/list-of-all-questionnaires/list-of-all-questionnaires.component';
import { ListOfQuestionsComponent } from './questions/list-of-questions/list-of-questions.component';
import { CreateUpdateQuestionComponent } from './questions/create-update-question/create-update-question.component';
import { SimulateurQuestionnaireComponent } from './questionnaires/simulateur-questionnaire/simulateur-questionnaire.component';
import { QuestionSimulateurComponent } from './questions/question-simulateur/question-simulateur.component';
import { CreateQuestionnaireComponent } from './questionnaires/create-questionnaire/create-questionnaire.component';
import { UpdateQuestionComponent } from './questions/update-question/update-question.component';
import { CreatePropositionComponent } from './propositions/create-proposition/create-proposition.component';
import { UpdateQuestionnaireComponent } from './questionnaires/update-questionnaire/update-questionnaire.component';
import { ListOfPropositionsComponent } from './propositions/list-of-propositions/list-of-propositions.component';
import { Routes } from '@angular/router';




@NgModule({
  declarations:[ListOfAllQuestionnairesComponent,ListOfQuestionsComponent,CreateUpdateQuestionComponent,
    UpdateQuestionComponent,ListOfPropositionsComponent,CreatePropositionComponent,CreateQuestionnaireComponent,
    UpdateQuestionnaireComponent,QuestionSimulateurComponent,SimulateurQuestionnaireComponent],
  imports: [
    GestionQuestionnairesRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GestionQuestionnairesModule { }
