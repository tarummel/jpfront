import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import { MainMenuButton } from "../buttons";
import SearchBar from "../common/SearchBar";

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

const Home: React.FC<WithTranslation> = ({ t }) => { 
  return (
    <Container>
      <MultiradicalContainer>
        <SearchBar text={`${t("mainMenu.searchKanji")}...`}/>
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
