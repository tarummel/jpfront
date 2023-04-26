import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../../assets/icons/search-outline.svg";

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
  width: 210px;
`;

const SearchButton = styled.button`
  background: ${({theme}) => theme.colors.buttonPrimary};
  border: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 8px 10px 8px 6px;
  width: 40px;
  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
  }
`;

const StyledIcon = styled(SearchIcon)`
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
          <StyledIcon />
        </SearchButton>
      </Container>
    </>
  );
};

export default SearchBar;
