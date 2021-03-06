import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { UserModel } from "../models/entity.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  baseUrl = `${environment.backend}/users`;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.baseUrl + "/all");
  }
  getUsersByRole(role: string) {
    return this.http.get(this.baseUrl + "/get/" + role.toUpperCase());
  }
  getUsersByType(typep: string) {
    return this.http.get(this.baseUrl + "/gettype/" + typep.toUpperCase());
  }

  ///////optionnel

  getUsersByRoleE(role: string) {
    return this.http.get(this.baseUrl + "/getE/" + role.toUpperCase());
  }


  getUsersByRoleP(role: string) {
    return this.http.get(this.baseUrl + "/getP/" + role.toUpperCase());
  }


  getUsersByRoleProvider(role: string) {
    return this.http.get(this.baseUrl + "/get/" + role.toUpperCase());
  }
  getUsersBySkills(skills: string, missionId) {
    return this.http.get(`${this.baseUrl}/skills/${missionId}?skill=${skills}`);
  }


  getAllSkillsByUser(skills: string, userID) {
    return this.http.get(`${this.baseUrl}/skillsuser/${userID}?skill=${skills}`);
  }


  getUsers(page = 1, limit = 10) {
    const params: HttpParams = new HttpParams()
      .set("page", `${page}`)
      .set("limit", `${limit}`);
    return this.http.get(this.baseUrl, { params });
  }
  getUser(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  myProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }
  updateUser(model: UserModel) {
    return this.http.patch(`${this.baseUrl}/update`, model);
  }
  updateProfileUser(model: UserModel) {
    return this.http.patch(`${this.baseUrl}/update/${model.id}`, model);
  }
  uploadImageUser(userID, file: any) {
    const form = new FormData();
    form.set("file", file);
    return this.http.post(`${this.baseUrl}/uploadImage/${userID}`, form);
  }
  uploadCvUser(userID, file: any) {
    const form = new FormData();
    form.set("file", file);
    return this.http.post(`${this.baseUrl}/upload/${userID}`, form);
  }
  uploadCertifUser(userID, file: any) {
    const form = new FormData();
    form.set("file", file);
    return this.http.post(`${this.baseUrl}/uploadcertif/${userID}`, form);
  }
  enableUser(id: number, enable: boolean) {
    const url = enable
      ? `${this.baseUrl}/enable/${id}`
      : `${this.baseUrl}/disable/${id}`;
    return this.http.patch(url, {});
  }
  deleteUser(idUser) {
    const params: HttpParams = new HttpParams().set("id", `${idUser}`);
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}
