import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { UserModel, VacationModel } from "../models/entity.model";

@Injectable({
  providedIn: "root",
})
export class  VacationService {
  baseUrl = `${environment.backend}/vacations`;
  constructor(private http: HttpClient) {}
  createVacationRequest(model: VacationModel) {
    return this.http.put(this.baseUrl + "/save", model);
  }

  getAllVacations() {
    return this.http.get(this.baseUrl + `/all`);
  }

  getVacationsByStatus(status: string) {
    return this.http.get(this.baseUrl + `/status/${status.toUpperCase()}`);
  }

  getMyVacationsByStatus(status: string) {
    return this.http.get(this.baseUrl + `/me/${status.toUpperCase()}`);
  }
  getMyVacations() {
    return this.http.get(this.baseUrl +`/me`);
  }
  getVacation(vacationID: number) {
    return this.http.get(this.baseUrl + `/get/${vacationID}`);
  }

  getVacationsByUser(userID: number) {
    return this.http.get(this.baseUrl + `/user/${userID}`);
  }
  acceptVacation(vacationID: number) {
    return this.http.patch(this.baseUrl + `/accept/${vacationID}`, {});
  }
  refuseVacation(vacationID: number) {
    return this.http.patch(this.baseUrl + `/refuse/${vacationID}`, {});
  }
  deleteVacation(vacationID: number) {
    return this.http.delete(this.baseUrl + `/${vacationID}`);
  }
}
