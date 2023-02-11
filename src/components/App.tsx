import React from "react";
import styled from "styled-components"
import Header from "./Header"

interface Props {
  children?: React.ReactNode;
}

const Container = styled.div`
  background: ${props => props.theme.colors.background};
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
`;

const App: React.FC<Props> = ({ children }) => { 
  return (
    <Container className="App">
      <Header />
      {children}
    </Container>
  );
};

export default App;
