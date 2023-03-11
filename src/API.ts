import axios from 'axios';
import { AxiosResponse } from "axios";

import config from "./constants/Config";
import * as paramTypes from "apiParamTypes";

axios.defaults.baseURL = `${config.backend.jpcoreUrl}/`;
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';

const getPromiseRejection = (error: any): Promise<any> => {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    return Promise.reject(error.response);
  } else if (error.request) {
    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser 
    // and an instance of http.ClientRequest in node.js
    return Promise.reject(error.request);
  }
  // Something happened in setting up the request that triggered an Error
  return Promise.reject(error);
}

async function getRadicalsList(params: paramTypes.RadicalsListParams = {}): Promise<AxiosResponse<any>> {
  try {
    return await axios.get('krad/radicals/', { params });
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

async function getMatchingKDKanjiByRadicals(radicals: string[], params: paramTypes.MatchingKanjiByRadicalsParams = {}): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/radicals/${radicals.join(",")}/kanji/`, { params });
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

async function getRelatedRadicalsByRadicals(radicals: string[], params: paramTypes.RelatedRadicalsParams = {}): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/radicals/${radicals.join(",")}/kanji/`, { params });
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

async function getKDKanjiByKanji(kanji: string): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/kanji/${kanji}/`);
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

async function getKDKanjiBySkipcode(skip:string, params: paramTypes.KDKanjiBySkipcodeParams = {}): Promise<AxiosResponse<any, any>> {
  try {
    return await axios.get(`kanjidic/kanji/skipcode/${skip}/`, { params });
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

async function getKDKanjiRandom(params: paramTypes.KDKanjiRandomParams = {}): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/random/`, { params });
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

async function getJMdictEntryByKanji(kanji: string): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`jmdict/kanji/${kanji}/`);
  } catch (error: any) {
    return getPromiseRejection(error);
  }
}

const API = {
  getRadicalsList,
  getMatchingKDKanjiByRadicals,
  getRelatedRadicalsByRadicals,
  getKDKanjiByKanji,
  getKDKanjiBySkipcode,
  getKDKanjiRandom,
  getJMdictEntryByKanji,
};

export default API;
