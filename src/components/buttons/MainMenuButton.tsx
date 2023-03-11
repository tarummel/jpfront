import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = styled.button`
  background: ${({theme}) => theme.colors.buttonPrimary};
  border: none;
  border-radius: 40px;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
  height: 40px;
  justify-content: center;
  width: 250px;
  &:hover {
    background: ${({theme}) => theme.colors.buttonHover};
  }
`;

const MainMenuButton: React.FC<Props> = ({ onClick, children }) => { 
  return (
    <Button onClick={onClick}>{children}</Button>
  );
}

export default MainMenuButton;
