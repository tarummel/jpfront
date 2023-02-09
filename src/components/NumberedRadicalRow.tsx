import React from "react";
import styled from "styled-components";

import { RadicalsState } from "dataTypes";
import StateButton from "./buttons/RadicalStateButton";

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
  background: ${({theme}) => theme.colors.textSecondary};  
  border-radius: 5px;
  display: flex;
  flex-shrink: 0;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  justify-content: center;
  line-height: 36px;
  margin: 1px;
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
          return <StateButton key={i} radical={r} state={radicalsState[r]} handleClick={handleClick} />
        })};
      </RowContents>
    </Row>
  );
};

export default NumberedRadicalRow;
