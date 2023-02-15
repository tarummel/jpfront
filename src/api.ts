import axios from 'axios';
import { AxiosResponse } from "axios";

import config from "./constants/Config";

// e.g. http://localhost:8008/api
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';

function buildUrl(path: string): string {
  return `${config.backend.jpcoreUrl}/${path}`;
}

async function getRadicalsList(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(buildUrl('radicals/'));
    return response.data;
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

async function getRadicalsSimplified(): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl('radicals/'), { params: { simple: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

async function getMatchingKanjiByRadical(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`radicals/${radicals.join(",")}/kanji/`));
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

async function getMatchingKanjiByRadicalSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`radicals/${radicals.join(",")}/kanji/`), { params: { simple: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

async function getRelatedRadicalsSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`radicals/${radicals.join(",")}/related/`), { params: { simple: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

async function getInvertedRadicalsSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`radicals/${radicals.join(",")}/related/`), { params: { simple: true, invert: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

async function getKanjiInfo(kanji: string): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`kanji/${kanji}/`));
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error;
  }
}

const API = {
  getRadicalsList,
  getRadicalsSimplified,
  getMatchingKanjiByRadical,
  getMatchingKanjiByRadicalSimplified,
  getRelatedRadicalsSimplified,
  getInvertedRadicalsSimplified,
  getKanjiInfo,
};

export default API;
