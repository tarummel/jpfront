
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

const Body = styled.div`
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  min-width: 1024px;
  padding: 10px;
  width: 50%;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  padding: 10px;
`;

const MetaInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const SymbolWrapper = styled.div`
  background: ${({theme}) => theme.colors.textPrimary};
  border-radius: 5px;
  width: 100px;
  height: 100px;
`;

const KanjiSymbol = styled.h1`
  color: ${({theme}) => theme.colors.textNegative};
  font-size: 70px;
  margin: auto;
  line-height: 100px;
  text-align: center;
`;

const GridTable = styled.div`
  column-gap: 2px;
  display: grid;
  grid-template-columns: repeat(2, minmax(80px, 120px));
  grid-template-rows: repeat(5, 20px);
  row-gap: 1px;
  text-align: end;
  word-wrap: break-word;
  word-breaK: break-all;
`;

const Meta = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Table = styled.ul`
  padding-left: 20px;
  padding-right: 20px;

  li {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
    word-break: keep-all;
  }
`;

const Entries = styled.div`
  
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  padding-top: 10px;
  padding-bottom: 10px;
`;

const EntryContainer = styled.div`
  overflow-y: scroll;
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
  }, [kanjiParam]);

  const unicode = kdk?.codepoint?.[0].ucs || kanjiParam?.charCodeAt(0) || "n/a";
  const grade = kdk?.misc?.[0].grade || "n/a";
  const jlpt = kdk?.misc?.[0].jlpt || "n/a";
  const strokes = kdk?.misc?.[0].strokes || "n/a";
  const frequency = kdk?.misc?.[0].frequency || "n/a";
  const skip = kdk?.querycode?.[0].skip || "n/a";
  const onyomi = kdk?.reading?.[0].ja_on || "";
  const kunyomi = kdk?.reading?.[0].ja_kun?.join("; ") || "";

  return (
    <Body>
      <Card>
        <MetaInfoContainer>
          <SymbolWrapper>
            <KanjiSymbol>{kanjiParam}</KanjiSymbol>
          </SymbolWrapper>
          <GridTable>
            <Meta>On: </Meta>
            <Meta>{onyomi}</Meta>
            <Meta>Kun: </Meta>
            <Meta>{kunyomi}</Meta>
          </GridTable>
          <GridTable>
            <Meta>Strokes: </Meta>
            <Meta>{strokes}</Meta>
            <Meta>SKIP: </Meta>
            <Meta>{skip}</Meta>
          </GridTable>
          <GridTable>
            <Meta>Grade: </Meta>
            <Meta>{grade}</Meta>
            <Meta>JLPT: </Meta>
            <Meta>{jlpt}</Meta>
            <Meta>Freq: </Meta>
            <Meta>{frequency}</Meta>
            <Meta>Unicode: </Meta>
            <Meta>{unicode}</Meta>
          </GridTable>
          <Table>
            <li>{t("kanjiInfo.externalLinks")}</li>
            <li>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wiktionaryLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.wiktionary")}</Anchor>
            </li>
            <li>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.jishoLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.jisho")}</Anchor>
            </li>
            <li>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wwwjdicLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.wwwjdic")}</Anchor>
            </li>
            <li>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.deeplLink", { kanji: kanjiParam })}`}>{t("kanjiInfo.deepl")}</Anchor>
            </li>
          </Table>
        </MetaInfoContainer>
        <EntryContainer>
          { error && (
            <>
              <HorizontalDivider />
              <ErrorContainer>{error}</ErrorContainer>
            </>
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
        </EntryContainer>
      </Card>
      <Table>
        <li>{t("legal.jmdict")} <Anchor target={"_blank"} href={`${t("legal.jmdictLink")}`}>Link</Anchor></li>
        <li>{t("legal.kanjidic")} <Anchor target={"_blank"} href={`${t("legal.kanjidicLink")}`}>Link</Anchor></li>
      </Table>
    </Body>
  );
};

export default withTranslation()(KanjiInfo);
