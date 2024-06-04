import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
  requestUpdate,
} from "@utils/axios";
import { Api } from "@constants";

const getCategorysService = () => requestGET(Api.categories + "/admin");

const getPopularCategorysService = () => requestGET(Api.popularCategories);

const createCategoryService = (body: FormData) =>
  requestPOST(Api.categories, body);

const editCategoryService = (body: FormData, id: string) =>
  requestPUT(Api.categories, body, id);

const deleteCategoryService = (id: string) => requestDELETE(Api.categories, id);

const updateCategoryStatus = ({ id, visibility }: any) =>
  requestUpdate(Api.categories + "/" + id + "/status/" + visibility);

export const categoryServices = Object.freeze(
  Object.seal({
    get: getCategorysService,
    getPopular: getPopularCategorysService,
    create: createCategoryService,
    edit: editCategoryService,
    delete: deleteCategoryService,
    update: updateCategoryStatus
  })
);
