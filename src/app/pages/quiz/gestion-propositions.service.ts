import { Injectable } from '@angular/core';
import { Proposition } from './proposition';

@Injectable({
  providedIn: 'root'
})
export class GestionPropositionsService {

  proposition: Proposition;

  constructor() { }

  setter(proposition : Proposition){
    this.proposition = proposition;
  }
  getter(){
    return this.proposition;
  }
}
