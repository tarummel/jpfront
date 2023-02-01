import React, { useState } from "react";
import styled from "styled-components"

interface Props {}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
`;

const Search = styled.input`
  font-size: ${props => props.theme.fontSizes.large};
  padding-left: 20px;
  outline: none;
  border: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 200px;
`;

const IconContainer = styled.button`
  display: flex;
  background: ${props => props.theme.colors.buttonPrimary};
  width: 40px;
  border: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  justify-content: center;
  padding: 8px;
  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
`;

const Icon = styled.svg`
  color: ${props => props.theme.colors.textPrimary};
`;

const SearchBar: React.FC<Props> = () => {
  const [searchInput, setSearchInput] = useState("");

  let handleChange = (e: any) => {
    console.log(e.target.value)
    setSearchInput(e.target.value);
  };

  return (
    <Container>
      <Search type="search" placeholder="Search Kanji..." onChange={handleChange} value={searchInput} />
      <IconContainer>
        <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/></Icon>
      </IconContainer>
    </Container>
  );
}

export default SearchBar
