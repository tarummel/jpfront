import axios from 'axios';
import { AxiosResponse } from "axios";
import internal from 'stream';

// e.g. localhost:8008/api
const JPCORE_URL = process.env.JPCORE_URL as string

interface RadicalsListResponse {
  data: {
    number?: number;
    radical: string;
    meaning: string;
    Reading: string;
    position?: string;
    frequency: number;
    notes?: string;
  }
}

interface SimplifiedRadicalsListResponse {
  data: Map<string, Array<string>>;
}

// interface KanjiResponse {
//   data: {
//     jentry: {
//       jkanji: {
//         [
//           content: string
//           information: string;
//           restrictions?: string;
//         ]
//       }
//       jreading: {

//       }
//       jsense: {

//       }
//     }
//   }
// }

function buildUrl(path: string): string {
  return `${JPCORE_URL}/${path}`;
}

async function getRadicalsList(): Promise<AxiosResponse<RadicalsListResponse>> {
  try {
    const response = await axios.get(buildUrl('radicals/'));
    return response.data;
  } catch (error: any) {
    throw new Error(`Axios - Error with getRadicalsList: ${error.message}`);
  }
}

async function getRadicalsSimplified(): Promise<AxiosResponse<SimplifiedRadicalsListResponse>> {
  try {
    const response = await axios.get(buildUrl('radicals'), { params: { option: 'strokes' }})
    return response.data
  } catch (error: any) {
    throw new Error(`Axios - Error with getRadicalsSimplfied: ${error.message}`);
  }
}



export default {
  getRadicalsList,
  getRadicalsSimplified,
}
