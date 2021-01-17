import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { DocumentCreateModel } from "../models/auth.model";
import { DocumentModel } from '../models/entity.model';

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  baseUrl = `${environment.backend}/documents`;
  constructor(private http: HttpClient) {}

  createMission(document: DocumentCreateModel, file) {
    const form = new FormData();
    for (const [key, value] of Object.entries(document)) {
      form.append(`${key}`, value);
    }
    if (file) {
      form.append("file", file);
    }
    return this.http.put(this.baseUrl + "/save", form);
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
  /*getMissionsByVersion(type: string) {
    return this.http.get(this.baseUrl + "/get/" + version.toUpperCase());
  }*/
  uploadDocument(id, file: any) {
    const form = new FormData();
    form.set("file", file);
    return this.http.post(`${this.baseUrl}/uploaddoc/${id}`, form);
  }

  getDocument(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateProfileUser(model: DocumentModel) {
    return this.http.patch(`${this.baseUrl}/update/${model.id}`, model);
  }


  getAllClientDocuments(idClient) {
    return this.http.get(this.baseUrl + `/client/${idClient}`);
  }

  getAllProviderDocuments(idprovider) {
    return this.http.get(this.baseUrl + `/provider/${idprovider}`);
  }


  getAllEmployeeDocuments(idemployee) {
    return this.http.get(this.baseUrl + `/employee/${idemployee}`);
  }

  getDocumentsByType(type: string) {
    return this.http.get(this.baseUrl + "/get/" + type.toUpperCase());
  }


  deleteDocument(idDoc) {
    const params: HttpParams = new HttpParams().set("id", `${idDoc}`);
    return this.http.delete(`${this.baseUrl}`, { params });
  }



}
