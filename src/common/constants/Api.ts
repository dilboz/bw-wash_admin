const banner = Object.freeze(
  Object.seal({
    banner: "/banner",
  })
);

const brand = Object.freeze(
  Object.seal({
    brand: "/brands",
  })
);

const paymentTypes = Object.freeze(
  Object.seal({
    paymentTypes: "/paymenttypes",
  })
);

const categories = Object.freeze(
  Object.seal({
    categories: "/categories",
    popularCategories: "/categories/populars",
  })
);

const characteristics = Object.freeze(
  Object.seal({
    characteristics: "/characteristics",
    characteristicvalue: "/characteristicvalue",
    characteristicwithvalue: "/characteristics/withvalues",
  })
);

const characteristicValue = Object.freeze(
  Object.seal({
    characteristicValue: "/characteristicValue",
  })
);

const deliveryType = Object.freeze(
  Object.seal({
    deliveryType: "/deliveryType",
  })
);

const orders = Object.freeze(
  Object.seal({
    orders: "/order",
    ordersAll: "/order/getall",
  })
);

const favorite = Object.freeze(
  Object.seal({
    favorite: "/favorite",
  })
);

const product = Object.freeze(
  Object.seal({
    product: "/product",
  })
);

const user = Object.freeze(
  Object.seal({
    getUserData: "/user/getData",
    authorizeUser: "/email",
    authorizeUserOld: "/login",
  })
);

const users = Object.freeze(
  Object.seal({
    usersAll: "/users",
  })
);

const filtration = Object.freeze(
  Object.seal({
    filtration: "/filtration",
  })
);

export const Api = Object.freeze(
  Object.seal({
    ...user,
    ...users,
    ...banner,
    ...categories,
    ...characteristics,
    ...brand,
    ...paymentTypes,
    ...characteristicValue,
    ...deliveryType,
    ...orders,
    ...favorite,
    ...product,
    ...filtration,
  })
);
