import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  text: string;
}

interface ContainerProps {
  textLength: number;
}


const Container = styled.div<ContainerProps>`
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  height: 40px;
  outline-color: ${({theme, textLength}) => textLength > 1 ? theme.colors.borderError : theme.colors.borderPrimary};
  outline-width: 2px;
  outline-style: solid;
`;

const Search = styled.input`
  border: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  font-size: ${({theme}) => theme.fontSizes.large};
  outline: none;
  padding-left: 20px;
  width: 200px;
`;

const SearchButton = styled.button`
  background: ${({theme}) => theme.colors.buttonPrimary};  
  border: ${({theme}) => "none"};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 8px;
  width: 40px;
  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
  }
`;

const Icon = styled.svg`
  color: ${({theme}) => theme.colors.textPrimary};
`;

const SearchBar: React.FC<Props> = ({ text }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && searchInput.length === 1) {
      navigate(`/kanji/${searchInput}`);
    }
  };

  const handleClick = () => {
    if (searchInput.length === 1) {
      navigate(`/kanji/${searchInput}`);
    }
  };

  return (
    <>
      <Container textLength={searchInput.length}>
        <Search type="search" placeholder={text} value={searchInput} onChange={handleChange} onKeyDown={handleKeyDown} />
        <SearchButton onClick={handleClick}>
          <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/></Icon>
        </SearchButton>
      </Container>
    </>
  );
}

export default SearchBar
