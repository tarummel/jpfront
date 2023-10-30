
import axios, { AxiosResponse } from "axios";

import config from "./constants/Config";
import * as paramTypes from "apiParamTypes";
import { getErrorMessage } from "./components/utils/helpers_funcs";

const API = axios.create({
  baseURL: config.backend.jpcoreUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 20 * 1000,
});

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

// const getPromiseRejection = (error: any): Promise<never> => {
//   if (error.response) {
//     return Promise.reject(error.response);
//   } else if (error.request) {
//     return Promise.reject(error.request);
//   }
//   return Promise.reject(getErrorMessage(error));
// };

function getAPIError(error: unknown): string {
  let status = 500;
  let message = 'Internal API Error';

  if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
    if (error.response && typeof error.response.data === 'object') {
      console.error('Error in Response:', error.response);
      status = error.response.status;
      message = error.response.data.message;
    } else if (error.request && typeof error.request.data === 'object') {
      console.error('Error in Request:', error.request);
      status = error.request.status;
      message = error.request.data.message;
    } else {
      message = getErrorMessage(error);
      console.error('Axios API error:', message);
    }
  } else {
    message = getErrorMessage(error);
    console.error('General API error:', message);
  }

  return JSON.stringify({ status, message });
}

API.interceptors.response.use(
  response => response,
  error => { 
    throw new Error(getAPIError(error));
  });

export default API;

async function getRadicalsList(params: paramTypes.RadicalsListParams = {}): Promise<AxiosResponse<any, any>> {
  return await API.get('krad/radicals/', { params });
}

async function getMatchingKDKanjiByRadicals(radicals: string[], params: paramTypes.MatchingKanjiByRadicalsParams = {}, signal: AbortSignal): Promise<AxiosResponse<any, any>> {
  return await API.get(`kanjidic/radicals/${radicals.join(",")}/kanji/`, { signal, params });
}

async function getRelatedRadicalsByRadicals(radicals: string[], params: paramTypes.RelatedRadicalsParams = {}, signal: AbortSignal): Promise<AxiosResponse<any, any>> {
  return await API.get(`krad/radicals/${radicals.join(",")}/related/`, { signal, params });
}

async function getKDKanjiByKanji(kanji: string): Promise<AxiosResponse<any, any>> {
  return await API.get(`kanjidic/kanji/${kanji}/`);
}

async function getKDKanjiBySkipcode(skip: string, params: paramTypes.KDKanjiBySkipcodeParams = {}, signal: AbortSignal): Promise<AxiosResponse<any, any>> {
  return await API.get(`kanjidic/kanji/skipcode/${skip}/`, { signal, params });
}

async function getVisualClosenessByKanji(kanji: string, params: paramTypes.VisualClosenessByKanjiParams = {}): Promise<AxiosResponse<any, any>> {
  return await API.get(`kanjidic/kanji/${kanji}/visualcloseness/`, { params });
}

async function getKDKanjiRandom(params: paramTypes.KDKanjiRandomParams = {}): Promise<AxiosResponse<any, any>> {
  return await API.get(`kanjidic/random/`, { params });
}

async function getJMdictEntryByKanji(kanji: string): Promise<AxiosResponse<any, any>> {
  return await API.get(`jmdict/kanji/${kanji}/`);
}

export {
  getRadicalsList,
  getMatchingKDKanjiByRadicals,
  getRelatedRadicalsByRadicals,
  getKDKanjiByKanji,
  getKDKanjiBySkipcode,
  getVisualClosenessByKanji,
  getKDKanjiRandom,
  getJMdictEntryByKanji,
};
