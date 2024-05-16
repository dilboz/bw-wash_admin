import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from "@utils/axios";
import { Api } from "@constants";

const getPaymentTypesService = () => requestGET(Api.paymentTypes);

const getByIdPaymentTypesService = (id: string) =>
  requestGET(Api.paymentTypes + "/" + id);

const createPaymentTypeService = (body: FormData) =>
  requestPOST(Api.paymentTypes, body);

const editPaymentTypeService = (body: FormData, id: string) =>
  requestPUT(Api.paymentTypes, body, id);

const deletePaymentTypeService = (id: string) =>
  requestDELETE(Api.paymentTypes, id);

export const paymentTypeServices = Object.freeze(
  Object.seal({
    get: getPaymentTypesService,
    getById: getByIdPaymentTypesService,
    create: createPaymentTypeService,
    edit: editPaymentTypeService,
    delete: deletePaymentTypeService,
  })
);
