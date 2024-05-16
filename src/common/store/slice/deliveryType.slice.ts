import { IDeliveryType, IDeliveryTypeState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IDeliveryTypeState = {
  pending: true,
  error: null,
  data: [],
  deliveyTypeById: null,
};

const deliveryTypeSlice = createSlice({
  name: "deliveryTypeSlice",
  initialState,
  reducers: {
    deliveryTypeStartPending(state: IDeliveryTypeState) {
      state.pending = true;
    },
    deliveryTypeStopPending(state: IDeliveryTypeState) {
      state.pending = false;
    },
    deliveryTypeSetError: (
      state: IDeliveryTypeState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    deliveryTypeSetData: (
      state: IDeliveryTypeState,
      { payload }: PayloadAction<IDeliveryType[]>
    ) => {
      state.data = payload;
    },
    deliveryTypeSetById: (
      state: IDeliveryTypeState,
      { payload }: PayloadAction<IDeliveryType>
    ) => {
      state.deliveyTypeById = payload;
    },
    deliveryTypeAdd: (
      state: IDeliveryTypeState,
      { payload }: PayloadAction<IDeliveryType>
    ) => {
      state.data = [...state.data, payload];
    },
    deliveryTypeRemove: (
      state: IDeliveryTypeState,
      { payload }: PayloadAction<string>
    ) => {
      state.data = state.data.filter(
        (deliveryType: IDeliveryType) => deliveryType.id !== payload
      );
    },
    deliveryTypeEdit: (
      state: IDeliveryTypeState,
      { payload }: PayloadAction<IDeliveryType>
    ) => {
      state.data = state.data.map((deliveryType: IDeliveryType) =>
        deliveryType.id === payload.id ? payload : deliveryType
      );
    },
  },
});

export const {
  deliveryTypeStartPending,
  deliveryTypeStopPending,
  deliveryTypeSetError,
  deliveryTypeSetData,
  deliveryTypeSetById,
  deliveryTypeAdd,
  deliveryTypeEdit,
  deliveryTypeRemove,
} = deliveryTypeSlice.actions;

export default deliveryTypeSlice.reducer;
