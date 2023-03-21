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
  grid-template-columns: 1;
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

const RowContents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// const NumberedKanjiRow: React.FC<Props> = ({ kanjiData }) => {
//   return (
//     <Rows>
//       {(Object.keys(kanjiData).map((s, i) => {
//         return (
//           <Row>
//             <RowNumber>{s}</RowNumber>
//             {kanjiData[s].map((k, i) => {
//               return <StyledLink fontSize={"xlarge"} key={i} to={`/kanji/${k}`}>{k}</StyledLink>;
//             })}
//           </Row>
//         )
//       }))}
//     </Rows>
//   );
// };

const NumberedRadicalRow: React.FC<Props> = ({handleClick, radicalsData, radicalsState}) => {
  return (
    <Rows>
      {(Object.keys(radicalsData).map((s, i) => {
        return (
          <Row>
            <RowNumber>{s}</RowNumber>
            {radicalsData[s].map((r, i) => {
              return <StateButton key={i} callback={r} handleClick={handleClick} state={radicalsState[r]}>{r}</StateButton>;
            })}
          </Row>
        )
      }))}
    </Rows>
  );
};

export default NumberedRadicalRow;
