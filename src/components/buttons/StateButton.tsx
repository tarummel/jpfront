import React from "react";
import styled from "styled-components";

// state:
// 0 = disabled
// 1 = unselected
// 2 = selected
interface Props {
  callback?: any;
  children?: React.ReactNode;
  handleClick: (callback: any) => void;
  height?: number;
  onClick?: void;
  state?: any;
  width?: number;
};

interface ButtonProps {
  height?: number;
  state?: any;
  width?: number;
}

const Button = styled.button<ButtonProps>`
  background: ${({state, theme}) => state === 2 ? theme.colors.buttonSelected : theme.colors.buttonPrimary};
  border: none;
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  height: ${({height}) => height ? height : 36}px;
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
  width: ${({width}) => width ? width : 36}px;
`;

const StateButton: React.FC<Props> = ({ callback, children, handleClick, height, state, width }) => {
  return (
    <Button disabled={!state} height={height} onClick={() => handleClick(callback)} state={state} width={width}>{children}</Button>
  );
}

export default StateButton;
