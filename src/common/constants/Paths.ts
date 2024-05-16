export const AuthPaths = Object.freeze(
  Object.seal({
    login: "/login",
    checkCode: "/check-code",
    forgetPassword: "/auth/forget-password",
  })
);

export const ErrorPaths = Object.freeze(
  Object.seal({
    notFound: "/404",
    serverError: "/500",
    connectionError: "/connection-error",
  })
);

export const AppPaths = Object.freeze(
  Object.seal({
    // info
    info: "/info",
    // products
    products: "/",
    addProduct: "/add-product",
    editProduct: "/edit-product",
    // banner
    banners: "/banners",
    addBanner: "/add-banner",
    // brand
    brands: "/brands",
    addBrand: "/add-brand",
    // brand
    paymentTypes: "/payment-types",
    addPaymentType: "/add-payment-type",
    editPaymentType: "/edit-payment-type",
    // categories
    categories: "/categories",
    addCategory: "/add-category",
    editCategory: "/edit-category",
    // deliveryType
    deliveryType: "/delivery-type",
    addDeliveryType: "/add-delivery-type",
    editDeliveryType: "/edit-delivery-type",
    // characteristics
    characteristics: "/characteristics",
    addCharacteristics: "/add-characteristics",
    editCharacteristic: "/edit-characteristic",
    addCharacteristicsValue: "/add-characteristics-value",
    editCharacteristicValue: "/edit-characteristic-value",
    // users
    users: "/users",
    // orders
    orders: "/orders",
  })
);

export const Paths = Object.freeze(
  Object.seal({
    ...AuthPaths,
    ...ErrorPaths,
    ...AppPaths,
  })
);
