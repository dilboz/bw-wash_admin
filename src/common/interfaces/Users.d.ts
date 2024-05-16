export interface IUserItem {
	id: string;
	email: string; 
	phoneNumber: string;
	firstName: string;
	lastName: string;
	address: string | null;
	roleName: string;
}

export interface IUserItemInfo {
	address: string | null; 
	phone: string | null;
	lastName: string | null;
	email: string | null;
	name: string | null;
}

export interface IUsersState {
  pending: boolean;
  error: null | string;
  pageCount: number;
  data: IUserItem[];
	dataById: IUserItemInfo | null
}

export interface IUsersParams {
	page: number;
	query: string;
}

export interface IUsersRequestParams {
	query: string;
	pageSize: number;
	pageNumber: number;
}

export interface IUserPutRequestBody {
	roleId: number;
}