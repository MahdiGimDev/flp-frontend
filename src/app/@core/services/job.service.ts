import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { JobCreateModel, JobModel } from "../models/auth.model";

@Injectable({
  providedIn: "root",
})
export class JobService {
  baseUrl = `${environment.backend}/jobs`;
  constructor(private http: HttpClient) {}

  createJob(job: JobCreateModel) {
    return this.http.put(this.baseUrl + "/save", job);
  }

  getAllJobs() {
    return this.http.get(this.baseUrl + "/all");
  }

  getJobssByType(type: string) {
    return this.http.get(this.baseUrl + "/get/" + type.toUpperCase());
  }

  getJobsById(id: number) {
    return this.http.get(this.baseUrl + "/get/" + id);
  }

  getJobs(page = 1, limit = 10) {
    const params: HttpParams = new HttpParams()
      .set("page", `${page}`)
      .set("limit", `${limit}`);
    return this.http.get(this.baseUrl, { params });
  }

  getJobById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  assignUserToJob(id: number, idUser: number) {
    return this.http.patch(`${this.baseUrl}/assign/${id}/${idUser}`, {});
  }

  assignQuizToJob(id: number, idQuiz: number) {
    return this.http.patch(`${this.baseUrl}/quiz/${id}/${idQuiz}`, {});
  }
  
  removeQuizFromJob(id: number) {
    return this.http.patch(`${this.baseUrl}/quiz/${id}`, {});
  }

  deleteJob(idJob) {
    const params: HttpParams = new HttpParams().set("id", `${idJob}`);
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}
