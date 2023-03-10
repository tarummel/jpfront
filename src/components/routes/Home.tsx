import { Link, useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { MainMenuButton } from "../buttons";
import SearchBar from "../common/SearchBar";
import { KDKanjiRandomParams } from "apiParamTypes";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2.5% 2.5% 2.5% 55px;
  align-items: center;
`;

const Banner = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 48px;
`;

const SearchCard = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 140px;
  justify-content: space-between;
  padding: 10px;
  margin: 1%;
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
    <Page>
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
    </Page>
  );
};

export default withTranslation()(Home);
