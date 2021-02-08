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
  constructor(private http: HttpClient) { }




  //////////ancienne methode de create mission
  /*createMission(mission: MissionCreateModel,planfile) {
    return this.http.put(this.baseUrl + "/save", mission);
  }*/


  createMission(mission: MissionCreateModel, file) {
    const form = new FormData();
    for (const [key, value] of Object.entries(mission)) {
      form.append(`${key}`, value);
    }
    if (file) {
      form.append("planfile", file);
    }
    return this.http.put(this.baseUrl + "/save", form);
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



  getAllUserOwnerMissions() {
    return this.http.get(this.baseUrl + `/userc`);
  }



  getMissionsByType(type: string) {
    return this.http.get(this.baseUrl + "/get/" + type.toUpperCase());
  }

  getMissionsById(id: number) {
    return this.http.get(this.baseUrl + "/get/" + id);
  }

  getMyMissions() {
    return this.http.get(this.baseUrl + `/me`);
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


  enCoursMission(id: number) {
    return this.http.patch(`${this.baseUrl}/cours/${id}`, {});
  }

  updateMission(model: missionModel) {
    return this.http.patch(`${this.baseUrl}/update`, model);
  }

  deleteMission(idMission) {
    const params: HttpParams = new HttpParams().set("id", `${idMission}`);
    return this.http.delete(`${this.baseUrl}`, { params });
  }

  getMissionByStatus(status: string) {
    return this.http.get(this.baseUrl + "/status/" + status.toUpperCase());
  }
  assignQuizToMission(id: number, idQuiz: number) {
    return this.http.patch(`${this.baseUrl}/quiz/${id}/${idQuiz}`, {});
  }

  removeQuizFromMission(id: number) {
    return this.http.delete(`${this.baseUrl}/quiz/${id}`, {});
  }


  uploadPlanFileMission(userID, file: any) {
    const form = new FormData();
    form.set("planfile", file);
    return this.http.post(`${this.baseUrl}/uploadplan/${userID}`, form);
  }

  uploadDeviseMission(userID, file: any) {
    const form = new FormData();
    form.set("devise", file);
    return this.http.post(`${this.baseUrl}/uploaddevise/${userID}`, form);
  }

  uploadBonfileMission(userID, file: any) {
    const form = new FormData();
    form.set("file", file);
    return this.http.post(`${this.baseUrl}/uploadbon/${userID}`, form);
  }

  uploadVisaMission(userID, file: any) {
    const form = new FormData();
    form.set("visa", file);
    return this.http.post(`${this.baseUrl}/uploadvisa/${userID}`, form);
  }



  uploadTransportMission(userID, file: any) {
    const form = new FormData();
    form.set("transport", file);
    return this.http.post(`${this.baseUrl}/uploadtransport/${userID}`, form);
  }


  uploadLogementMission(userID, file: any) {
    const form = new FormData();
    form.set("logement", file);
    return this.http.post(`${this.baseUrl}/uploadlogement/${userID}`, form);
  }



}
