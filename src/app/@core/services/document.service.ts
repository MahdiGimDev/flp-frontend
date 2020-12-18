import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { DocumentCreateModel } from "../models/auth.model";






@Injectable({
    providedIn: "root",
  })
  export class DocumentService {
    baseUrl = `${environment.backend}/documents`;
    constructor(private http: HttpClient) {}
  
    createMission(document: DocumentCreateModel) {
      return this.http.put(this.baseUrl + "/save", document);
    }
  
    getAllDocuments() {
      return this.http.get(this.baseUrl + "/all");
    }
   /* getAllClientMissions(idClient) {
      return this.http.get(this.baseUrl + `/client/${idClient}`);
    }*/
    getUser(id: number) {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    ///////////
    getAllEmployeeMissions(idClient) {
      return this.http.get(this.baseUrl + `/employee/${idClient}`);
    }

    //////
    getMissionsByType(type: string) {
      return this.http.get(this.baseUrl + "/get/" + type.toUpperCase());
    }
    uploadDocument(id, file: any) {
      const form = new FormData();
      form.set("file", file);
      return this.http.post(`${this.baseUrl}/uploaddocument/${id}`, form);
    }
  

 
    getDocument(id: number) {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  
   
  }


