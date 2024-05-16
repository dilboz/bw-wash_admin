import * as actions from "@store/slice";
import { IOrder, IOrdersParams } from "@interfaces";
import { AppDispatch } from "@store";
import { ordersServices } from "@services";
import { history } from "@utils/history";
import { AppPaths } from "@constants";

export const getOrdersController =
  (params: IOrdersParams) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.ordersStartPending());

      const response = await ordersServices.get(params);

      const orders: {data: IOrder[], totalPages: number} = response.data;

      dispatch(actions.ordersSetData(orders));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.ordersSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.ordersStopPending());
      }, 500);
    }
  };

export const getByIdOrdersController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.ordersStartPending());

      const response = await ordersServices.getById(id);

      const orders: IOrder = response.data;

      dispatch(actions.ordersSetById(orders));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.ordersSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.ordersStopPending());
      }, 500);
    }
  };

export const editOrdersControllersController =
  (orders: IOrder) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));

      const response = await ordersServices.edit({orderStatusId: orders.orderStatusId}, orders.orderId);

      dispatch(actions.ordersEdit(orders));

      if (response.status === 204) history.push(AppPaths.orders);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.ordersSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
    }
  };

export const ordersControllers = Object.freeze(
  Object.seal({
    get: getOrdersController,
    getById: getByIdOrdersController,
    edit: editOrdersControllersController,
  })
);
