import React from "react";
import styled from "styled-components"

interface Props {
  children?: React.ReactNode;
  height?: number;
  onClick: () => void;
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

const Button: React.FC<Props> = ({ children, height, onClick, width }) => { 
  return (
    <StyledButton height={height} onClick={onClick} width={width}>{children}</StyledButton>
  );
}

export default Button;
