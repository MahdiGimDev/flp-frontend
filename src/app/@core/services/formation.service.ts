import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { FormationModel } from '../models/entity.model';




@Injectable({
    providedIn: "root",
  })
  export class FormationService {
    baseUrl = `${environment.backend}/formations`;
    constructor(private http: HttpClient) {}


    
    createFormationRequest(model: FormationModel) {
      return this.http.put(this.baseUrl + "/save", model);
    }
  
    getAllFormations() {
      return this.http.get(this.baseUrl + `/all`);
    }
  
    getVacationsByStatus(status: string) {
      return this.http.get(this.baseUrl + `/status/${status.toUpperCase()}`);
    }
  
    getMyVacationsByStatus(status: string) {
      return this.http.get(this.baseUrl + `/me/${status.toUpperCase()}`);
    }
    getMyVacations() {
      return this.http.get(this.baseUrl +`/me`);
    }
    getVacation(vacationID: number) {
      return this.http.get(this.baseUrl + `/get/${vacationID}`);
    }
  
    getFormationsByUser(userID: number) {
      return this.http.get(this.baseUrl + `/user/${userID}`);
    }
    acceptVacation(vacationID: number) {
      return this.http.patch(this.baseUrl + `/accept/${vacationID}`, {});
    }
    refuseVacation(vacationID: number) {
      return this.http.patch(this.baseUrl + `/refuse/${vacationID}`, {});
    }
    deleteVacation(vacationID: number) {
      return this.http.delete(this.baseUrl + `/${vacationID}`);
    }
  }
  