import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import { StyledLink } from "./common";

const HISTORY_LC = "history";

const HistoryContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  display: flex;
  flex-direction: row;
  padding: 5px;
  height: 20px;
`;

const Text = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Links = styled.div`
  margin-left: 8px;
  a {
    margin-right: 4px;
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
          <Text>{t("multi.searchHistory")}:</Text>
          <Links>
            {history.map((k, i) => {
              return <StyledLink key={i} to={`/kanji/${k}`}>{k}</StyledLink>;
            })}
          </Links>
        </HistoryContainer>
      )}
    </>
  );
};

export default withTranslation()(History);
