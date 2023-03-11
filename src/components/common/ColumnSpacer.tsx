import React from "react";
import styled from "styled-components";

interface Props {
  minWidth?: string;
  width?: string;
}

const Spacer = styled.div<Props>`
  display: flex;
  flex-shrink: 0;
  min-width: ${({minWidth}) => minWidth ? minWidth + "" : "0px"};
  width: ${({width}) => width ? width + "" : "0px"};
`;

const ColumnSpacer: React.FC<Props> = ({ minWidth, width }) => {
  return (
    <Spacer minWidth={minWidth} width={width} />
  );
};

export default ColumnSpacer;
