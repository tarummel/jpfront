import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"
import styled from "styled-components";

import { Text } from "./common";

const HISTORY_LC = "history"

const HistoryContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  padding: 16px;
  margin-bottom: 16px;
`;

const KanjiLink = styled(Link)`
  color: white;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  margin: 1px;
  text-decoration: none;
  :link {
    color: white;
  }
  :visited {
    color: hotpink;
  }
`;

const History: React.FC = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const localHistory = localStorage.getItem(HISTORY_LC)
    if (typeof localHistory === 'string') {
      const historyArray = JSON.parse(localHistory)
      setHistory(historyArray)
    }
  }, []);

  console.log(history)

  return (
    <HistoryContainer>
      <Text>History:</Text>
      {history.map((k, i) => {
        return <KanjiLink key={i} to={`/kanji/${k}`}>{k}</KanjiLink>
      })}
    </HistoryContainer>
  );
};

export default History;
