import * as actions from "@store/slice";
import {
  ICharacteristic,
  ICharacteristicValue,
  ICharacteristicWithValue,
  IDeliveryType,
} from "@interfaces";
import { AppDispatch } from "@store";
import { characteristicServices } from "@services";
import { history } from "@utils/history";
import { AppPaths } from "@constants";

export const getCharacteristicController =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.get();

      const characteristics: ICharacteristic[] = response.data;

      dispatch(actions.characteristicSetData(characteristics));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const getCharacteristicWithValueController =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.getWithValue();

      const characteristics: ICharacteristicWithValue[] = response.data;

      dispatch(actions.characteristicSetDataWithValues(characteristics));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const getCharacteristicValueController =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.getWithValue();

      const characteristics: ICharacteristicValue[] = response.data;

      dispatch(actions.characteristicSetValues(characteristics));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const createCharacteristicController =
  (characteristic: { name: string }) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.create(characteristic);

      if (response.status === 200) history.push(AppPaths.characteristics);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const createCharacteristicValueController =
  (characteristicValue: Omit<ICharacteristicValue, "id">) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.createValue(
        characteristicValue
      );

      if (response.status === 200) history.push(AppPaths.characteristics);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const editCharacteristicController =
  (characteristic: { name: string }, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.edit(characteristic, id);

      if (response.status === 204) history.push(AppPaths.characteristics);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const editCharacteristicValueController =
  (characteristicValue: Omit<ICharacteristicValue, "id">, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.editValue(
        characteristicValue,
        id
      );

      if (response.status === 204) history.push(AppPaths.characteristics);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const deleteCharacteristicController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.delete(id);

      if (response.status === 204) {
        dispatch(actions.characteristicRemove(id));
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const deleteCharacteristicValueController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.characteristicStartPending());

      const response = await characteristicServices.deleteValue(id);

      if (response.status === 204) {
        dispatch(actions.characteristicRemoveValue(id));
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.characteristicSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.characteristicStopPending());
      }, 500);
    }
  };

export const characteristicControllers = Object.freeze(
  Object.seal({
    get: getCharacteristicController,
    getWithValues: getCharacteristicWithValueController,
    getValues: getCharacteristicValueController,
    create: createCharacteristicController,
    createValue: createCharacteristicValueController,
    editValue: editCharacteristicValueController,
    edit: editCharacteristicController,
    delete: deleteCharacteristicController,
    deleteValue: deleteCharacteristicValueController,
  })
);
