import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-weight: normal;
    font-style: normal;
    src: url('./fonts/roboto-v27-latin-300.eot');
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
    buttonHover: "#280C75",
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
