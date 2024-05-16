import * as actions from "@store/slice";
import { IBrand } from "@interfaces";
import { AppDispatch } from "@store";
import { brandServices } from "@services";
import { history } from "@utils/history";
import { AppPaths } from "@constants";

export const getBrandController = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(actions.setAppFreezed(true));
    dispatch(actions.brandStartPending());

    const response = await brandServices.get();

    const brands: IBrand[] = response.data;

    dispatch(actions.brandSetData(brands));
  } catch (error: any) {
    if (error.response) {
      dispatch(actions.brandSetError(error.response.data.message));
    }
  } finally {
    dispatch(actions.setAppFreezed(false));
    setTimeout(() => {
      dispatch(actions.brandStopPending());
    }, 500);
  }
};

export const createBrandController =
  (brand: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.brandStartPending());

      const response = await brandServices.create(brand);

      if (response.status === 201) history.push(AppPaths.brands);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.brandSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.brandStopPending());
      }, 500);
    }
  };

export const deleteBrandController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.brandStartPending());

      const response = await brandServices.delete(id);

      if (response.status === 204) {
        dispatch(actions.brandRemove(id));
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.brandSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.brandStopPending());
      }, 500);
    }
  };

export const brandControllers = Object.freeze(
  Object.seal({
    get: getBrandController,
    create: createBrandController,
    delete: deleteBrandController,
  })
);
