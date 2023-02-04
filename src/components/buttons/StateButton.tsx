import React from "react";
import styled from "styled-components"

interface Props {
  radical: string;
  state: number;
  handleClick: (radical: string) => void;
}

const Button = styled.button<Pick<Props, "state">>`
  background: ${(props) => props.state === 2 ? props.theme.colors.buttonSelected : props.theme.colors.buttonPrimary};
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes.large};
  height: 36px;
  width: 36px;
  border-radius: 5px;
  justify-content: center;
  border: none;
  margin: 1px;
  &:hover:enabled {
    background: ${props => props.theme.colors.buttonHover};
  }
  &:disabled {
    pointer-events: none;
    background: ${props => props.theme.colors.buttonDisabled};
  }
`;

const StateButton: React.FC<Props> = ({ radical, state, handleClick }) => {
  return (
    <Button state={state} disabled={!state} onClick={() => handleClick(radical)}>{radical}</Button>
  );
}

export default StateButton;
