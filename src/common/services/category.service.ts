import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from "@utils/axios";
import { Api } from "@constants";

const getCategorysService = () => requestGET(Api.categories);

const getPopularCategorysService = () => requestGET(Api.popularCategories);

const createCategoryService = (body: FormData) =>
  requestPOST(Api.categories, body);

const editCategoryService = (body: FormData, id: string) =>
  requestPUT(Api.categories, body, id);

const deleteCategoryService = (id: string) => requestDELETE(Api.categories, id);

export const categoryServices = Object.freeze(
  Object.seal({
    get: getCategorysService,
    getPopular: getPopularCategorysService,
    create: createCategoryService,
    edit: editCategoryService,
    delete: deleteCategoryService,
  })
);
