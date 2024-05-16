import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "@utils/BaseUrl";
import { AppPaths, Paths } from "@constants";
import { LSTokenName } from "@utils/LocaStorage";
import { QueryToString } from "@functions";
import { history } from "./history";

const instance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token: string | null = localStorage.getItem(LSTokenName) || null;
  const updatedConfig: Record<string, unknown> = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token?.slice(1, -1)}`,
    },
  };
  return updatedConfig;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    switch (error?.response?.status) {
      case 400:
        toast.error(error?.response?.statusText);
        break;
      case 401:
        localStorage.removeItem(LSTokenName);
        history.push(Paths.login);
        toast.error(error?.response?.statusText);
        break;
      case 403:
        history.push(Paths.notFound);
        break;
      case 404:
      case 405:
        toast.error(error?.response?.statusText);
        break;
      case 500:
        localStorage.removeItem(LSTokenName);
        history.push(Paths.login);
        toast.error("Ошибка на стороне сервера");
        break;
      default:
        if (Object.values(AppPaths).includes(history.location.pathname)) {
          history.push(Paths.connectionError);
        } else {
          toast.error("Ошибка подключения к серверу");
        } 
    }
    return Promise.reject(error);
  }
);

const requestGET = (url: string, params?: any) =>
  instance.get(url + "?" + QueryToString(params));

const requestPOST = (url: string, body?: any) => instance.post(url, body);

const requestPUT = (url: string, body?: any, id?: string) =>
  instance.put(url + "/" + id, body);

const requestDELETE = (url: string, id?: string) =>
  instance.delete(url + "/" + id);

export { requestGET, requestPOST, requestPUT, requestDELETE };
