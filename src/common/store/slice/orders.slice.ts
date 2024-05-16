import { IOrder, IOrderState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOrderState = {
  pending: true,
  error: null,
  pageCount: 0,
  data: [],
  orderById: null,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    ordersStartPending(state: IOrderState) {
      state.pending = true;
    },
    ordersStopPending(state: IOrderState) {
      state.pending = false;
    },
    ordersSetError: (
      state: IOrderState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    ordersSetData: (
      state: IOrderState,
      { payload }: PayloadAction<{data: IOrder[], totalPages: number}>
    ) => {
      state.data = payload.data;
      state.pageCount = payload.totalPages;
    },
    ordersSetById: (
      state: IOrderState,
      { payload }: PayloadAction<IOrder>
    ) => {
      state.orderById = payload;
    },
    ordersEdit: (
      state: IOrderState,
      { payload }: PayloadAction<IOrder>
    ) => {
      state.data = state.data.map((order: IOrder) =>
        order.orderId === payload.orderId ? payload : order
      );
    },
  },
});

export const {
  ordersStartPending,
  ordersStopPending,
  ordersSetError,
  ordersSetData,
  ordersSetById,
  ordersEdit,
} = orderSlice.actions;

export default orderSlice.reducer;
