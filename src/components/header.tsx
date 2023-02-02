import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

interface Props {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55px;
  right: 0;
  border-left: 1px solid ${props => props.theme.colors.textPrimary};
  border-bottom: 1px solid ${props => props.theme.colors.textPrimary};
`;

const Box = styled.div`
  background: ${props => props.theme.colors.buttonPrimary};
  justify-content: center;
  height: 36px;
  width: 36px;
  padding: 10px;
  border-top: 1px solid ${props => props.theme.colors.textPrimary};
  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
`;

const Icon = styled.svg`
  color: white;
  fill: white;
`;

const Header: React.FC<Props> = () => {
  return (
    <Container>
      <Link to="/">
        <span title="Home">
          <Box>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"/><path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"/></Icon>
          </Box>
        </span>
      </Link>
      <Link to="/about">
        <span title="About">
          <Box>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="40" d="M196 220h64v172"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="40" d="M187 396h138"/><path d="M256 160a32 32 0 1132-32 32 32 0 01-32 32z"/></Icon>
          </Box>
        </span>
      </Link>
      <Link to="/help">
        <span title="Help">
          <Box>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeWidth="40"/><circle cx="248" cy="399.99" r="32" fill="currentColor"/></Icon>
          </Box>
        </span>
      </Link>
      <Link to="/settings">
        <span title="Settings">
          <Box>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="48"/><path d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z"/></Icon>
          </Box>
        </span>
      </Link>
    </Container>
  );
}

export default Header;
