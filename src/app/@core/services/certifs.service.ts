import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CertifsCreateModel } from '../models/auth.model';



@Injectable({
    providedIn: "root",
  })
  export class CertifsService {
    baseUrl = `${environment.backend}/certifs`;
    constructor(private http: HttpClient) {}
  
    createCertifs(certifs: CertifsCreateModel) {
      return this.http.put(this.baseUrl + "/save", certifs);
    }
  
    getAllCertifs() {
      return this.http.get(this.baseUrl + "/all");
    }
  
    deleteCertifs(id) {
      const params: HttpParams = new HttpParams().set("id", `${id}`);
      return this.http.delete(`${this.baseUrl}`, { params });
    }
  }
  