
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import API from "../../api";
import Anchor from "../common/Anchor";
import ColumnSpacer from "../common/ColumnSpacer";
import { JEntry } from "dataTypes";
import HorizontalDivider from "../common/HorizontalDivider";
import JMdictEntry from "../JMdictEntry";
import Text from "../common/Text";

const HISTORY_LC = "history";
const HISTORY_SIZE = 20;
  
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  flex: 1;
  background: ${({theme}) => theme.colors.elementPrimary};
  margin-top: 2.5%;
  padding: 0px 16px 16px;
`;

const KanjiLarge = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 48px;
  padding: 16px;
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

const KanjiInfo: React.FC<WithTranslation> = ({ t }) => {
  const { kanji } = useParams();
  const [kanjiData, setKanjiData] = useState<JEntry[]>([])

  useEffect(() => {
    const getAndSetKanji = async (kanji: string) => {
      const response = await API.getKanjiInfo(kanji)
      setKanjiData(response.data.data)
    }

    if (typeof kanji === 'string') {
      getAndSetKanji(kanji) 

      const localHistory = localStorage.getItem(HISTORY_LC)
      if (typeof localHistory === 'string') {
        let historyArray = JSON.parse(localHistory)
        
        if (!historyArray.includes(kanji)) {
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
  }, [kanji]);

  return (
    <Container>
      <ColumnSpacer />
      <ContentContainer>
        <MetaContainer>
          <KanjiLarge>{kanji}</KanjiLarge>
          <ExternalLinks>
            <Text>{t("kanjiInfo.externalLinks")}:</Text>
            <Text>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wiktionaryLink", { kanji })}`}>Wiktionary</Anchor>
            </Text>
            <Text>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.jishoLink", { kanji })}`}>Jisho</Anchor>
            </Text>
            <Text>
              {"--> "}<Anchor target="_blank" href={`${t("kanjiInfo.wwwjdicLink", { kanji })}`}>WWWJDIC</Anchor>
            </Text>
          </ExternalLinks>
        </MetaContainer>
        
        { !kanjiData.length
          ? (<Text>{t("kanjiInfo.noEntryFound")}</Text>)
          : (
            kanjiData.map((entry, i) => {
              return (
                <div key={i}>
                  <HorizontalDivider />
                  <JMdictEntry entry={entry} num={i} />
                </div>
              )
            })
          )
        }
      </ContentContainer>
      <ColumnSpacer />
    </Container>
  );
};

export default withTranslation()(KanjiInfo);
