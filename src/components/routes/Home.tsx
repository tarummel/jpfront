import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

import { MainMenuButton } from "../buttons";
import Header from "../Header";

interface Props {}
  
const div = styled.div``;

const Home: React.FC<Props> = ({}) => { 
  return (
    <div>
      <Header/>
      <Link to="/multiradical">
        <MainMenuButton>Multi-Radical Search</MainMenuButton>
      </Link>
    </div>
  );
}

export default Home;
