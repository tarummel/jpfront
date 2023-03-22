import React from "react";
import styled from "styled-components";

import { RadicalsState, StrokeCharactersMap } from "dataTypes";
import StateButton from "./buttons/StateButton";

interface Props {
  handleClick: (radical: string) => void;
  radicalsData: StrokeCharactersMap;
  radicalsState: RadicalsState;
}

const Rows = styled.div`
  align-content: start;  
  background: ${({theme}) => theme.colors.elementPrimary};
  display: grid;
  height: 100%;
  overflow-y: scroll;
  row-gap: 2px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 36px);
  column-gap: 2px;
  row-gap: 2px;
`;

const RowNumber = styled.div`
  background: ${({theme}) => theme.colors.rowPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textNegative};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  min-height: 36px;
  line-height: 36px;
  text-align: center;
  width: 36px;
`;

const NumberedRadicalRow: React.FC<Props> = ({handleClick, radicalsData, radicalsState}) => {
  return (
    <Rows>
      {(Object.keys(radicalsData).map((s, i) => {
        return (
          <Row key={i}>
            <RowNumber>{s}</RowNumber>
            {radicalsData[s].map((r, j) => {
              return <StateButton key={j} callback={r} handleClick={handleClick} state={radicalsState[r]}>{r}</StateButton>;
            })}
          </Row>
        );
      }))}
    </Rows>
  );
};

export default NumberedRadicalRow;
