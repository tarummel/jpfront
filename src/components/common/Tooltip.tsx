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
  
  &:before {
    content: "";
    height: 0;
    left: calc(50% - 10px);
    position: absolute;
    top: -10px;
    transform: rotate(135deg);
    transition: border 0.3s ease-in-out;
    width: 0;
  }
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
    background-color: rgba(0, 0, 0, 0.8);
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.small};
    visibility: visible;

    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.9)
        rgba(0, 0, 0, 0.9);
    }
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
