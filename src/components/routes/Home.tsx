import { Link } from "react-router-dom"
import React from "react";
import styled from "styled-components"

import { MainMenuButton } from "../buttons";
import SearchBar from "../common/SearchBar";

interface Props {}
  
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5%;
`;

const MultiradicalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 138px;
  justify-content: space-between;
`;

const Home: React.FC<Props> = () => { 
  return (
    <Container>
      <MultiradicalContainer>
        <SearchBar />
        <Link to="/multiradical">
          <MainMenuButton>Radical Search</MainMenuButton>
        </Link>
        <Link to="/multiradicaltype">
          <MainMenuButton>Radical Search by Type</MainMenuButton>
        </Link>
      </MultiradicalContainer>
    </Container>
  );
}

export default Home;
