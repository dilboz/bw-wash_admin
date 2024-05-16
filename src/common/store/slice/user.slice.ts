import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfoState, IUserState, IUserTokenState } from "@interfaces";
import { AppDispatch } from "@store";
import { getUserDataService, authorizeUserService, checkAuthCodeService, authorizeUserServiceOld } from "@services";
import { LSTokenName } from "@utils/LocaStorage";
import { history } from "@utils/history";
import { AppPaths, AuthPaths } from "@constants";

const initialState: IUserState = {
  id: "",
  pending: true,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  address: "",
  roleName: 0,
  token: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    handleSetUser(
      state: IUserState,
      { payload }: PayloadAction<IUserInfoState>
    ) {
      state.firstName = payload.firstName;
      state.phoneNumber = payload.phoneNumber;
      state.email = payload.email;
      state.address = payload.address;
    },
    handleStartPending(state: IUserState) {
      state.pending = true;
    },
    handleStopPending(state: IUserState) {
      state.pending = false;
    },
    handleAuthorizeUser: (
      state: IUserState,
      { payload }: PayloadAction<IUserTokenState>
    ) => {
      state.roleName = payload.roleName;
      state.token = payload.token;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.phoneNumber = payload.phoneNumber;
      state.id = payload.id;
      localStorage.setItem(LSTokenName, JSON.stringify(payload.token));
    },
  },
});

export const {
  handleSetUser,
  handleStartPending,
  handleStopPending,
  handleAuthorizeUser,
} = userSlice.actions;

export const getUserData = () => async (dispatch: AppDispatch) => {
  const response = await getUserDataService();

  const data = response.data;

  dispatch(handleStartPending());

  dispatch(handleSetUser(data));

  setTimeout(() => {
    dispatch(handleStopPending());
  }, 500);
};

export const authorizeUser =
  (email: string, password: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(handleStartPending());
    try {
      const response = await authorizeUserService({ email, password });

      if (response.status === 200) {
        history.push(AuthPaths.checkCode);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        dispatch(handleStopPending());
      }, 500);
    }
  };

export const authorizeUserOld =
  (email: string, password: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch(handleStartPending());
    try {
      const response = await authorizeUserServiceOld({ email, password });
      const data = response.data;

      dispatch(handleAuthorizeUser(data));

      if (response.status === 200) {
        history.push(AppPaths.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        dispatch(handleStopPending());
      }, 500);
    }
  };

export const checkAuthCode = (code: string): any => async (dispatch: AppDispatch) => {
  try {
    const response = await checkAuthCodeService(code);

    const data = response.data;

    dispatch(handleAuthorizeUser(data));

    if (response.status === 200) {
      history.push(AppPaths.products);
    }
  } catch (error) {
    console.log(error);
  }
};

export default userSlice.reducer;
