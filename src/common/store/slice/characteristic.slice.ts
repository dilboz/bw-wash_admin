import {
  ICharacteristic,
  ICharacteristicState,
  ICharacteristicValue,
  ICharacteristicWithValue,
} from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICharacteristicState = {
  pending: true,
  error: null,
  data: [],
  dataWithValue: [],
  values: [],
};

const characteristicSlice = createSlice({
  name: "characteristicSlice",
  initialState,
  reducers: {
    characteristicStartPending(state: ICharacteristicState) {
      state.pending = true;
    },
    characteristicStopPending(state: ICharacteristicState) {
      state.pending = false;
    },
    characteristicSetError: (
      state: ICharacteristicState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    characteristicSetDataWithValues: (
      state: ICharacteristicState,
      { payload }: PayloadAction<ICharacteristicWithValue[]>
    ) => {
      state.dataWithValue = payload;
    },
    characteristicSetData: (
      state: ICharacteristicState,
      { payload }: PayloadAction<ICharacteristic[]>
    ) => {
      state.data = payload;
    },
    characteristicSetValues: (
      state: ICharacteristicState,
      { payload }: PayloadAction<ICharacteristicValue[]>
    ) => {
      state.values = payload;
    },
    characteristicAdd: (
      state: ICharacteristicState,
      { payload }: PayloadAction<ICharacteristic>
    ) => {
      state.data = [...state.data, payload];
    },
    characteristicRemove: (
      state: ICharacteristicState,
      { payload }: PayloadAction<string>
    ) => {
      state.data = state.data.filter(
        (characteristic: ICharacteristic) => characteristic.id !== payload
      );
      state.dataWithValue = state.dataWithValue.filter(
        (characteristic: ICharacteristic) => characteristic.id !== payload
      );
    },
    characteristicRemoveValue: (
      state: ICharacteristicState,
      { payload }: PayloadAction<string>
    ) => {
      state.dataWithValue = state.dataWithValue.map((characteristic: any) => ({
        ...characteristic,
        values: characteristic.values.filter(
          (value: any) => value.id !== payload
        ),
      }));
    },
  },
});

export const {
  characteristicStartPending,
  characteristicStopPending,
  characteristicSetError,
  characteristicSetDataWithValues,
  characteristicSetData,
  characteristicSetValues,
  characteristicAdd,
  characteristicRemove,
  characteristicRemoveValue,
} = characteristicSlice.actions;

export default characteristicSlice.reducer;
