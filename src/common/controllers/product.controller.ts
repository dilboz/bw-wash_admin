import * as actions from "@store/slice";
import { IProduct, IProductsParams } from "@interfaces";
import { AppDispatch, useAppSelector } from "@store";
import { productServices } from "@services";
import { history } from "@utils/history";
import { AppPaths } from "@constants";
import { setStatuses } from "@store/slice";

export const getProductController =
  (params: IProductsParams, payload: any = {}) =>
  async (dispatch: AppDispatch) => {
    const categoryId = params.categoryId || "";
    const isLoadedCategory = payload.statuses[categoryId];
    if (isLoadedCategory) {
      dispatch(
        actions.productSetData({
          data: payload.data,
          totalPages: payload.pageCount,
        })
      );

      let newStatuses = {
        ...payload.statuses,
        [categoryId]: { loaded: true },
      };

      dispatch(setStatuses(newStatuses));
      return;
    }

    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.productStartPending());

      const response = await productServices.get(params);

      const product: IProduct[] = response.data.data;
      const totalPages: number = response.data.totalPages;

      dispatch(actions.productSetData({ data: product, totalPages }));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.productSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.productStopPending());
        dispatch(actions.productStopPaginationPending());
      }, 500);
    }
  };

export const getProductByIdController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.productStartPending());

      const response = await productServices.getById(id);

      const product: IProduct = response.data;

      dispatch(actions.productSetDataById(product));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.productSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.productStopPending());
        dispatch(actions.productStopPaginationPending());
      }, 500);
    }
  };

export const createProductController =
  (product: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.productStartPending());

      const response = await productServices.create(product);

      if (response.status === 201) history.push(AppPaths.products);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.productSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.productStopPending());
        dispatch(actions.productStopPaginationPending());
      }, 500);
    }
  };

export const deleteProductController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.productStartPaginationPending());
      const response = await productServices.delete(id);

      if (response.status === 204) dispatch(actions.productRemove(id));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.productSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.productStopPaginationPending());
      }, 500);
    }
  };

export const editProductController =
  (product: FormData, id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.productStartPending());

      const response = await productServices.edit(product, id);

      if (response.status === 204) history.push(AppPaths.products);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.productSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.productStopPending());
        dispatch(actions.productStopPaginationPending());
      }, 500);
    }
  };

export const productControllers = Object.freeze(
  Object.seal({
    get: getProductController,
    getById: getProductByIdController,
    create: createProductController,
    delete: deleteProductController,
    edit: editProductController,
  })
);
