import { IAppState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppState = {
  modalKey: "",
  isShowLoading: false,
  freezed: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setModalKey(state: IAppState, { payload }: PayloadAction<string>) {
      state.modalKey = payload;
    },
    setIsShowLoading(state: IAppState, { payload }: PayloadAction<boolean>) {
      state.isShowLoading = payload;
    },
    setAppFreezed(state: IAppState, { payload }: PayloadAction<boolean>) {
      state.freezed = payload;
    },
  },
});

export const { setModalKey, setIsShowLoading, setAppFreezed } =
  appSlice.actions;

export default appSlice.reducer;
