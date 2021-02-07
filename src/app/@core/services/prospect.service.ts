import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { prospectCreateModel } from '../models/auth.model';




@Injectable({
    providedIn: "root",
  })
  export class ProspectService {
    baseUrl = `${environment.backend}/prospections`;
    constructor(private http: HttpClient) {}
  
    createPros(pros: prospectCreateModel) {
      return this.http.post(this.baseUrl + "/save", pros);
    }
  
    getAllProspect() {
      return this.http.get(this.baseUrl + "/all");
    }
    getAllClientMissions(idClient) {
      return this.http.get(this.baseUrl + `/client/${idClient}`);
    }
    getAllEmployeeMissions(idClient) {
      return this.http.get(this.baseUrl + `/employee/${idClient}`);
    }
    getProspectsByType(type: string) {
      return this.http.get(this.baseUrl + "/get/" + type.toUpperCase());
    }
  
    getMissionsById(id: number) {
      return this.http.get(this.baseUrl + "/get/" + id);
    }
  
    getMissions(page = 1, limit = 10) {
      const params: HttpParams = new HttpParams()
        .set("page", `${page}`)
        .set("limit", `${limit}`);
      return this.http.get(this.baseUrl, { params });
    }
    getMissionById(id: number) {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
    acceptInvitation(id: number, idUser: number) {
      return this.http.patch(`${this.baseUrl}/suggest/${id}/${idUser}`, {});
    }
    inviteUserToMission(id: number, idUser: number) {
      return this.http.patch(`${this.baseUrl}/suggest/${id}/${idUser}`, {});
    }
    removeInvitationToMission(id: number, idUser: number) {
      return this.http.delete(`${this.baseUrl}/suggest/${id}/${idUser}`, {});
    }
    acceptMission(id: number, idUser: number) {
      return this.http.patch(`${this.baseUrl}/accept/${id}/${idUser}`, {});
    }
    lockMission(id: number) {
      return this.http.patch(`${this.baseUrl}/lock/${id}`, {});
    }
    confirmMission(id: number) {
      return this.http.patch(`${this.baseUrl}/confirm/${id}`, {});
    }
    cancelMission(id: number) {
      return this.http.patch(`${this.baseUrl}/cancel/${id}`, {});
    }
    availableMission(id: number) {
      return this.http.patch(`${this.baseUrl}/available/${id}`, {});
    }
    updateMission(model: prospectCreateModel) {
      return this.http.patch(`${this.baseUrl}/update`, model);
    }
  
    deletePros(idMission) {
      const params: HttpParams = new HttpParams().set("id", `${idMission}`);
      return this.http.delete(`${this.baseUrl}`, { params });
    }
  }
  