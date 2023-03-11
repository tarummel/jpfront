declare module 'dataTypes' {
  interface StrokeCharactersMap {
    [strokeCountBucket: string]: string[];
  }
  
  // 0 = disabled, 1 = unselected, 2 = selected
  interface RadicalsState {
    [radical: string]: number;
  }
}
  
module.exports = {
  StrokeCharactersMap,
  RadicalsState,
};
