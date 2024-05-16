import { IBanner, IBannerState } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBannerState = {
  pending: false,
  error: null,
  data: [],
};

const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState,
  reducers: {
    bannerStartPending(state: IBannerState) {
      state.pending = true;
    },
    bannerStopPending(state: IBannerState) {
      state.pending = false;
    },
    bannerSetError: (
      state: IBannerState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    bannerSetData: (
      state: IBannerState,
      { payload }: PayloadAction<IBanner[]>
    ) => {
      state.data = payload;
    },
    bannerAddBanner: (
      state: IBannerState,
      { payload }: PayloadAction<IBanner>
    ) => {
      state.data = [...state.data, payload];
    },
    bannerRemoveBanner: (
      state: IBannerState,
      { payload }: PayloadAction<string>
    ) => {
      state.data = state.data.filter((banner) => banner.id !== payload);
    },
  },
});

export const {
  bannerStartPending,
  bannerStopPending,
  bannerSetError,
  bannerSetData,
  bannerAddBanner,
  bannerRemoveBanner,
} = bannerSlice.actions;

export default bannerSlice.reducer;
