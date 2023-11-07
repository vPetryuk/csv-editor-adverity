import {API_METHODS, ApiRequestPayload} from "./types";
import axios from 'axios';
import {apiUrl} from "../constants/constants";

const SUCCESS_STATUSES: Array<number> = [200, 201, 202, 203, 204];

export const api = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export const apiFormData = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const apiRequest = async ({
  url,
  method,
  params,
  body: data,
}: ApiRequestPayload): Promise<any> => {
  let urlPath: string = url;

  if (params) {
    urlPath += `?${params}`;
  }

  let payload: Record<string, any> = {};

  switch (method) {
    case API_METHODS.GET:
      payload = await api.get(urlPath);
      break;
    case API_METHODS.POST:
      payload = await api.post(urlPath, data);
      break;
    case API_METHODS.POST_FORM_DATA:
      payload = await apiFormData.post(urlPath, data);
      break;
    case API_METHODS.DELETE:
      payload = await api.delete(urlPath, { data });
      break;
    case API_METHODS.PUT:
      payload = await api.put(urlPath, data);
      break;
    case API_METHODS.PATCH:
      payload = await api.patch(urlPath, data);
      break;
  }

  // handling errors
  if (!SUCCESS_STATUSES.includes(payload.status)) {

    return {
      error: true,
      msg: `Error: ${payload.status} ${
        payload.statusText ? payload.statusText : 'Something went wrong'
      }`,
      desc: payload.data,
    };
  }

  return payload.data;
};
