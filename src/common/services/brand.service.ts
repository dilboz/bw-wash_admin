import { requestDELETE, requestGET, requestPOST } from "@utils/axios";
import { Api } from "@constants";

const getBrandsService = () => requestGET(Api.brand);

const createBrandService = (body: FormData) => requestPOST(Api.brand, body);

const deleteBrandService = (id: string) => requestDELETE(Api.brand, id);

export const brandServices = Object.freeze(
  Object.seal({
    get: getBrandsService,
    create: createBrandService,
    delete: deleteBrandService,
  })
);
