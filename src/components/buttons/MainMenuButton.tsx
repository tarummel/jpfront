import React from "react";
import styled from "styled-components"

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = styled.button`
  background: ${props => props.theme.colors.buttonPrimary};
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes.large};
  height: 40px;
  width: 240px;
  border-radius: 40px;
  justify-content: center;
  border: none;
  &:hover {
    background: ${props => props.theme.colors.buttonHover};
  }
`;

const MainMenuButton: React.FC<Props> = ({ onClick, children }) => { 
  return (
    <Button onClick={onClick}>{children}</Button>
  );
}

export default MainMenuButton;
