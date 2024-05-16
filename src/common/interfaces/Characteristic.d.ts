export interface ICharacteristicValue {
  id: string;
  characteristicId: string;
  value: string;
}

export interface ISelectedCharacteristic {
  id: string;
  characteristic: ICharacteristic;
  value: Omit<ICharacteristicValue, "characteristicId">;
}

export interface ICharacteristicWithValue {
  id: string;
  name: string;
  values: Omit<ICharacteristicValue, "characteristicId">[];
}

export interface ICharacteristicState {
  pending: boolean;
  error: string | null;
  data: ICharacteristic[];
  values: ICharacteristicValue[];
  dataWithValue: ICharacteristicWithValue[];
}

export interface ICharacteristic {
  id: string;
  name: string;
}

export interface ICharacteristicResponse {
  id: string;
  name: string;
  value: string;
}
