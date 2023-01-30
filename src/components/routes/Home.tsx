import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

import { MainMenuButton } from "../buttons";

interface Props {}
  
const div = styled.div``;

const Home: React.FC<Props> = ({}) => { 
  return (
    <div>
      <Link to="/Settings">
        <MainMenuButton>Multi-Radical Search</MainMenuButton>
      </Link>
    </div>
  );
}

export default Home;
