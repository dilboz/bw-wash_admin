import { IProduct } from "./ProductsComponent";

export interface IProductState {
  pending: boolean;
  paginationPending: boolean;
  error: string | null;
  pageCount: number;
  dataById: IProduct | null;
  data: IProduct[];
  statuses: any;
}

export interface IProductResponse {
  data: IProduct[];
  totalPages: number;
}
