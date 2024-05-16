import { requestGET, requestPOST } from "@utils/axios";
import { Api } from "@constants";
import { IAthorizeUser } from "@interfaces";

export const getUserDataService = () => requestGET(Api.getUserData);
export const authorizeUserServiceOld = (body: IAthorizeUser) =>
  requestPOST(Api.authorizeUserOld, body);
export const authorizeUserService = (body: IAthorizeUser) =>
  requestPOST(Api.authorizeUser, body);
export const checkAuthCodeService = (code: string) =>
  requestPOST(Api.authorizeUser, {code});
