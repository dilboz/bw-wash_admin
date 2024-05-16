import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from "@utils/axios";
import { Api } from "@constants";
import { IProductsParams } from "@interfaces";

const getProductService = (params: IProductsParams) =>
  requestGET(Api.product + "/filtration", { ...params, pageSize: 7 });

const getProductByIdService = (id: string) =>
  requestGET(Api.product + "/" + id);

const create = (body: FormData) => requestPOST(Api.product, body);

const deleteProduct = (id: string) => requestDELETE(Api.product, id);

const editProduct = (body: FormData, id: string) =>
  requestPUT(Api.product, body, id);

export const productServices = Object.freeze(
  Object.seal({
    get: getProductService,
    getById: getProductByIdService,
    create: create,
    delete: deleteProduct,
    edit: editProduct,
  })
);
