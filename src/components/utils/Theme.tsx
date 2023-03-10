import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Config from "../../constants/Config";
import NotoSansJP from "../../assets/fonts/NotoSansJP/NotoSansJP-Regular.otf";
import Roboto from "../../assets/fonts/Roboto/Roboto-Regular.ttf";
import { darkTheme, lightTheme } from "../../constants/Themes";

interface Props {
  children?: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto});
  }
  @font-face {
    font-family: 'NotoSansJP';
    src: url(${NotoSansJP});
  }
  * {
    font-family: 'Roboto', 'NotoSansJP';
    font-size: 62.5%;
  }
`;

const Theme: React.FC<Props> = ({ children }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={localStorage.getItem(Config.localStorage.theme) === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>
  </>
);

export default Theme;
