import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { UserUpdateDto } from "../models/response.model";
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