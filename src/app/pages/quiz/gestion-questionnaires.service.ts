import { Injectable } from '@angular/core';
import { Questionnaire } from './questionnaire';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionQuestionnairesService {

  questionnaire : Questionnaire;
  baseUrl = 'http://localhost:8080/plateformerecrutement/Questionnaires';
  BaseUrl = 'http://localhost:8080/plateformerecrutement/Questionnaires/Questions';

  constructor(private http: HttpClient) { }

  getQuestionnaires(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createQuestionnaire(questionnaire: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + ``, questionnaire);
  }

  updateQuestionnaire(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteQuestionnaire(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  setter(questionnaire : Questionnaire){
    this.questionnaire = questionnaire;
  }
  getter(){
    return this.questionnaire;
  }
  getQuestionnaireByid(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  getQuestions(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`+'/Questions');
  }
  createQuestion(id:number,question: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`+'/Questions', question);
  }
 
 deleteQuestion(id1:number, id2:number){
  return this.http.delete(`${this.baseUrl}/${id1}`+'/Questions'+`/${id2}`, { responseType: 'text' });
 }
 updateQuestion(id1:number, id2:number, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}/${id1}`+'/Questions'+`/${id2}`, value);
}
GetPropositions(id1:number, id2:number) : Observable<any>{
  return this.http.get(`${this.baseUrl}/${id1}`+'/Questions'+`/${id2}`+'/Propositions');
}
GetOneQuestion(id1:number, id2:number) : Observable<any> {
  return this.http.get(`${this.BaseUrl}/${id1}`+'/Question'+`/${id2}`);
}
GetPropositionBytext(id1:number, id2:number,text:string) : Observable<any>{
  return this.http.get(`${this.BaseUrl}/${id1}`+'/Propositions'+`/${id2}`+'/proposition'+`/${text}`);
}
GetPropositionByid(id1:number, id2:number,idprop:number) : Observable<any>{
  return this.http.get(`${this.baseUrl}/${id1}`+'/Questions'+`/${id2}`+'/Propositions'+`/${idprop}`);
}
AddProposition(id1:number,id2:number,proposition: Object): Observable<Object> {
  return this.http.post(`${this.baseUrl}/${id1}`+'/Questions'+`/${id2}`+'/Propositions', proposition);
}

}
