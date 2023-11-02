import { ReducerWithoutAction, useEffect, useReducer, useState } from "react";
import { getMatchingKDKanjiByRadicals, getRelatedRadicalsByRadicals } from "../../API";
import { MatchingKanjiByRadicalsParams, RelatedRadicalsParams } from "apiParamTypes";
import { getErrorMessage } from "./helpers_funcs";

export interface State<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

enum ACTION_TYPES {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type Action<T> = 
    { type: ACTION_TYPES.LOADING, isLoading: true } | 
    { type: ACTION_TYPES.SUCCESS, data: T } | 
    { type: ACTION_TYPES.ERROR, isError: true }



// const INITIAL_STATE = {
//     data: null,
//     isLoading: false,
//     isError: false,
// };

const createReducer = <T>() => (state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case ACTION_TYPES.LOADING:
      return { ...state, isLoading: true };
    case ACTION_TYPES.SUCCESS:
      return { ...state, data: action.data, isLoading: false };
    case ACTION_TYPES.ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error(`Reducer Action not supported`);
  }
};

export function useFetchRelatedKanji<T>(selectedRadicals: string[], in) {
  // const [state, setState] = useState({ data: null, isLoading: false, isError: false });
  const reducer = createReducer<T>();
  const [state, dispatch] = useReducer(reducer, { data: {}, isLoading: false, isError: false });

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.LOADING, isLoading: true });

    const controller = new AbortController();

    const getAndSetMatchingKanji = async () => {
      const params = { simple: true } as MatchingKanjiByRadicalsParams;
      try {
        const response = await getMatchingKDKanjiByRadicals(selectedRadicals, params, controller.signal);
        dispatch({ type: ACTION_TYPES.SUCCESS, data: response.data.data});
      } catch (e: unknown) {
        console.log(getErrorMessage(e));
        dispatch({ type: ACTION_TYPES.ERROR, isError: true });   
      }
    };
    
    getAndSetMatchingKanji();
    
    return () => {
      controller.abort();
    };
  }, [selectedRadicals]);

  return [state.data, state.isLoading, state.isError];
}

export function useFetchDisabledRadicals(selectedRadicals: string[]) {
  const reducer = createReducer<T>();
  const [state, dispatch] = useReducer(reducer, { data: {}, isLoading: false, isError: false });

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.LOADING, isLoading: true });

    const controller = new AbortController();

    const getAndSetMatchingKanji = async () => {
      const params = { simple: true } as MatchingKanjiByRadicalsParams;
      try {
        const params = { simple: true, invert: true } as RelatedRadicalsParams;
        const response = await getRelatedRadicalsByRadicals(selectedRadicals, params, controller.signal);
        dispatch({ type: ACTION_TYPES.SUCCESS, data: response.data.data});
      } catch (e: unknown) {
        console.log(getErrorMessage(e));
        dispatch({ type: ACTION_TYPES.ERROR, isError: true });   
      }
    };
    
    getAndSetMatchingKanji();
    
    return () => {
      controller.abort();
    };
  }, [selectedRadicals]);

  return [state.data, state.isLoading, state.isError];
}

// export function useRelatedKanji(selectedRadicals: string[]) {
//     const [state, setState] = useState({ data: null, isLoading: false, isError: false });

//     useEffect(() => {
//         setState(prev => {
//             return { ...prev, isLoading: true };
//         });

//         const controller = new AbortController();

//         const getAndSetMatchingKanji = async () => {
//             const params = { simple: true } as MatchingKanjiByRadicalsParams;
//             try {
//                 const response = await getMatchingKDKanjiByRadicals(selectedRadicals, params, controller.signal);
//             } catch (e: unknown) {
//                 console.log(getErrorMessage(e));
//                 setState({ data: null, isLoading: false, isError: true });
//             }
//         };
    
//         getAndSetMatchingKanji();
    
//         return () => {
//             controller.abort();
//         };
//     }, [selectedRadicals]);
// };

export function useDisabledKanji(selectedRadicals: string[]) {

  const [state, setState] = useState({ data: null, isLoading: false, isError: false });

  useEffect(() => {
    setState(prev => {
      return { ...prev, isLoading: true };
    });

    const controller = new AbortController();
        
    const getAndSetDisabledRadicals = async () => {
      const params = { simple: true, invert: true } as RelatedRadicalsParams;
      try {
        const response = await getRelatedRadicalsByRadicals(selectedRadicals, params, controller.signal);                
        setState({ data: response.data.data, isLoading: false, isError: true });
      } catch (e: unknown) {
        console.log(getErrorMessage(e));
        setState({ data: null, isLoading: false, isError: true });
      }
    };

    getAndSetDisabledRadicals();

    return () => {
      controller.abort();
    };
  }, [selectedRadicals]);
}