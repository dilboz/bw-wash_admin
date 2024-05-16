import { IUserItem, IUsersState, IUserItemInfo } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUsersState = {
  pending: true,
  error: null,
  pageCount: 0,
  data: [],
  dataById: null
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    usersStartPending(state: IUsersState) {
      state.pending = true;
    },
    usersStopPending(state: IUsersState) {
      state.pending = false;
    },
    usersSetError: (
      state: IUsersState,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
    },
    usersSetData: (
      state: IUsersState,
      { payload }: PayloadAction<{data: IUserItem[], totalPages: number}>
    ) => {
      state.data = payload.data;
      state.pageCount = payload.totalPages;
    },
    usersSetDataById: (
      state: IUsersState,
      { payload }: PayloadAction<IUserItemInfo>
    ) => {
      state.dataById = payload;
    },
    usersEdit: (
      state: IUsersState,
      { payload }: PayloadAction<IUserItem>
    ) => {
      state.data = state.data.map((users: IUserItem) =>
        users.id === payload.id ? payload : users
      );
    },
  },
});

export const {
  usersStartPending,
  usersStopPending,
  usersSetError,
  usersSetData,
  usersSetDataById,
  usersEdit,
} = usersSlice.actions;

export default usersSlice.reducer;
