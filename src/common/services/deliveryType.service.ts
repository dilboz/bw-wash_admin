import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from "@utils/axios";
import { Api } from "@constants";
import { IDeliveryType } from "@interfaces";

const getDeliveryTypesService = () => requestGET(Api.deliveryType);

const getByIdDeliveryTypesService = (id: string) =>
  requestGET(Api.deliveryType + "/" + id);

const createDeliveryTypeService = (body: Omit<IDeliveryType, "id">) =>
  requestPOST(Api.deliveryType, body);

const deleteDeliveryTypeService = (id: string) =>
  requestDELETE(Api.deliveryType, id);

const editDeliveryTypeService = (body: Omit<IDeliveryType, "id">, id: string) =>
  requestPUT(Api.deliveryType, body, id);

export const deliveryTypeServices = Object.freeze(
  Object.seal({
    get: getDeliveryTypesService,
    getById: getByIdDeliveryTypesService,
    create: createDeliveryTypeService,
    delete: deleteDeliveryTypeService,
    edit: editDeliveryTypeService,
  })
);
