import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SkillsCreateModel } from "../models/auth.model";
import {
  QuizModel,
  QuizQuestionModel,
  QuizSessionModel,
} from "../../pages/quizz/quizz.model";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  baseUrl = `${environment.backend}/quiz`;
  constructor(private http: HttpClient) {}

  getAllQuiz() {
    return this.http.get(this.baseUrl + "/all");
  }
  getQuizBySkills(skills: string, level: String) {
    return this.http.get(
      `${this.baseUrl}/skills/?skill=${skills}&level=${level}`
    );
  }
  getAllSessions() {
    return this.http.get(this.baseUrl + "/session/get");
  }

  findSessionsByJob(jobID) {
    return this.http.get(this.baseUrl + "/session/job/" + jobID);
  }

  findSessionsByMission(missionId) {
    return this.http.get(this.baseUrl + "/session/mission/" + missionId);
  }
  addQuiz(quiz: QuizModel) {
    return this.http.put(this.baseUrl + `/save`, quiz);
  }

  ///start quiz service methode
  addSessionQuiz(quizID, session: QuizSessionModel, file) {
    const form = new FormData();
    for (const [key, value] of Object.entries(session)) {
      form.append(`${key}`, value);
    }
    if (file) {
      console.log({file});
      form.append("file", file);
    }
    return this.http.post(this.baseUrl + `/session/${quizID}`, form);
  }
  submitProposition(responseID, responses: Array<any>) {
    const propositions = responses;
    return this.http.post(this.baseUrl + `/submit/${responseID}`, {
      propositions,
    });
  }
  getQuestion(id) {
    return this.http.get(this.baseUrl + `/question/${id}`);
  }

  getSession(id) {
    return this.http.get(this.baseUrl + `/session/${id}`);
  }

  getQuiz(quizID) {
    return this.http.get(this.baseUrl + `/${quizID}`);
  }

  deleteQuestion(questionID) {
    return this.http.delete(this.baseUrl + `/question/${questionID}`);
  }

  deleteProposition(propositionID) {
    return this.http.delete(this.baseUrl + `/proposition/${propositionID}`);
  }

  addQuestionToQuiz(quizID, question: QuizQuestionModel) {
    const payload = [question];
    return this.http.post(this.baseUrl + `/question/${quizID}`, payload);
  }
}
