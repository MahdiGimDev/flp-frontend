import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { missionModel } from "../models/mission.model";
import { MissionCreateModel } from "../models/auth.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MissionsService {
  baseUrl = `${environment.backend}/missions`;
  constructor(private http: HttpClient) {}

  createMission(mission: MissionCreateModel) {
    return this.http.put(this.baseUrl + "/save", mission);
  }

  getAllMissions() {
    return this.http.get(this.baseUrl + "/all");
  }
  getAllClientMissions(idClient) {
    return this.http.get(this.baseUrl + `/client/${idClient}`);
  }
  getAllEmployeeMissions(idClient) {
    return this.http.get(this.baseUrl + `/employee/${idClient}`);
  }
  getMissionsByType(type: string) {
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
  updateMission(model: missionModel) {
    return this.http.patch(`${this.baseUrl}/update`, model);
  }

  deleteMission(idMission) {
    const params: HttpParams = new HttpParams().set("id", `${idMission}`);
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}
