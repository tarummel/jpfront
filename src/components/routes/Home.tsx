import { Link, useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { MainMenuButton } from "../buttons";
import SearchBar from "../common/SearchBar";
import { KDKanjiRandomParams } from "apiParamTypes";

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  min-width: 1024px;
  padding-top: 20px;
  width: 50%;
`;

const Banner = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 48px;
  margin-bottom: 20px;
`;

const SearchCard = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 140px;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
`;

const OptionsCard = styled.div`
  align-items: center;
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 210px;
  justify-content: space-between;
  padding: 10px;
`;

const OptionsTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
  justify-content: center;
  margin-top: 0px;
`;

const Home: React.FC<WithTranslation> = ({ t }) => {
  const navigate = useNavigate();

  const handleRandom = () => {
    const getAndNavigateRandom = async () => {
      const params = { kanjiOnly: true } as KDKanjiRandomParams;
      const response = await API.getKDKanjiRandom(params);
      const data = response.data.data;
      navigate(`/kanji/${data}`);
    };

    getAndNavigateRandom().catch((e) => {
      console.log(getAndNavigateRandom.name, e);
    });
  };

  return (
    <Body>
      <Banner>Open Kanji</Banner>
      <SearchCard>
        <OptionsTitle>Search</OptionsTitle>
        <SearchBar text={`${t("mainMenu.searchKanji")}...`}/>
        <MainMenuButton onClick={handleRandom}>{t("mainMenu.random")}</MainMenuButton>
      </SearchCard>
      <OptionsCard>
        <OptionsTitle>Radicals</OptionsTitle>
        <Link to="/multiradical">
          <MainMenuButton>{t("mainMenu.multiradicalSearch")}</MainMenuButton>
        </Link>
        <Link to="/multiradicaltype">
          <MainMenuButton>{t("mainMenu.multiradicalSearchByType")}</MainMenuButton>
        </Link>
        <Link to="/skip">
          <MainMenuButton>{t("mainMenu.skip")}</MainMenuButton>
        </Link>
      </OptionsCard>
    </Body>
  );
};

export default withTranslation()(Home);
