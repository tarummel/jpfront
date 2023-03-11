import React from "react";
import styled from "styled-components";

interface Props {
  color?: string;
  height?: number;
}

const Line = styled.div<Props>`
  background: ${({theme}) => theme.colors.buttonSelected};
  height: ${({height}) => height ? height : 2}px;
`;

const HorizontalDivider: React.FC<Props> = ({color, height}) => {
  return (
    <Line color={color} height={height}/>
  );
};

export default HorizontalDivider;
