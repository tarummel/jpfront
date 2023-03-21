import React from "react";
import styled from "styled-components";

import { StrokeCharactersMap } from "dataTypes";
import { StyledLink } from "./common";

interface Props {
  kanjiData: StrokeCharactersMap;
}

const Rows = styled.div`
  align-content: start;  
  background: ${({theme}) => theme.colors.elementPrimary};
  display: grid;
  grid-template-columns: 1;
  height: 100%;
  overflow-y: scroll;
  row-gap: 2px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 36px);

  a {
    line-height: 36px;
    text-align: center;
  }
`;

const RowNumber = styled.div`
  background: ${({theme}) => theme.colors.rowPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  height: 36px;
  line-height: 36px;
  text-align: center;
  width: 36px;
`;

const NumberedKanjiRow: React.FC<Props> = ({ kanjiData }) => {
  return (
    <Rows>
      {(Object.keys(kanjiData).map((s, i) => {
        return (
          <Row>
            <RowNumber>{s}</RowNumber>
            {kanjiData[s].map((k, i) => {
              return <StyledLink fontSize={"xlarge"} key={i} to={`/kanji/${k}`}>{k}</StyledLink>;
            })}
          </Row>
        )
      }))}
    </Rows>
  );
};

export default NumberedKanjiRow;
