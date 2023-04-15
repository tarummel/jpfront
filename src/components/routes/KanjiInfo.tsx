
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import API from "../../API";
import { Anchor, Tooltip } from "../common";
import Config from "../../constants/Config";
import { JEntry } from "jmdict";
import { KDKanji } from "kanjidic";
import JMdictEntry from "../JMdictEntry";
import LicenseAgreement from "../LicenseAgreement";


const Body = styled.div`
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-width: 1024px;
  overflow-y: scroll;
  padding: 10px;
  scrollbar-width: none;
  width: 50%;
  -ms-overflow-style: none;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  width: 160px;
  flex-shrink: 0;
`;

const GiantStamp = styled.h1`
  background: ${({theme}) => theme.colors.textPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
  font-size: 120px;
  line-height: 160px;
  height: 160px;
  text-align: center;
  width: 100%;
`;

const MetaTable = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  column-gap: 6px;
  display: grid;
  grid-template-columns: auto auto;
  padding-top: 10px;
  row-gap: 1px;
  text-align: end;
  
  div {
    font-size: ${({theme}) => theme.fontSizes.medium};
  }
`;

const ExtLinksTable = styled.ul`
  margin: 10px auto;
  background: ${({theme}) => theme.colors.elementPrimary};
  padding: 10px;
  border-radius: 5px;
  
  li {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
    word-break: keep-all;
  }
`;

const RightContainer = styled.div`
  width: 100%;
`;

const EntryContainer = styled.div`
  display: grid;
  row-gap: 10px;
`;

const KanjiInfo: React.FC<WithTranslation> = ({ t }) => {
  const { kanjiParam } = useParams();
  const [jmLoading, setJmLoading] = useState(true);
  const [kdLoading, setKdLoading] = useState(true);
  const [entry, setEntry] = useState<JEntry[]>([]);
  const [kdk, setKdk] = useState<KDKanji>();

  useEffect(() => {
    document.title = `${t("kanjiInfo.documentTitleKanji", { kanji: kanjiParam })}` || t("kanjiInfo.documentTitleKanji");
  }, []);

  useEffect(() => {
    const getAndSetEntry = async (kanji: string) => {
      const response = await API.getJMdictEntryByKanji(kanji);
      setEntry(response.data.data);
      setJmLoading(false);
    };
    
    const getAndSetKDKanji = async (kanji: string) => {
      const response = await API.getKDKanjiByKanji(kanji);
      setKdk(response.data.data);
      setKdLoading(false);
    };

    if (typeof kanjiParam !== "string" || kanjiParam.length !== 1) {
      return;
    }

    getAndSetEntry(kanjiParam).catch((e) => {
      console.log(getAndSetEntry.name, e);
    });
    getAndSetKDKanji(kanjiParam).catch((e) => {
      console.log(getAndSetKDKanji.name, e);
    });

    // get and set this page's kanji into the localStorage history
    const localHistory = localStorage.getItem(Config.localStorage.history);
    if (typeof localHistory === "string") {

      let historyArray = JSON.parse(localHistory);
      if (!historyArray.includes(kanjiParam)) {

        historyArray.push(kanjiParam);
        const historySize = localStorage.getItem(Config.localStorage.historySize) || Config.localStorage.historySizeDefault;
        if (historyArray.length > historySize) {
          // toss the oldest elements first
          historyArray = historyArray.slice(-historySize);
        }
        localStorage.setItem(Config.localStorage.history, JSON.stringify(historyArray));
      }
    } else {
      localStorage.setItem(Config.localStorage.history, JSON.stringify([kanjiParam]));
    }
  }, [kanjiParam]);

  // Kanjidic info
  const unicode = kdk?.codepoint?.[0].ucs || kanjiParam?.charCodeAt(0) || "n/a";
  const grade = kdk?.misc?.[0].grade || "n/a";
  const jlpt = kdk?.misc?.[0].jlpt || "n/a";
  const strokes = kdk?.misc?.[0].strokes || "n/a";
  const frequency = kdk?.misc?.[0].frequency || "n/a";
  const skip = kdk?.querycode?.[0].skip || "n/a";
  const onyomi = kdk?.reading?.[0].ja_on || "n/a";
  const kunyomi = kdk?.reading?.[0].ja_kun?.join("; ") || "n/a";

  // Meta info table fields
  const fieldSuffix = ": ";
  const onyomiName = `${t("kanjiInfo.onyomi")}${fieldSuffix}`;
  const kunyomiName = `${t("kanjiInfo.kunyomi")}${fieldSuffix}`;
  const strokesName = `${t("kanjiInfo.strokes")}${fieldSuffix}`;
  const skipName = `${t("kanjiInfo.skip")}${fieldSuffix}`;
  const gradeName = `${t("kanjiInfo.grade")}${fieldSuffix}`;
  const jlptName = `${t("kanjiInfo.jlpt")}${fieldSuffix}`;
  const freqName = `${t("kanjiInfo.freq")}${fieldSuffix}`;
  const ucsName = `${t("kanjiInfo.ucs")}${fieldSuffix}`;

  const externalLinkPrefix = "--> ";

  return (
    <Body>
      { jmLoading && kdLoading
        ? null
        :
        <>
          <LeftContainer>
            <GiantStamp>{kanjiParam}</GiantStamp>
            <MetaTable>
              <Tooltip name={onyomiName}>{t("kanjiInfo.onyomiHint")}</Tooltip>
              <div>{onyomi}</div>
              <Tooltip name={kunyomiName}>{t("kanjiInfo.kunyomiHint")}</Tooltip>
              <div>{kunyomi}</div>
              <Tooltip name={strokesName}>{t("kanjiInfo.strokesHint")}</Tooltip>
              <div>{strokes}</div>
              <Tooltip name={skipName}>{t("kanjiInfo.skipHint")}</Tooltip>
              <div>{skip}</div>
              <Tooltip name={gradeName}>{t("kanjiInfo.gradeHint")}</Tooltip>
              <div>{grade}</div>
              <Tooltip name={jlptName}>{t("kanjiInfo.jlptHint")}</Tooltip>
              <div>{jlpt}</div>
              <Tooltip name={freqName}>{t("kanjiInfo.freqHint")}</Tooltip>
              <div>{frequency}</div>
              <Tooltip name={ucsName}>{t("kanjiInfo.ucsHint")}</Tooltip>
              <div>{unicode}</div>
            </MetaTable>
            <ExtLinksTable>
              <li>{t("kanjiInfo.externalLinks")}</li>
              <li>
                {externalLinkPrefix}<Anchor target="_blank" href={`${t("kanjiInfo.wiktionaryLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.wiktionary")}</Anchor>
              </li>
              <li>
                {externalLinkPrefix}<Anchor target="_blank" href={`${t("kanjiInfo.jishoLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.jisho")}</Anchor>
              </li>
              <li>
                {externalLinkPrefix}<Anchor target="_blank" href={`${t("kanjiInfo.wwwjdicLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.wwwjdic")}</Anchor>
              </li>
              <li>
                {externalLinkPrefix}<Anchor target="_blank" href={`${t("kanjiInfo.deeplLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.deepl")}</Anchor>
              </li>
            </ExtLinksTable>
          </LeftContainer>
          <RightContainer>
            <EntryContainer>
              { entry && (entry.map((e, i) => {
                return (
                  <JMdictEntry key={i} entry={e} num={i+1} />
                );
              }))}
            </EntryContainer>
            <LicenseAgreement krad={true} jmdict={true} />
          </RightContainer>
        </>
      }
    </Body>
  );
};

export default withTranslation()(KanjiInfo);
