export interface ICategory {
  id: string;
  iconPath: string;
  imagePath: string;
  name: string;
  subCategories: ICategory[];
}

export interface IPopularCategory {
  id: string;
  iconPath: string;
  name: string;
}

export interface ICategoryState {
  pending: boolean;
  error: string | null;
  data: ICategory[];
  popularData: IPopularCategory[];
}
