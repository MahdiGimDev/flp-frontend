export interface JwtPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  salaire:number;
  dateBirth:string;
  role: string;
  image: string;
  id: number;
}

export interface RegisterModel {
  username: string;
  firstName: string;
  lastName: string;
  salaire:number;
  dateBirth:string;
  email: string;
  role: string;
  formation:string;
  yearsExperience:number;
  adress:string;
  phoneNumber:string;
  password: string;
  confirmPassword: string;
}

export interface MissionCreateModel {
  id?: number;
  title: string;
  type: string;
  technologies: string;
  level: string;
  startDate: string;
  period: number;
  address: string;
  description: string;
  status: string;
  
}


export interface SkillsCreateModel {

id?:number;
label:string;
description:string;

}



export interface skillsModel {
  id:number;
  label:string;
  description:string;
}


export interface missionModel {
  id: number;
  titre: string;
  profil: string;
  type: string;
 // skills: string;
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
