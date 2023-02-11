declare module 'dataTypes' {

  interface StrokeCharactersMap {
      [strokeCountBucket: string]: string[];
    }
    
    // 0 = disabled, 1 = unselected, 2 = selected
    interface RadicalsState {
      [radical: string]: number;
    }

    interface JEntry {
      jkanji?: [JKanji];
      jreading?: [JReading];
      jsense?: [JSense];
    }

    interface JKanji {
      content?: string;
      information?: string;
      priorities?: string[];
    }

    interface JReading {
      content?: string;
      information?: string;
      proprities?: string;
      restrictions?: string;
      priorities?: string[];
    }

    interface JSense {
      xreferences?: string[];
      antonyms?: string[];
      parts_of_speech?: string[];
      fields?: string[];
      misc?: string[];
      dialects?: string[];
      information?: string;
      jglossary?: [JGlossary];
      jsource?: [JSource];
    }

    interface JGlossary {
      gloss?: string;
      language?: string;
      type?: string;
    }

    interface JSource {
      content?: string;
      language?: string;
      partial?: boolean;
      waseieigo?: boolean;
    }
  }
  
module.exports = {
  StrokeCharactersMap,
  RadicalsState,
  JEntry,
  JKanji,
  JReading,
  JSense,
  JGlossary,
  JSource,
};
  