import { IPaymentTypes, IPaymentTypesState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IPaymentTypesState = {
  pending: true,
  error: null,
  data: [],
  dataById: null,
};

const paymentTypesSlice = createSlice({
  name: "brandSlice",
  initialState,
  reducers: {
    paymentTypesStartPending(state: IPaymentTypesState) {
      state.pending = true;
    },
    paymentTypesStopPending(state: IPaymentTypesState) {
      state.pending = false;
    },
    paymentTypesSetError: (
      state: IPaymentTypesState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    paymentTypesSetData: (
      state: IPaymentTypesState,
      { payload }: PayloadAction<IPaymentTypes[]>
    ) => {
      state.data = payload;
    },
    paymentTypesSetDataById: (
      state: IPaymentTypesState,
      { payload }: PayloadAction<IPaymentTypes>
    ) => {
      state.dataById = payload;
    },
    paymentTypesAdd: (
      state: IPaymentTypesState,
      { payload }: PayloadAction<IPaymentTypes>
    ) => {
      state.data = [...state.data, payload];
    },
    paymentTypesRemove: (
      state: IPaymentTypesState,
      { payload }: PayloadAction<string>
    ) => {
      state.data = state.data.filter((brand) => brand.id !== payload);
    },
  },
});

export const {
  paymentTypesStartPending,
  paymentTypesStopPending,
  paymentTypesSetError,
  paymentTypesSetData,
  paymentTypesSetDataById,
  paymentTypesAdd,
  paymentTypesRemove,
} = paymentTypesSlice.actions;

export default paymentTypesSlice.reducer;
