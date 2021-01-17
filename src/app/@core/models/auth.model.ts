import { QuizModel } from "../../pages/quizz/quizz.model";
import { UserModel } from "./entity.model";

export interface JwtPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  salaire: number;
  dateBirth: string;
  role: string;
  file: string;
  id: number;
}

export interface RegisterModel {
  username: string;
  firstName: string;
  lastName: string;
  salaire: number;
  tjmd: number;
  file?: string;
  gender: string;
  tjme: number;
  typep: string;
  startDate: string;
  vacations: number;
  maxvacation: number;
  maxmaladie: number;
  vacationmaladie: number;
  dateBirth: string;
  email: string;
  cv: string;
  certif: string;
  situation: string;
  role: string;
  formation: string;
  yearsExperience: number;
  paysd: string;
  ville: string;
  pays: string;
  adress: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
  certifsIds?: Array<number>;
  skillsIds?: Array<number>;
}

export interface JobCreateModel {
  id: number;
  title: string;
  profil: string;
  poste: string;
  formation: string;
  specialite: string;
  level: string;
  startDate: string;
  contrat: string;
  pays: string;
  ville: string;
  addresse: string;
  description: string;
  status: string;
  skillsIds?: Array<number>;
  skills?: Array<skillsModel>;
  quiz?: QuizModel;
}

export interface JobModel {
  id: number;
  titre: string;
  profil: string;
  poste: string;
  formation: string;
  specialite: string;
  niveauEx: string;
  startDate: string;
  adresse: string;
  description: string;
  status: string;
}

export interface DocumentCreateModel {
  id?: number;
  title: string;
  type: string;
  sujet: string;
  file: string;
  startDate: string;
  // clientId?: number;
  description: string;
  //  user?: UserModel;
  // client?: UserModel;
}

export interface MissionCreateModel {
  id?: number;
  title: string;
  type: string;
  technologies: string;
  level: string;
  startDate: string;
  endDate: string;
  period: number;
  clientId?: number;
  address: string;
  description: string;
  status?: string;
  skillsIds?: Array<number>;
  skills?: Array<skillsModel>;
  suggestion?: Array<UserModel>;
  user?: UserModel;
  client?: UserModel;
}

export interface prospectCreateModel {
  id?: number;
  nom: string;
  type: string;
  secteur: string;
  sujet: string;
  startDate: string;
  addresse: string;
  file: string;
  email: string;
  description: string;
  status?: string;
  phonenumber: string;
  ville: string;
  pays: string;
  yearsExperience: number;
}

export interface MissionCreateModel {
  id?: number;
  title: string;
  type: string;
  technologies: string;
  level: string;
  startDate: string;
  endDate: string;
  period: number;
  clientId?: number;
  address: string;
  description: string;
  status?: string;
  skillsIds?: Array<number>;
  skills?: Array<skillsModel>;
  suggestion?: Array<UserModel>;
  user?: UserModel;
  client?: UserModel;
}

export interface SkillsCreateModel {
  id?: number;
  label: string;
  description: string;
}

export interface CertifsCreateModel {
  id?: number;
  label: string;
  description: string;
}

export interface certifsModel {
  id: number;
  label: string;
  description: string;
}

export interface skillsModel {
  id: number;
  label: string;
  description: string;
}

export interface missionModel {
  id: number;
  titre: string;
  profil: string;
  type: string;
  technologies: string;
  niveauEx: string;
  dateDebut: string;
  durée: string;
  emplacement: string;
  description: string;
  statusMission: string;
}

export class ResetPasswordModel {
  email: string;
  token: string;
  password: string;
}
export class VerificationModel {
  email: string;
  token: string;
}
