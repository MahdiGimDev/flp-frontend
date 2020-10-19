export interface BaseEntityModel {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends BaseEntityModel {
  email: string;
  image: string;
  role?: 'ADMIN' | 'CLIENT';
  username: string;
  firstName: string;
  lastName: string;
  activated?: boolean;
  verified?: boolean;
  subscription?: SubscriptionModel;
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
