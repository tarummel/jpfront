import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// import NotoSansJP from "../../assets/fonts/NotoSansJP/NotoSansJP-Regular.otf";
import Roboto from "../../assets/fonts/Roboto/Roboto-Regular.ttf";
import { dark, light, purpleism } from "../../constants/Themes";

interface Props {
  children?: React.ReactNode;
  theme: string;
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

const Theme: React.FC<Props> = ({ children, theme }) => {

  const getThemeProfile = (theme: string) => {
    if (theme === "dark") {
      return dark;
    } else if (theme === "light") {
      return light;
    } else if (theme === "purpleism") {
      return purpleism;
    }
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={getThemeProfile(theme)}>{children}</ThemeProvider>
    </>
  );
};

export default Theme;
