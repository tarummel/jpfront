import React from "react";
import styled from "styled-components"

interface Props {
  children?: React.ReactNode;
  height?: number;
  onClick?: () => void;
  width?: number;
}

const Button = styled.button<Props>`
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

const GenericButton: React.FC<Props> = ({ children, height, onClick, width }) => { 
  return (
    <Button height={height} onClick={onClick} width={width}>{children}</Button>
  );
}

export default GenericButton;
