declare module 'apiParamTypes' {
  interface RadicalsListParams {
    simple?: boolean;
  }
  
  interface MatchingKanjiByRadicalsParams {
    simple?: boolean;
  }
  
  interface RelatedRadicalsParams {
    simple?: boolean;
    invert?: boolean;
  }
  
  interface KDKanjiRandomParams {
    kanjiOnly?: boolean;
  }
  
  interface KDKanjiBySkipcodeParams {
    main_range?: number;
    sub_range?: number;
    simple?: boolean;
  }
}

module.exports = {
  RadicalsListParam,
  MatchingKanjiByRadicalsParams,
  RelatedRadicalsParams,
  KDKanjiRandomParams,
  KDKanjiBySkipcodeParams,
};
