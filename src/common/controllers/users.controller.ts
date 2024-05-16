import * as actions from "@store/slice";
import { IUserItem, IUserItemInfo, IUsersParams } from "@interfaces";
import { AppDispatch } from "@store";
import { usersServices } from "@services";

export const getUsersController =
  (params: IUsersParams): any => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.usersStartPending());

      const response = await usersServices.get({
        pageSize: 7, 
        pageNumber: params.page,
        query: params.query,
      });

      const users: {data: IUserItem[], totalPages: number} = response.data;

      dispatch(actions.usersSetData(users));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.usersSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.usersStopPending());
      }, 500);
    }
  };

export const getUsersByIdController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.usersStartPending());

      const response = await usersServices.getById(id);

      const users: IUserItemInfo = response.data;

      dispatch(actions.usersSetDataById(users));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.usersSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.usersStopPending());
      }, 500);
    }
  };

export const editUsersController =
  (params: IUsersParams, roleId: number, id: string): any =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.usersStartPending());

      await usersServices.edit({ roleId }, id);

      const response = await usersServices.get({
        pageSize: 7, 
        pageNumber: params.page,
        query: params.query,
      });

      const users: {data: IUserItem[], totalPages: number} = response.data;

      dispatch(actions.usersSetData(users));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.usersSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.usersStopPending());
      }, 500);
    }
  };

export const usersControllers = Object.freeze(
  Object.seal({
    get: getUsersController,
    getById: getUsersByIdController,
    edit: editUsersController,
  })
);
