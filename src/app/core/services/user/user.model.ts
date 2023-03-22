export interface IUser {
  name: string;
  email: string;
  _id: string;
}

export interface ILoginUser extends IUser {
  login: boolean;
}
