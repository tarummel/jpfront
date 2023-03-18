import React from "react";
import styled from "styled-components";

import { RadicalsState } from "dataTypes";
import StateButton from "./buttons/StateButton";

interface Props {
  radicals: string[];
  radicalsState: RadicalsState;
  rowNumber: string;
  handleClick: (radical: string) => void;
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
  flex-shrink: 0;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  justify-content: center;
  line-height: 36px;
  margin-bottom: 1px;
  margin-top: 1px;
  width: 36px;
`;

const RowContents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NumberedRadicalRow: React.FC<Props> = ({radicals, radicalsState, rowNumber, handleClick}) => {
  return (
    <Row>
      <RowNumber>{rowNumber}</RowNumber>
      <RowContents>
        {radicals.map((r, i) => {
          return <StateButton key={i} callback={r} handleClick={handleClick} state={radicalsState[r]}>{r}</StateButton>;
        })}
      </RowContents>
    </Row>
  );
};

export default NumberedRadicalRow;
