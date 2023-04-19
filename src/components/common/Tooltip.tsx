import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  name: string;
}

const TooltipHint = styled.div`
  background-color: transparent;
  border: 2px solid gray;
  border-radius: 5px;
  break-text: loose;
  color: transparent;
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding: 10px;
  position: absolute;
  transform: translateY(calc(-50% + 30px));
  visibility: hidden;
`;

const TooltipText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  cursor: pointer;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Tool = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  text-decoration: underline dotted;

  &:hover ${TooltipHint} {
    background-color: ${({theme}) => theme.colors.textNegative};
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.small};
    opacity: 0.9;
    visibility: visible;
  }
`;

const Tooltip: React.FC<Props> = ({ children, name }) => { 
  return (
    <Tool>
      <TooltipText>
        {name}
      </TooltipText>
      <TooltipHint>
        {children}
      </TooltipHint>
    </Tool>
  );
};
  
export default Tooltip;
