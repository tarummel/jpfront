import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

import { MainMenuButton } from "../buttons";
import Header from "../Header";
import SearchBar from "../SearchBar";

interface Props {}
  
const div = styled.div``;

const Home: React.FC<Props> = () => { 
  return (
    <div>
      <Header/>
      <SearchBar />
      <Link to="/multiradical">
        <MainMenuButton>Multi-Radical Search</MainMenuButton>
      </Link>
    </div>
  );
}

export default Home;
