import { IUser } from '../user/user.model';
export interface ITokens {
  access: string;
  refresh: string;
}

export interface IAuthData {
  name?: string;
  email: string;
  password: string;
}

export interface IUserWithCredentials extends ITokens {
  user: IUser;
}
