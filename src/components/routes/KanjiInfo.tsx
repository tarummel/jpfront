
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import API from "../../API";
import Anchor from "../common/Anchor";
import Config from "../../constants/Config";
import { JEntry } from "jmdict";
import { KDKanji } from "kanjidic";
import HorizontalDivider from "../common/HorizontalDivider";
import JMdictEntry from "../JMdictEntry";
import Spinner from "../common/Spinner";

  
const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 2.5%;
`;

const ContentContainer = styled.div`
  flex: 1;
  background: ${({theme}) => theme.colors.elementPrimary};
  padding: 8px;
  overflow-y: scroll;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const KanjiSymbol = styled.h1`
  background: ${({theme}) => theme.colors.textPrimary};
  color: ${({theme}) => theme.colors.textNegative};
  font-size: 64px;
  padding: 0px 20px 0px;
  margin: 10px;
`;

const MiscInformation = styled.div`
  div {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
  }
`;

const ExternalLinks = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding: 16px;

  div {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 40px;
  width: 500px;

  div {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.xlarge};
  }
`;

const KanjiInfo: React.FC<WithTranslation> = ({ t }) => {
  const { kanjiParam } = useParams();
  const [error, setError] = useState("");
  const [entry, setEntry] = useState<JEntry[]>([]);
  const [kdk, setKdk] = useState<KDKanji>();

  useEffect(() => {
    const getAndSetEntry = async (kanji: string) => {
      try {
        const response = await API.getJMdictEntryByKanji(kanji)
        setEntry(response.data.data)  
      } catch (error: any) {
        switch (error.response.status) {
          case 400:
            setError("" + t("kanjiInfo.error400"))
            break
          case 404:
            setError("" + t("kanjiInfo.error404"))
            break
          default:
            setError(error.message)
        }
      }
    }
    
    const getAndSetKDKanji = async (kanji: string) => {
      try {
        const response = await API.getKDKanjiByKanji(kanji)
        setKdk(response.data.data)  
      } catch (error: any) {
        console.log(error)
      }
    }

    if (typeof kanjiParam !== "string" || kanjiParam.length !== 1) {
      return
    }

    getAndSetEntry(kanjiParam)
    getAndSetKDKanji(kanjiParam)

    const localHistory = localStorage.getItem(Config.localStorage.history)
    if (typeof localHistory === "string") {

      let historyArray = JSON.parse(localHistory)
      if (!historyArray.includes(kanjiParam)) {

        historyArray.push(kanjiParam)
        const historySize = localStorage.getItem(Config.localStorage.historySize) || Config.localStorage.historySizeDefault
        if (historyArray.length > historySize) {
          historyArray = historyArray.slice(-historySize)
        }
        localStorage.setItem(Config.localStorage.history, JSON.stringify(historyArray));
      }
    } else {
      localStorage.setItem(Config.localStorage.history, JSON.stringify([kanjiParam]));
    }
    
  }, [kanjiParam, t]);

  const unicode = kdk?.codepoint?.[0].ucs || ""
  const grade = kdk?.misc?.[0].grade || ""
  const jlpt = kdk?.misc?.[0].jlpt || ""
  const strokes = kdk?.misc?.[0].strokes || ""
  const frequency = kdk?.misc?.[0].frequency || ""
  const onyomi = kdk?.reading?.[0].ja_on || ""
  const kunyomi = kdk?.reading?.[0].ja_kun || ""

  return (
    <Page>
      <ContentContainer>
        <MetaContainer>
          <KanjiSymbol>{kanjiParam}</KanjiSymbol>
          <MiscInformation>
            <div>Unicode: {unicode}</div>
            <div>Grade: {grade}</div>
            <div>JLPT: {jlpt}</div>
            <div>Strokes: {strokes}</div>
            <div>Freq: {frequency}</div>
          </MiscInformation>
          <ExternalLinks>
            <div>{t("kanjiInfo.externalLinks")}:</div>
            <div>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wiktionaryLink", { kanjiParam })}`}>{t("kanjiInfo.wiktionary")}</Anchor>
            </div>
            <div>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.jishoLink", { kanjiParam })}`}>{t("kanjiInfo.jisho")}</Anchor>
            </div>
            <div>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wwwjdicLink", { kanjiParam })}`}>{t("kanjiInfo.wwwjdic")}</Anchor>
            </div>
          </ExternalLinks>
        </MetaContainer>

        { error && (
          <ErrorContainer>
            <HorizontalDivider />
            <div>{error}</div>
          </ErrorContainer>
        )}
        { !entry && (<Spinner />) }
        { entry && (entry.map((e, i) => {
          return (
            <div key={i}>
              <HorizontalDivider />
              <JMdictEntry entry={e} num={i} />
            </div>
          )
        }))}
      </ContentContainer>
    </Page>
  );
};

export default withTranslation()(KanjiInfo);
