import * as actions from "@store/slice";
import { ICategory } from "@interfaces";
import { AppDispatch } from "@store";
import { categoryServices } from "@services";
import { history } from "@utils/history";
import { AppPaths } from "@constants";

export const getCategorysController = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(actions.setAppFreezed(true));
    dispatch(actions.categoryStartPending());

    const response = await categoryServices.get();

    const categorys: ICategory[] = response.data;

    dispatch(actions.categorySetData(categorys));
  } catch (error: any) {
    if (error.response) {
      dispatch(actions.categorySetError(error.response.data.message));
    }
  } finally {
    dispatch(actions.setAppFreezed(false));
    setTimeout(() => {
      dispatch(actions.categoryStopPending());
    }, 500);
  }
};

export const getPopularCategoryController =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.categoryStartPending());

      const response = await categoryServices.getPopular();

      const categorys: ICategory[] = response.data;

      dispatch(actions.categorySetPopularData(categorys));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.categorySetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.categoryStopPending());
      }, 500);
    }
  };

  export const updateCategoryController =
  (category: {id: number, visibility: boolean}) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.categoryStartPending());

      const response = await categoryServices.update(category);
      
      if (response.status === 204) history.push(AppPaths.categories);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.categorySetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.categoryStopPending());
      }, 500);
    }
  };


export const createCategoryController =
  (category: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.categoryStartPending());

      const response = await categoryServices.create(category);

      if (response.status === 201) history.push(AppPaths.categories);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.categorySetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.categoryStopPending());
      }, 500);
    }
  };

export const editCategoryController =
  (category: FormData, id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.categoryStartPending());

      const response = await categoryServices.edit(category, id);

      if (response.status === 204) history.push(AppPaths.categories);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.categorySetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.categoryStopPending());
      }, 500);
    }
  };

export const deleteCategoryController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.categoryStartPending());

      const response = await categoryServices.delete(id);

      if (response.status === 200) {
        dispatch(actions.categoryRemove(id));
        history.push(AppPaths.categories);
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.categorySetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.categoryStopPending());
      }, 500);
    }
  };

export const categoryControllers = Object.freeze(
  Object.seal({
    get: getCategorysController,
    create: createCategoryController,
    edit: editCategoryController,
    delete: deleteCategoryController,
    getPopular: getPopularCategoryController,
    updateCategorystatus: updateCategoryController
  })
);
