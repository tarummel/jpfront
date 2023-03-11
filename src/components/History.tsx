import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import { StyledLink } from "./common";

const HISTORY_LC = "history";

const HistoryContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 16px;
  flex-grow: 0;
`;

const SearchHistoryText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.large};
  padding-bottom: 4px;
`;

const SearchHistoryContents = styled.div`
  display: flex;

  a {
    margin-right: 3px;
  }
`;

const History: React.FC<WithTranslation> = ({ t }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const localHistory = localStorage.getItem(HISTORY_LC);
    if (typeof localHistory === 'string') {
      const historyArray = JSON.parse(localHistory);
      setHistory(historyArray);
    }
  }, []);

  return (
    <>
      { history.length && (
        <HistoryContainer>
          <SearchHistoryText>{t("multi.searchHistory")}:</SearchHistoryText>
          <SearchHistoryContents>
            {history.map((k, i) => {
              return <StyledLink key={i} to={`/kanji/${k}`}>{k}</StyledLink>
            })}
          </SearchHistoryContents>
        </HistoryContainer>
      )}
    </>
  );
}

export default withTranslation()(History);
