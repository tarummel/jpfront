
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import API from "../../API";
import Anchor from "../common/Anchor";
import { JEntry } from "dataTypes";
import HorizontalDivider from "../common/HorizontalDivider";
import JMdictEntry from "../JMdictEntry";
import Spinner from "../common/Spinner";

const HISTORY_LC = "history";
const HISTORY_SIZE = 20;
  
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 2.5%;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  flex: 1;
  background: ${({theme}) => theme.colors.elementPrimary};
  padding: 8px;
  overflow-y: scroll;
`;

const KanjiSymbol = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 64px;
  padding: 0px 20px 0px;
  margin: 10px;
`;

const ExternalLinks = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding: 16px;
`;

const LinkText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 40px;
  width: 500px;
`;

const Error = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
`;

const KanjiInfo: React.FC<WithTranslation> = ({ t }) => {
  const { kanji } = useParams();
  const [error, setError] = useState("");
  const [kanjiData, setKanjiData] = useState<JEntry[]>([]);

  useEffect(() => {
    const getAndSetKanji = async (kanji: string) => {
      try {
        const response = await API.getKanjiInfo(kanji)
        setKanjiData(response.data.data)  
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

    if (typeof kanji === "string") {
      getAndSetKanji(kanji)

      const localHistory = localStorage.getItem(HISTORY_LC)
      if (typeof localHistory === "string") {
        let historyArray = JSON.parse(localHistory)
        
        if (kanji.length === 1 && !historyArray.includes(kanji)) {
          historyArray.push(kanji)
          if (historyArray.length > HISTORY_SIZE) {
            historyArray = historyArray.slice(-HISTORY_SIZE)
          }
          localStorage.setItem(HISTORY_LC, JSON.stringify(historyArray));
        }
      } else {
        localStorage.setItem(HISTORY_LC, JSON.stringify([kanji]));
      }
    }
  }, [kanji, t]);

  return (
    <Container>
      <ContentContainer>
        <MetaContainer>
          <KanjiSymbol>{kanji}</KanjiSymbol>
          <ExternalLinks>
            <LinkText>{t("kanjiInfo.externalLinks")}:</LinkText>
            <LinkText>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wiktionaryLink", { kanji })}`}>{t("kanjiInfo.wiktionary")}</Anchor>
            </LinkText>
            <LinkText>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.jishoLink", { kanji })}`}>{t("kanjiInfo.jisho")}</Anchor>
            </LinkText>
            <LinkText>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wwwjdicLink", { kanji })}`}>{t("kanjiInfo.wwwjdic")}</Anchor>
            </LinkText>
          </ExternalLinks>
        </MetaContainer>

        { error && (
          <ErrorContainer>
            <HorizontalDivider />
            <Error>{error}</Error>
          </ErrorContainer>
        )}
        { !kanjiData && (<Spinner enabled={true}/>) }
        { kanjiData && (kanjiData.map((entry, i) => {
          return (
            <div key={i}>
              <HorizontalDivider />
              <JMdictEntry entry={entry} num={i} />
            </div>
          )
        }))}
      </ContentContainer>
    </Container>
  );
};

export default withTranslation()(KanjiInfo);
