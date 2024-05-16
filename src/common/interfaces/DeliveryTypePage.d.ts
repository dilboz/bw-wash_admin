export interface IDeliveryTypePage {
  id: string;
  name: string;
  price: number;
}

export interface IDeliveryTypeParams {
  search?: string;
  page?: number;
}
