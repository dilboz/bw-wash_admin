import { ICharacteristicResponse } from "./Characteristic";

export interface IProduct {
  id: string;
  imagePath: string;
  hideProduct: boolean;
  name: string;
  price: string;
  isNew?: boolean | null;
  discount: string;
  rating: number;
  description: string;
  categoryId: string;
  vendorCode: string;
  brandId: string;
  productDate: string;
  characteristics: ICharacteristicResponse[];
  images: {
    id: string;
    imagePath: string;
    isMain: string;
  }[];
}

export interface IProductCard {
  id: string;
  imgSrc: any;
  name: string;
  price: string;
  isNew?: boolean | null;
  isHidden: boolean;
  discount?: string | null;
  date?: string;
  onDelete: (id) => void;
}

export interface IProductsParams {
  page?: number;
  query?: string;
  pageNumber?: number;
  categoryId?: string;
}
