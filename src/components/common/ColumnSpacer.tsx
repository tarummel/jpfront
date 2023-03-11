import React from "react";
import styled from "styled-components";

interface Props {
  width?: number;
}

const Spacer = styled.div<Props>`
  flex-shrink: 0;
  width: ${({width}) => width ? width : 70}px;
`;

const ColumnSpacer: React.FC<Props> = ({width}) => {
  return (
    <Spacer width={width}/>
  );
};

export default ColumnSpacer;
