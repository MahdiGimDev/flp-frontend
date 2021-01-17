import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {  AdministrativeModel } from "../models/entity.model";









@Injectable({
    providedIn: "root",
  })
  export class AdministrativeService {
    baseUrl = `${environment.backend}/administratives`;
    constructor(private http: HttpClient) {



    }

    createAdministrative(administrative: AdministrativeModel, file) {
      const form = new FormData();
      for (const [key, value] of Object.entries(administrative)) {
        form.append(`${key}`, value);
      }
      if (file) {
        form.append("file", file);
      }
      return this.http.put(this.baseUrl + "/save", form);
    }


    createAdministrativeRequest(model: AdministrativeModel) {
      return this.http.put(this.baseUrl + "/save", model);
    }
  
    getAllAdministratives() {
      return this.http.get(this.baseUrl + `/all`);
    }
  
    getAdministrativeByMission(missionID: number) {
        return this.http.get(this.baseUrl + `/missionA/${missionID}`);
      }

      deleteAdministrative(administrativeID: number) {
        return this.http.delete(this.baseUrl + `/${administrativeID}`);
      }




}