import React from "react";
import styled from "styled-components";

import { StyledLink } from "./common"

interface Props {
  kanji: string[];
  rowNumber: string;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const RowNumber = styled.div`
background: ${({theme}) => theme.colors.rowPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
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

const NumberedKanjiRow: React.FC<Props> = ({kanji, rowNumber}) => {
  return (
    <Row>
      <RowNumber>{rowNumber}</RowNumber>
      <RowContents>
        {kanji.map((k, i) => {
          return <StyledLink fontSize={"xlarge"} key={i} to={`/kanji/${k}`}>{k}</StyledLink>
        })}
      </RowContents>
    </Row>
  );
};

export default NumberedKanjiRow;
