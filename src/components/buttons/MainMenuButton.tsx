import React from "react";
import styled from "styled-components"

interface Props {
  text: string;
//   color: string;
  children?: React.ReactNode;
//   height: string;
//   width: string
  onClick: () => void;
}

const Button = styled.button`
  background: black;
  color: white;
  border-radius: 7px;
  padding: 20px;
  margin: 10px;
  font-size: 16px;
`;

const MainMenuButton: React.FC<Props> = ({ onClick, text }) => { 
  return (
    <Button onClick={onClick}>{text}</Button>
  );
}

export default MainMenuButton;
