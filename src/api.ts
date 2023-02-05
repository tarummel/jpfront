import axios from 'axios';
import { AxiosResponse } from "axios";

// e.g. http://localhost:8008/api
const JPCORE_URL = process.env.REACT_APP_JPCORE_URL as string

axios.defaults.baseURL = JPCORE_URL;
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';

function buildUrl(path: string): string {
  return `${JPCORE_URL}/${path}`;
}

async function getRadicalsList(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(buildUrl('radicals/'));
    return response.data;
  } catch (error: any) {
    throw new Error(`Axios - Error with getRadicalsList: ${error.message}`);
  }
}

async function getRadicalsSimplified(): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl('radicals'), { params: { option: 'by_stroke_count' }});
  } catch (error: any) {
    throw new Error(`Axios - Error with getRadicalsSimplified: ${error.message}`);
  }
}

async function getMatchingKanjiByRadical(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`radicals/${radicals.join(",")}/kanji`));
  } catch (error: any) {
    throw new Error(`Axios - Error with getMatchingKanjiByRadical: ${error.message}`)
  }
}

async function getMatchingKanjiByRadicalSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(buildUrl(`radicals/${radicals.join(",")}/kanji`), { params: { option: 'by_stroke_count' }});
  } catch (error: any) {
    throw new Error(`Axios - Error with getRadicalsSimplified: ${error.message}`);
  }
}

const API = {
  getRadicalsList,
  getRadicalsSimplified,
  getMatchingKanjiByRadical,
  getMatchingKanjiByRadicalSimplified,
};

export default API;
