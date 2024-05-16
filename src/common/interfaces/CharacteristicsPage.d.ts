export interface ICharacteristicsPage {
  id: string;
  name: string;
  values: ICharacteristicsValues[];
}

export interface ICharacteristicsValues {
  id: string;
  name: string;
}

export interface ICharacteristicsParams {
  search?: string;
  page?: number;
}
