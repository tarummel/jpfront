declare module 'dataTypes' {
  // the stroke count bucket followed by a list of corresponding kanji
  // must be a list because javascript & unicode surrogate pair kanji shenanigans
  interface StrokeCharactersMap {
    [strokeCountBucket: string]: string[];
  }
  
  // kanji with a integer value to control state
  // aka 0 = disabled, 1 = unselected, 2 = selected
  interface RadicalsState {
    [radical: string]: number;
  }

  // related Kanji followed by the corresponding closeness rating as a stringified float
  type VisualClosenessTupleArray = Array<[string, string]>;
}
  
module.exports = {
  StrokeCharactersMap,
  RadicalsState,
  VisualClosenessTupleArray,
};
