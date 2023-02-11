import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

import { MainMenuButton } from "../buttons";
import Header from "../Header";
import SearchBar from "../common/SearchBar";

interface Props {}
  
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90px;
`;

const Home: React.FC<Props> = () => { 
  return (
    <Container>
      <SearchBar />
      <Link to="/multiradical">
        <MainMenuButton>Multi-Radical Search</MainMenuButton>
      </Link>
    </Container>
  );
}

export default Home;
