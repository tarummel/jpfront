import React from "react";
import styled from "styled-components"

interface Props {
  children?: React.ReactNode;
}

const Container = styled.div`  
  font-size: 62.5%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background: ${props => props.theme.colors.background};
`;

const App: React.FC<Props> = ({ children }) => { 
  return (
    <Container className="App">{children}</Container>
  );
}

export default App;
