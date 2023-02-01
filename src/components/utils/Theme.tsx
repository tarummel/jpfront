import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import Roboto from "../../assets/fonts/Roboto/Roboto-Regular.ttf";

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

const theme = {
  colors: {
    background: "#180845",
    elementPrimary: "#1E0959",
    textPrimary: "#FFFFFF",
    textSecondary: "#C3BCD6",
    buttonPrimary: "#623DCA",
    buttonSecondary: "#000000",
    buttonDisabled: "#878787",
    buttonSelected: "#D4AF37",
    buttonHover: "#3E15B0",
  },
  fontSizes: {
    small: "1.6rem",
    medium: "1.8rem",
    large: "2.0rem",
    xlarge: "2.2rem",
    header: "2.4rem"
  }
};

const Theme: React.FC<Props> = ({ children }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);

export default Theme;
