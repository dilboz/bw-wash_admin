import { IProduct, IProductResponse, IProductState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IProductState = {
  pending: true,
  paginationPending: true,
  error: null,
  pageCount: 0,
  dataById: null,
  data: [],
  statuses: {},
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    productStartPending(state: IProductState) {
      state.pending = true;
    },
    productStartPaginationPending(state: IProductState) {
      state.paginationPending = true;
    },
    productStopPending(state: IProductState) {
      state.pending = false;
    },
    productStopPaginationPending(state: IProductState) {
      state.paginationPending = false;
    },
    productSetError: (
      state: IProductState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    productSetData: (
      state: IProductState,
      { payload }: PayloadAction<IProductResponse>
    ) => {
      state.data = payload.data;
      state.pageCount = payload.totalPages;
    },
    productSetDataById: (
      state: IProductState,
      { payload }: PayloadAction<IProduct>
    ) => {
      state.dataById = payload;
    },
    productRemove: (
      state: IProductState,
      { payload }: PayloadAction<string>
    ) => {
      state.data = state.data.filter((product) => product.id !== payload);
    },
    setStatuses: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.statuses = payload;
    },
  },
});

export const {
  productStartPending,
  productStartPaginationPending,
  productStopPending,
  productStopPaginationPending,
  productSetError,
  productSetData,
  productSetDataById,
  productRemove,
  setStatuses,
} = productSlice.actions;

export default productSlice.reducer;
