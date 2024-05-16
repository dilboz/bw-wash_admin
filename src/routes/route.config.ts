import React from "react";
import { Paths } from "@constants";

export const routeConfig = [
  {
    path: Paths.banners,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Banners }) => ({ default: Banners }))
    ),
  },
  {
    path: Paths.brands,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Brands }) => ({ default: Brands }))
    ),
  },
  {
    path: Paths.addBrand,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddBrand }) => ({ default: AddBrand }))
    ),
  },
  {
    path: Paths.paymentTypes,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ PaymentTypes }) => ({ default: PaymentTypes }))
    ),
  },
  {
    path: Paths.addPaymentType,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddPaymentType }) => ({
        default: AddPaymentType,
      }))
    ),
  },
  {
    path: Paths.editPaymentType,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ EditPaymentType }) => ({
        default: EditPaymentType,
      }))
    ),
  },
  {
    path: Paths.categories,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Categories }) => ({ default: Categories }))
    ),
  },
  {
    path: Paths.deliveryType,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ DeliveryType }) => ({ default: DeliveryType }))
    ),
  },
  {
    path: Paths.orders,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ Order }) => ({ default: Order }))
    ),
  },
  {
    path: Paths.orders,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Orders }) => ({ default: Orders }))
    ),
  },
  {
    path: Paths.addDeliveryType,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddDeliveryType }) => ({
        default: AddDeliveryType,
      }))
    ),
  },
  {
    path: Paths.editDeliveryType,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ EditDeliveryType }) => ({
        default: EditDeliveryType,
      }))
    ),
  },
  {
    path: Paths.forgetPassword,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ ForgotPassword }) => ({
        default: ForgotPassword,
      }))
    ),
  },
  {
    path: Paths.login,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Login }) => ({ default: Login }))
    ),
  },
  {
    path: Paths.checkCode,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ CheckCode }) => ({ default: CheckCode }))
    ),
  },
  {
    path: Paths.notFound,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ NotFound }) => ({ default: NotFound }))
    ),
  },
  {
    path: Paths.serverError,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ ServerError }) => ({ default: ServerError }))
    ),
  },
  {
    path: Paths.connectionError,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ ConnectionError }) => ({
        default: ConnectionError,
      }))
    ),
  },
  {
    path: Paths.products,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Products }) => ({ default: Products }))
    ),
  },
  {
    path: Paths.editProduct,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ EditProduct }) => ({ default: EditProduct }))
    ),
  },
  {
    path: Paths.addCategory,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddCategory }) => ({ default: AddCategory }))
    ),
  },
  {
    path: Paths.users,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Users }) => ({ default: Users }))
    ),
  },
  {
    path: Paths.users,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ UserById }) => ({ default: UserById }))
    ),
  },
  {
    path: Paths.characteristics,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Characteristics }) => ({
        default: Characteristics,
      }))
    ),
  },
  {
    path: Paths.addCharacteristics,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddCharacteristics }) => ({
        default: AddCharacteristics,
      }))
    ),
  },
  {
    path: Paths.addCharacteristicsValue,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ AddCharacteristicValue }) => ({
        default: AddCharacteristicValue,
      }))
    ),
  },
  {
    path: Paths.editCharacteristic,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ EditCharacteristic }) => ({
        default: EditCharacteristic,
      }))
    ),
  },
  {
    path: Paths.editCharacteristicValue,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ EditCharacteristicValue }) => ({
        default: EditCharacteristicValue,
      }))
    ),
  },
  {
    path: Paths.addCategory,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddCategory }) => ({ default: AddCategory }))
    ),
  },
  {
    path: Paths.editCategory,
    index: false,
    element: React.lazy(() =>
      import("@pages").then(({ EditCategory }) => ({ default: EditCategory }))
    ),
  },
  {
    path: Paths.addProduct,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddProduct }) => ({ default: AddProduct }))
    ),
  },
  {
    path: Paths.addBanner,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ AddBanner }) => ({ default: AddBanner }))
    ),
  },
  {
    path: Paths.info,
    index: true,
    element: React.lazy(() =>
      import("@pages").then(({ Info }) => ({ default: Info }))
    ),
  },
];
