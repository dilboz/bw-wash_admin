import { ICategory, ICategoryState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICategoryState = {
  pending: true,
  error: null,
  data: [],
  popularData: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    categoryStartPending(state: ICategoryState) {
      state.pending = true;
    },
    categoryStopPending(state: ICategoryState) {
      state.pending = false;
    },
    categorySetError: (
      state: ICategoryState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    categorySetData: (
      state: ICategoryState,
      { payload }: PayloadAction<ICategory[]>
    ) => {
      state.data = payload;
    },
    categorySetPopularData: (
      state: ICategoryState,
      { payload }: PayloadAction<ICategory[]>
    ) => {
      state.popularData = payload;
    },
    categoryAdd: (
      state: ICategoryState,
      { payload }: PayloadAction<ICategory>
    ) => {
      state.data = [...state.data, payload];
    },
    categoryRemove: (
      state: ICategoryState,
      { payload }: PayloadAction<string>
    ) => {
      state.data = state.data.filter((category) => category.id !== payload);
    },
    categoryEdit: (
      state: ICategoryState,
      { payload }: PayloadAction<ICategory>
    ) => {
      state.data = state.data.map((category) =>
        category.id === payload.id ? payload : category
      );
    },
  },
});

export const {
  categoryStartPending,
  categoryStopPending,
  categorySetError,
  categorySetData,
  categorySetPopularData,
  categoryAdd,
  categoryRemove,
  categoryEdit,
} = categorySlice.actions;

export default categorySlice.reducer;
