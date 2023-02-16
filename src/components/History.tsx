import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import { StyledLink } from "./common";

const HISTORY_LC = "history"

const HistoryContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  padding: 16px;
  margin-bottom: 16px;
`;

const SearchHistoryText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
`;

const History: React.FC<WithTranslation> = ({ t }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const localHistory = localStorage.getItem(HISTORY_LC)
    if (typeof localHistory === 'string') {
      const historyArray = JSON.parse(localHistory)
      setHistory(historyArray)
    }
  }, []);

  return (
    <>
      { history.length && (
        <HistoryContainer>
          <SearchHistoryText>{t("multi.searchHistory")}:</SearchHistoryText>
          {history.map((k, i) => {
            return <StyledLink key={i} to={`/kanji/${k}`}>{k}</StyledLink>
          })}
        </HistoryContainer>
      )}
    </>
  )
};

export default withTranslation()(History);
