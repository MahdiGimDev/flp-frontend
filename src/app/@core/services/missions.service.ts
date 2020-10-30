import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { missionModel } from "../models/mission.model";
import { MissionCreateModel } from "../models/auth.model";

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

  getMissionsByType(type: string) {
    return this.http.get(this.baseUrl + "/get/" + type.toUpperCase());
  }
  getMissions(page = 1, limit = 10) {
    const params: HttpParams = new HttpParams()
      .set("page", `${page}`)
      .set("limit", `${limit}`);
    return this.http.get(this.baseUrl, { params });
  }
  getMissionByid(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateMission(model: missionModel) {
    return this.http.patch(`${this.baseUrl}/update`, model);
  }

  deleteMission(idMission) {
    const params: HttpParams = new HttpParams().set("id", `${idMission}`);
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}
