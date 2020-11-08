import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SkillsCreateModel } from '../models/auth.model';


Injectable({
providedIn: "root",
})
  export class SkillsService {
    baseUrl = `${environment.backend}/skills`;
    constructor(private http: HttpClient) {}
  
    createSkills(skills: SkillsCreateModel) {
      return this.http.put(this.baseUrl + "/save", skills);
    }

    getAllSkills() {
        return this.http.get(this.baseUrl + "/all");
      }

      deleteSkills(id) {
        const params: HttpParams = new HttpParams().set("id", `${id}`);
        return this.http.delete(`${this.baseUrl}`, { params });
      }












}