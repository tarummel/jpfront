import React, { useState } from "react";
import styled from "styled-components";

import Config from "../constants/Config";
import Header from "./Header";
import Router from "./Router";
import Theme from "./utils/Theme";

const AppContainer = styled.div`
  background: ${props => props.theme.colors.background};
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
`;

const App: React.FC = () => {
  const getThemeFromStorage = () => {
    return localStorage.getItem(Config.localStorage.theme) || Config.localStorage.themeDefault;
  };

  const [theme, setTheme] = useState(getThemeFromStorage());

  return (
    <Theme theme={theme}>
      <AppContainer className="App">
        <Header />
        <Router setTheme={setTheme} theme={theme} />
      </AppContainer>
    </Theme>
  );
};

export default App;
