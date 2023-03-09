import React from "react";
import styled from "styled-components"

interface Props {
  callback?: any;
  children?: React.ReactNode;
  height?: number;
  onClick: (args: any) => void | (() => void);
  width?: number;
}

const StyledButton = styled.button<Props>`
  background: ${({theme}) => theme.colors.buttonPrimary};
  border: none;
  border-radius: 40px;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
  height: ${({height}) => height ? `${height}px` : "auto"};
  justify-content: center;
  width: ${({width}) => width ? `${width}px` : "auto"};
  &:hover {
    background: ${({theme}) => theme.colors.buttonHover};
  }
`;

const Button: React.FC<Props> = ({ callback, children, height, onClick, width }) => { 
  return (
    <StyledButton height={height} onClick={() => onClick(callback)} width={width}>{children}</StyledButton>
  );
}

export default Button;
