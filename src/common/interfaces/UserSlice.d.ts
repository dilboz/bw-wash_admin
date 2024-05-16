export interface IUserInfoState {
  firstName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface IUserTokenState {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  roleName: number;
  token: string;
}

export interface IUserState extends IUserTokenState, IUserInfoState {
  pending: boolean;
}

export interface IAthorizeUser {
  email: string;
  password: string;
}
