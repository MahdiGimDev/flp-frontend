import { certifsModel, skillsModel } from "./auth.model";

export interface BaseEntityModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends BaseEntityModel {
  email: string;
  image: string;
  role?:
    | "ADMIN"
    | "Rh"
    | "Provider"
    | "Employee"
    | "Commercial"
    | "Operational"
    | "Client";
  username: string;
  typep:string;
  
  firstName: string;
  lastName: string;
  salaire: number;
  tjme: number;
  tjmd: number;
  vacations?: number;
  yearsExperience: number;
  phonenumber: string;
  dateBirth: string;
  situation:string;
  paysd:string;
  ville:string;
  pays:string;
  adress: string;
  activated?: boolean;
  verified?: boolean;
  subscription?: SubscriptionModel;
  cv?: string;
  file?: string;
  certifs?: Array<certifsModel>;
  skills?: Array<skillsModel>;
  createdAt?: Date;
  formation?: string;
  googleID?: string;
  nbrExperience?: number;
  password?: string;
  resetPasswordExpireAt?: Date;
  resetPasswordToken?: null;
  updatedAt?: Date;
  verifyExpireAt?: Date;
  verifyToken?: string;
}


export interface DocumentModel extends BaseEntityModel {
  title : string;
  sujet : string ; 
  file : string;
  description : string ; 
  startDate : string;
  type:string;

}




export interface SubscriptionModel extends BaseEntityModel {
  startAt: Date;
  expireAt: Date;
  type: string;
  user: UserModel;
  apiKey: ApiKeyModel;
}

export interface VacationModel extends BaseEntityModel {
  title: string;
  startDate: string;
  endDate: string;
  status?: string;
  type: string;
  file?: string;
  user?: UserModel;
  period: number;
}

export interface AdministrativeModel extends BaseEntityModel {
  bonfile: string;
  logement: string;
  visa: string;
  transport: string;
  devise: string;
  mission?: UserModel;
 
}


export interface ExperienceModel extends BaseEntityModel {
  title: string;
  startDate: string;
  endDate: string;
  status?: string;
  type: string;
  file?: string;
  user?: UserModel;
  period: number;
  ville: string;
  pays : string;
  etablissement : string;
  adress : string;
  grade : string;
  poste: string;
  speciality : string;
  description:string;
}



export interface ApiKeyModel extends BaseEntityModel {
  key: string;
  enabled: boolean;
}



export interface FormationModel extends BaseEntityModel {
  title: string;
  speciality:string;
  categorie:string;
  description:string;
  startDate: string;
  endDate: string;
  status?: string;
  type: string;
  post:string;
  type2:string;
  establishment:string;
  file?: string;
  user?: UserModel;
  period: number;
}