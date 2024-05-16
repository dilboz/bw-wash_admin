export interface ICategories {
  id: string | null;
  name: string;
}

export interface ICategoriesAll extends ICategories {
  subCategories: ISubCategories[];
}

export interface ISubCategories extends ICategories {
  subCategories: ICategories[];
}
