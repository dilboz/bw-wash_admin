export interface IPaymentTypes {
  id: string;
  imagePath: string;
  name: string;
  description: string;
}

export interface IPaymentTypesState {
  pending: boolean;
  error: string | null;
  data: IPaymentTypes[];
  dataById: IPaymentTypes | null;
}
