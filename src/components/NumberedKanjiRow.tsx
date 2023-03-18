import React from "react";
import styled from "styled-components";

import { StyledLink } from "./common";

interface Props {
  kanji: string[];
  rowNumber: string;
}

const Row = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  display: flex;
  flex-direction: row;
`;

const RowNumber = styled.div`
  background: ${({theme}) => theme.colors.rowPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
  display: flex;
  flex-shrink: 0;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  justify-content: center;
  line-height: 36px;
  margin-bottom: 1px;
  margin-top: 1px;
  width: 36px;
`;

const RowContents = styled.div`
  a {
    height: 36px;
    width: 36px;
    line-height: 36px;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const NumberedKanjiRow: React.FC<Props> = ({kanji, rowNumber}) => {
  return (
    <Row>
      <RowNumber>{rowNumber}</RowNumber>
      <RowContents>
        {kanji.map((k, i) => {
          return <StyledLink fontSize={"xlarge"} key={i} to={`/kanji/${k}`}>{k}</StyledLink>;
        })}
      </RowContents>
    </Row>
  );
};

export default NumberedKanjiRow;
