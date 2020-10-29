export interface JwtPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  image: string;
  id: number;
}

export interface RegisterModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}


export interface missionModel {


id:number;
 
  titre : string;


  profil : string;

  
  type  : string;

 
  skills : string;

 
  technologies : string;

  
  niveauEx : string;


  
  dateDebut : string;

  
  durée : string;

  
  emplacement : string;

  

  description : string;

  
  statusMission : string;


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
