import { Link, useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { MainMenuButton } from "../buttons";
import SearchBar from "../common/SearchBar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2.5% 2.5% 2.5% 55px;
`;

const MultiradicalContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 180px;
  justify-content: space-between;
  padding: 10px;
`;

const Home: React.FC<WithTranslation> = ({ t }) => {
  const navigate = useNavigate();

  const handleRandom = () => {
    const getAndNavigateRandom = async () => {
      const response = await API.getKDKanjiRandom(true)
      const data = response.data.data
      navigate(`/kanji/${data}`);
    };

    getAndNavigateRandom()
  };

  return (
    <Container>
      <MultiradicalContainer>
        <SearchBar text={`${t("mainMenu.searchKanji")}...`}/>
        <MainMenuButton onClick={handleRandom}>{t("mainMenu.random")}</MainMenuButton>
        <Link to="/multiradical">
          <MainMenuButton>{t("mainMenu.multiradicalSearch")}</MainMenuButton>
        </Link>
        <Link to="/multiradicaltype">
          <MainMenuButton>{t("mainMenu.multiradicalSearchByType")}</MainMenuButton>
        </Link>
      </MultiradicalContainer>
    </Container>
  );
};

export default withTranslation()(Home);
