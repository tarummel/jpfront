import React, { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Config from "../../constants/Config";
// import NotoSansJP from "../../assets/fonts/NotoSansJP/NotoSansJP-Regular.otf";
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
  * {
    font-family: 'Roboto';
    font-size: 62.5%;
  }
`;

// NotoSansJP was throwing errors and it's not used atm
// const GlobalStyle = createGlobalStyle`
//   @font-face {
//     font-family: 'Roboto';
//     src: url(${Roboto});
//   }
//   @font-face {
//     font-family: 'NotoSansJP';
//     src: url(${NotoSansJP});
//   }
//   * {
//     font-family: 'Roboto', 'NotoSansJP';
//     font-size: 62.5%;
//   }
// `;

const Theme: React.FC<Props> = ({ children }) => {

  const getThemeFromStorage = () => {
    const stored = localStorage.getItem(Config.localStorage.theme);
    if (!stored || stored === "dark") {
      return darkTheme;
    } else if (stored === "light") {
      return lightTheme;
    }
  };

  const [theme, setTheme] = useState(getThemeFromStorage());

  // const updateTheme = (newTheme:string) => {
  //   if (newTheme === "dark") {
  //     setTheme(darkTheme);
  //   } else if (newTheme === "light") {
  //     setTheme(lightTheme);
  //   }
  // };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default Theme;
