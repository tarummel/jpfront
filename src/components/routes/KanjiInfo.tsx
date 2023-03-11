
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
  flex-direction: row;
  justify-content: center;
  margin: 2.5% 2.5% 2.5% 55px;
`;

const ContentContainer = styled.div`
  width: 50%;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  padding: 10px;
`;

const MetaInfoContainer = styled.div`
  align-content: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
  }
`;

const KanjiSymbol = styled.h1`
  background: ${({theme}) => theme.colors.textPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
  display: flex;
  font-size: 66px;
  height: 99px;
  justify-content: center;
  margin: 10px 20px 10px 10px;
  width: 99px;
`;

const YomiInformation = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 20px 10px 20px;
  width: 150px;
  word-break: keep-all;
`;

const MiscInformation = styled.div`
  align-content: space-between;
  display: flex;
  flex-direction: column;
  margin: 10px 20px 10px 20px;
`;

const ExternalLinks = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  font-size: ${({theme}) => theme.fontSizes.medium};
  margin: 10px 20px 10px 20px;
`;

const Entries = styled.div`
  overflow-y: scroll;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;

  div {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.xlarge};
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const LegalInformation = styled.div`
  div {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
    padding-top: 4px;
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
        const response = await API.getJMdictEntryByKanji(kanji);
        setEntry(response.data.data);  
      } catch (error: any) {
        setError("" + t("kanjiInfo.error404"));
      }
    };
    
    const getAndSetKDKanji = async (kanji: string) => {
      try {
        const response = await API.getKDKanjiByKanji(kanji);
        setKdk(response.data.data);  
      } catch (error: any) {
        console.log(error);
      }
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

    const localHistory = localStorage.getItem(Config.localStorage.history);
    if (typeof localHistory === "string") {

      let historyArray = JSON.parse(localHistory);
      if (!historyArray.includes(kanjiParam)) {

        historyArray.push(kanjiParam);
        const historySize = localStorage.getItem(Config.localStorage.historySize) || Config.localStorage.historySizeDefault;
        if (historyArray.length > historySize) {
          historyArray = historyArray.slice(-historySize);
        }
        localStorage.setItem(Config.localStorage.history, JSON.stringify(historyArray));
      }
    } else {
      localStorage.setItem(Config.localStorage.history, JSON.stringify([kanjiParam]));
    }
    
  }, [kanjiParam, t]);

  const unicode = kdk?.codepoint?.[0].ucs || kanjiParam?.charCodeAt(0) || "n/a";
  const grade = kdk?.misc?.[0].grade || "n/a";
  const jlpt = kdk?.misc?.[0].jlpt || "n/a";
  const strokes = kdk?.misc?.[0].strokes || "n/a";
  const frequency = kdk?.misc?.[0].frequency || "n/a";
  const onyomi = kdk?.reading?.[0].ja_on || "";
  const kunyomi = kdk?.reading?.[0].ja_kun?.join("; ") || "";

  return (
    <Page>
      <ContentContainer>
        <Card>
          <MetaInfoContainer>
            <KanjiSymbol>{kanjiParam}</KanjiSymbol>
            <YomiInformation>
              <div>On: {onyomi}</div>
              <div>Kun: {kunyomi}</div>
            </YomiInformation>
            <MiscInformation>
              <div>Grade: {grade}</div>
              <div>JLPT: {jlpt}</div>
              <div>Strokes: {strokes}</div>
              <div>Freq: {frequency}</div>
              <div>Unicode: {unicode}</div>
            </MiscInformation>
            <ExternalLinks>
              <div>{t("kanjiInfo.externalLinks")}:</div>
              <div>
                {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wiktionaryLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.wiktionary")}</Anchor>
              </div>
              <div>
                {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.jishoLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.jisho")}</Anchor>
              </div>
              <div>
                {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wwwjdicLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.wwwjdic")}</Anchor>
              </div>
            </ExternalLinks>
          </MetaInfoContainer>

          { error && (
            <ErrorContainer>
              <HorizontalDivider />
              <div>{error}</div>
            </ErrorContainer>
          )}
          { !entry && (<Spinner />) }
          { entry && (entry.map((e, i) => {
            return (
              <Entries key={i}>
                <HorizontalDivider />
                <JMdictEntry entry={e} num={i} />
              </Entries>
            );
          }))}
        </Card>
        <LegalInformation>
          <div>{t("legal.jmdict")} <Anchor target={"_blank"} href={`${t("legal.jmdictLink")}`}>Link</Anchor></div>
          <div>{t("legal.kanjidic")} <Anchor target={"_blank"} href={`${t("legal.kanjidicLink")}`}>Link</Anchor></div>
        </LegalInformation>
      </ContentContainer>
    </Page>
  );
};

export default withTranslation()(KanjiInfo);
