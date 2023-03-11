declare module "kanjidic" {
  interface KDKanji {
    kanji: string;
    codepoint?: [KDCodePoint];
    radical?: [KDRadical];
    misc?: [KDMisc];
    variant?: [KDVariant];
    index?: [KDIndex];
    querycode?: [KDQueryCode];
    reading?: [KDReading];
    meaning?: [KDMeaning];
  }

  interface KDCodePoint {
    ucs?: string;
    jis208?: string;
    jis212?: string;
    jis213?: string;
  }

  interface KDRadical {
    classical?: string;
    nelson?: string;
  }

  interface KDMisc {
    jlpt?: string;
    grade?: string;
    strokes?: string;
    frequency?: string;
    radical_names?: [string];
  }

  interface KDVariant {
    deroo?: string;
    jis208?: string;
    jis212?: string;
    jis213?: string;
    nelson_c?: string;
    halpern_njecd?: string;
    oneill?: string;
    sh?: string;
  }

  interface KDIndex {
    busy_people?: string;
    crowley?: string;
    gakken?: string;
    halpern_kkd?: string;
    halpern_kkld?: string;
    halpern_kkld_2nd?: string;
    halpern_njecd?: string;
    henshall?: string;
    henshall3?: string;
    heisig?: string;
    heisig6?: string;
    jf_cards?: string;
    kanji_in_context?: string;
    kodansha_compact?: string;
    maniette?: string;
    moro?: string;
    moro_volume?: string;
    moro_page?: string;
    nelson_c?: string;
    nelson_n?: string;
    oneill_names?: string;
    oneill_kk?: string;
    sakade?: string;
    sh_kk?: string;
    sh_kk2?: string;
    tutt_cards?: string;
  }

  interface KDQueryCode {
    skip?: string;
    sh_descriptor?: string;
    four_corner?: string;
    deroo?: string;
    misclass_pos?: string;
    misclass_strokes?: string;
    misclass_strokes_diff?: string;
    misclass_strokes_pos?: string;
  }

  interface KDReading {
    ja_on?: [string];
    ja_kun?: [string];
  }

  interface KDMeaning {
    en?: string;
  }
}

module.exports = {
  KDKanji,
  KDCodePoint,
  KDRadical,
  KDMisc,
  KDVariants,
  KDIndex,
  KDQueryCode,
  KDReading,
  KDMeaning,
};
