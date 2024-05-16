import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "@store/slice/app.slice";
import UserSlice from "@store/slice/user.slice";
import BannerSlice from "@store/slice/banner.slice";
import BrandSlice from "@store/slice/brand.slice";
import CategorySlice from "@store/slice/category.slice";
import DeliveryTypeSlice from "@store/slice/deliveryType.slice";
import CharacteristicSlice from "@store/slice/characteristic.slice";
import ProductSlice from "@store/slice/product.slice";
import PaymentTypesSlice from "@store/slice/paymentTypes.slice";
import OrdersSlice from "@store/slice/orders.slice";
import UsersSlice from "@store/slice/users.slice";

import { LSBWAdminStates } from "@utils/LocaStorage";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LSBWAdminStates);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const store = configureStore({
  devTools: true,
  reducer: {
    app: AppSlice,
    user: UserSlice,
    banner: BannerSlice,
    brand: BrandSlice,
    category: CategorySlice,
    deliveryType: DeliveryTypeSlice,
    characteristic: CharacteristicSlice,
    product: ProductSlice,
    paymentTypes: PaymentTypesSlice,
    orders: OrdersSlice,
    users: UsersSlice
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  localStorage.setItem(LSBWAdminStates, JSON.stringify(store.getState()));
});
