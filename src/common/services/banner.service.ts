import { requestDELETE, requestGET, requestPOST } from "@utils/axios";
import { Api } from "@constants";

const getBannersService = () => requestGET(Api.banner);

const createBannerService = (body: FormData) => requestPOST(Api.banner, body);

const deleteBannerService = (id: string) => requestDELETE(Api.banner, id);

export const bannerServices = Object.freeze(
  Object.seal({
    get: getBannersService,
    create: createBannerService,
    delete: deleteBannerService,
  })
);
