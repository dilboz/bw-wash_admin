import { IBrand, IBrandState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBrandState = {
  pending: true,
  error: null,
  data: [],
};

const brandSlice = createSlice({
  name: "brandSlice",
  initialState,
  reducers: {
    brandStartPending(state: IBrandState) {
      state.pending = true;
    },
    brandStopPending(state: IBrandState) {
      state.pending = false;
    },
    brandSetError: (state: IBrandState, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    brandSetData: (
      state: IBrandState,
      { payload }: PayloadAction<IBrand[]>
    ) => {
      state.data = payload;
    },
    brandAdd: (state: IBrandState, { payload }: PayloadAction<IBrand>) => {
      state.data = [...state.data, payload];
    },
    brandRemove: (state: IBrandState, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter((brand) => brand.id !== payload);
    },
  },
});

export const {
  brandStartPending,
  brandStopPending,
  brandSetError,
  brandSetData,
  brandAdd,
  brandRemove,
} = brandSlice.actions;

export default brandSlice.reducer;
