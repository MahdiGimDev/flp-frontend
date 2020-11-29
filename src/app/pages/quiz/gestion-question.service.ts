import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class GestionQuestionService {

  question: Question;

  constructor() { }

  setter(question : Question){
    this.question = question;
  }
  getter(){
    return this.question;
  }
}
