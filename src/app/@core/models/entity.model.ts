import { skillsModel } from "./auth.model";

export interface BaseEntityModel {
  id: number;
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
    | "Operational";
  username: string;
  firstName: string;
  lastName: string;
  salaire: number;
  dateBirth: string;
  activated?: boolean;
  verified?: boolean;
  subscription?: SubscriptionModel;
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
export interface SubscriptionModel extends BaseEntityModel {
  startAt: Date;
  expireAt: Date;
  type: string;
  user: UserModel;
  apiKey: ApiKeyModel;
}

export interface ApiKeyModel extends BaseEntityModel {
  key: string;
  enabled: boolean;
}
