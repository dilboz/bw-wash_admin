import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from "@utils/axios";
import { Api } from "@constants";
import { ICharacteristicValue } from "@interfaces";

const getCharacteristicService = () => requestGET(Api.characteristics);

const getCharacteristicValueService = () => requestGET(Api.characteristicvalue);

const getCharacteristicWithValueService = () =>
  requestGET(Api.characteristicwithvalue);

const createCharacteristicService = (body: { name: string }) =>
  requestPOST(Api.characteristics, body);

const deleteCharacteristicService = (id: string) =>
  requestDELETE(Api.characteristics, id);

const editCharacteristicService = (body: { name: string }, id: string) =>
  requestPUT(Api.characteristics, body, id);

const createCharacteristicValueService = (
  body: Omit<ICharacteristicValue, "id">
) => requestPOST(Api.characteristicValue, body);

const deleteCharacteristicValueService = (id: string) =>
  requestDELETE(Api.characteristicValue, id);

const editCharacteristicValueService = (
  body: Omit<ICharacteristicValue, "id">,
  id: string
) => requestPUT(Api.characteristicValue, body, id);

export const characteristicServices = Object.freeze(
  Object.seal({
    get: getCharacteristicService,
    getValue: getCharacteristicValueService,
    getWithValue: getCharacteristicWithValueService,
    create: createCharacteristicService,
    createValue: createCharacteristicValueService,
    delete: deleteCharacteristicService,
    deleteValue: deleteCharacteristicValueService,
    edit: editCharacteristicService,
    editValue: editCharacteristicValueService,
  })
);
