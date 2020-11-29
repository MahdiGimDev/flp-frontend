import { Injectable } from '@angular/core';
import { Proposition } from './proposition';

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  prop: Proposition;
  constructor() { }

  setter(prop : Proposition){
    this.prop = prop;
  }
  getter(){
    return this.prop;
  }
}
