export interface IOrder {
  orderId: string;
  userId: string;
  orderAt: string;
  firstName: string;
  lastName: string;
  deliveryTypeId: string;
  deliveryType: string;
  paymentTypeId: string;
  paymentType: string;
  description: string;
  orderStatusId: number | string;
  orderStatus: string;
  phoneNumber: string | number;
  type: {
    count: number;
    vendorCode: string;
    price: number;
    discount: number;
    name: string;
    imagePath?: string;
  }[]
}

export interface IOrdersParams {
  pageNumber?: number;
}

export interface IOrderState {
  pending: boolean;
  pageCount: number;
  error: string | null;
  data: IOrder[];
  orderById: IOrder | null;
}
