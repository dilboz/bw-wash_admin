import {
  requestGET,
  requestPUT,
} from "@utils/axios";
import { Api } from "@constants";
import { IUserPutRequestBody, IUsersRequestParams } from "@interfaces";

const getUsersService = (params: IUsersRequestParams) => 
  requestGET(Api.usersAll, params);

const getUsersByIdService = (id: string) => 
  requestGET(Api.usersAll + '/' + id);

const editUserItemService = (body: IUserPutRequestBody, id: string) =>
  requestPUT(Api.usersAll, body, id);

export const usersServices = Object.freeze(
  Object.seal({
    get: getUsersService,
    getById: getUsersByIdService,
    edit: editUserItemService,
  })
);
