import React from "react";
import styled from "styled-components"

interface Props {
  radical: string;
  state: number;
  handleClick: (radical: string) => void;
};

const Button = styled.button<Pick<Props, "state">>`
  background: ${({state, theme}) => state === 2 ? theme.colors.buttonSelected : theme.colors.buttonPrimary};
  border: none;
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  height: 36px;
  margin: 1px;
  text-align: center;
  width: 36px;
  &:hover {
    background: ${({state, theme}) => state === 2 ? theme.colors.buttonSelectedHover : theme.colors.buttonHover};
  }
  &:disabled {
    background: ${({theme}) => theme.colors.buttonDisabled};
    pointer-events: none;
  }
`;

const StateButton: React.FC<Props> = ({ handleClick, radical, state }) => {
  return (
    <Button disabled={!state} onClick={() => handleClick(radical)} state={state}>{radical}</Button>
  );
}

export default StateButton;
