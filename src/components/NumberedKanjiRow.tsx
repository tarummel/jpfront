import React from "react";
import styled from "styled-components";

import { StyledLink } from "./common";

interface Props {
  kanji: string[];
  rowNumber: string;
}

const Row = styled.div`
background: ${({theme}) => theme.colors.rowPrimary};
`;

const RowNumber = styled.div`
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  line-height: 36px;
  margin: 1px;
  width: 36px;
`;

const RowContents = styled.div`
  a {
    line-height: 32px;
    padding: 2px 2px 2px 2px;
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
