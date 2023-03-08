import axios from 'axios';
import { AxiosResponse } from "axios";

import config from "./constants/Config";


interface KDKanjiBySkipcodeParams {
  main_range?: number;
  sub_range?: number;
  simple?: boolean;
}

// e.g. http://localhost:8008/api
axios.defaults.baseURL = `${config.backend.jpcoreUrl}/`;
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';

async function getRadicalsList(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get('krad/radicals/');
    return response.data;
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getRadicalsSimplified(): Promise<AxiosResponse<any>> {
  try {
    return await axios.get('krad/radicals/', { params: { simple: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getMatchingKanjiByRadical(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`krad/radicals/${radicals.join(",")}/kanji/`);
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getMatchingKanjiByRadicalSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/radicals/${radicals.join(",")}/kanji/`, { params: { simple: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getRelatedRadicalsSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`krad/radicals/${radicals.join(",")}/related/`, { params: { simple: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getInvertedRadicalsSimplified(radicals: string[]): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`krad/radicals/${radicals.join(",")}/related/`, { params: { simple: true, invert: true }});
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getJMdictEntryByKanji(kanji: string): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`jmdict/kanji/${kanji}/`);
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getKDKanjiByKanji(kanji: string): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/kanji/${kanji}/`);
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getKDKanjiRandom(kanjiOnly:boolean = false): Promise<AxiosResponse<any>> {
  try {
    return await axios.get(`kanjidic/random/`, { params: (kanjiOnly ? { kanji_only: true } : {}) });
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

async function getKDKanjiBySkipcode(skip:string, main:number = 0, sub:number = 0, simple:boolean = false): Promise<AxiosResponse<any>> {
  const params = as KDKanjiBySkipcodeParams{}
  if (main) { params.main_range = main };
  if (sub) { params.sub_range = sub };
  if (simple) { params.simple = simple };

  try {
    return await axios.get(`kanjidic/kanji/skipcode/${skip}/`, { params });
  } catch (error: any) {
    console.log(error.code, error.message)
    throw error
  }
};

const API = {
  getRadicalsList,
  getRadicalsSimplified,
  getMatchingKanjiByRadical,
  getMatchingKanjiByRadicalSimplified,
  getRelatedRadicalsSimplified,
  getInvertedRadicalsSimplified,
  getJMdictEntryByKanji,
  getKDKanjiByKanji,
  getKDKanjiRandom,
  getKDKanjiBySkipcode,
};

export default API;
