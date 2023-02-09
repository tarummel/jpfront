import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  kanji: string[];
  rowNumber: string;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const RowNumber = styled.div`
  background: ${({theme}) => theme.colors.textSecondary};
  border-radius: 5px;
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  flex-shrink: 0;
  justify-content: center;
  line-height: 36px;
  margin: 1px;
  width: 36px;
`;

const RowContents = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const NumberedKanjiRow: React.FC<Props> = ({kanji, rowNumber}) => {
  return (
    <Row>
      <RowNumber>{rowNumber}</RowNumber>
      <RowContents>
        {kanji.map((k, i) => {
          return <KanjiLink key={i} to={`/kanji/${k}`}>{k}</KanjiLink>
        })};
      </RowContents>
    </Row>
  );
};

export default NumberedKanjiRow;
