declare module "jmdict" {
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
};

module.exports = {
  JEntry,
  JKanji,
  JReading,
  JSense,
  JGlossary,
  JSource,
};
