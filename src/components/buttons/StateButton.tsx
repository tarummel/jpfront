import React from "react";
import styled from "styled-components"

interface Props {
  radical: string;
  state: number;
  handleClick: (radical: string) => void;
}

const Button = styled.button`
  background: ${props => props.theme.colors.buttonPrimary};
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes.large};
  height: 36px;
  width: 36px;
  border-radius: 5px;
  justify-content: center;
  border: none;
  &:hover {
    background: ${props => props.theme.colors.buttonHover};
  }
`;

const StateButton: React.FC<Props> = ({ radical, state, handleClick }) => { 
  return (
    <Button onClick={() => handleClick(radical)}>{radical}</Button>
  );
}

export default StateButton;
