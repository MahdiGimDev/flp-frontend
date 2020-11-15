import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";
import { environment } from "../../../environments/environment";
import {
  JwtPayload,
  RegisterModel,
  ResetPasswordModel,
  VerificationModel,
} from "../models/auth.model";
@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  JWToken = "JW_token";
  loginUser(email: string, password: string): Observable<any> {
    const payload = {
      email,
      password,
    };
    return this.httpClient.post(`${environment.backend}/auth/login`, payload);
  }
  registerUser(model: RegisterModel): Observable<any> {
    return this.httpClient.post(`${environment.backend}/auth/register`, model);
  }

  verifyAccount(model: VerificationModel): Observable<any> {
    return this.httpClient.post(`${environment.backend}/auth/verify`, model);
  }

  resetPassword(model: ResetPasswordModel): Observable<any> {
    return this.httpClient.post(
      `${environment.backend}/auth/resetPassword`,
      model
    );
  }
  forgotPassword(email: string): Observable<any> {
    const params: HttpParams = new HttpParams().set("email", email);
    return this.httpClient.get(`${environment.backend}/auth/forgot`, {
      params,
    });
  }
  loggedIn() {
    return !!localStorage.getItem(this.JWToken);
  }

  getToken() {
    return localStorage.getItem(this.JWToken);
  }

  setToken(token: string) {
    return localStorage.setItem(this.JWToken, token);
  }

  getTokenData(): JwtPayload {
    try {
      const token: any = jwt_decode(this.getToken());
      return token;
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  removeToken() {
    return localStorage.clear();
  }

  validateToken(token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }
}
