export interface IDeliveryType {
  id: string;
  name: string;
  price: string;
}

export interface IDeliveryTypeState {
  pending: boolean;
  error: string | null;
  data: IDeliveryType[];
  deliveyTypeById: IDeliveryType | null;
}
