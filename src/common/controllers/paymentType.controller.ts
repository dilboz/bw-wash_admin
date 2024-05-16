import * as actions from "@store/slice";
import { IPaymentTypes } from "@interfaces";
import { AppDispatch } from "@store";
import { paymentTypeServices } from "@services";
import { history } from "@utils/history";
import { AppPaths } from "@constants";

export const getPaymentTypesController =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.paymentTypesStartPending());

      const response = await paymentTypeServices.get();

      const paymentTypes: IPaymentTypes[] = response.data;

      dispatch(actions.paymentTypesSetData(paymentTypes));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.paymentTypesSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.paymentTypesStopPending());
      }, 500);
    }
  };

export const getByIdPaymentTypesController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.paymentTypesStartPending());

      const response = await paymentTypeServices.getById(id);

      const paymentType: IPaymentTypes = response.data;

      dispatch(actions.paymentTypesSetDataById(paymentType));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.paymentTypesSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.paymentTypesStopPending());
      }, 500);
    }
  };

export const createPaymentTypesController =
  (paymentTypes: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.paymentTypesStartPending());

      const response = await paymentTypeServices.create(paymentTypes);

      if (response.status === 200) history.push(AppPaths.paymentTypes);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.paymentTypesSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.paymentTypesStopPending());
      }, 500);
    }
  };

export const editPaymentTypesController =
  (paymentTypes: FormData, id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.paymentTypesStartPending());

      const response = await paymentTypeServices.edit(paymentTypes, id);

      if (response.status === 204) history.push(AppPaths.paymentTypes);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.paymentTypesSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.paymentTypesStopPending());
      }, 500);
    }
  };

export const deletePaymentTypesController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.paymentTypesStartPending());

      const response = await paymentTypeServices.delete(id);

      if (response.status === 204) {
        dispatch(actions.paymentTypesRemove(id));
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.paymentTypesSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.paymentTypesStopPending());
      }, 500);
    }
  };

export const paymentTypesControllers = Object.freeze(
  Object.seal({
    get: getPaymentTypesController,
    getById: getByIdPaymentTypesController,
    create: createPaymentTypesController,
    edit: editPaymentTypesController,
    delete: deletePaymentTypesController,
  })
);
