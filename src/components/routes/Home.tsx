import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { MainMenuButton } from "../buttons";
import SearchBar from "../common/SearchBar";
import { KDKanjiRandomParams } from "apiParamTypes";

const Body = styled.div`
  align-items: center;
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  min-width: 1024px;
  width: 50%;
`;

const Banner = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 48px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 10px;
`;

const RandomButtonWrapper = styled.div`
  margin-bottom: 40px;
`;

const RadicalsContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0px 10px 10px 10px;
`;

const OptionsTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.large};
  justify-content: center;
  line-height: 40px;
  margin-top: 5px;
`;

const OptionButtonWrapper = styled.div`
  margin-top: 10px;
`;

const Home: React.FC<WithTranslation> = ({ t }) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = t("home.documentTitle");
  }, []);

  const handleRandomNav = () => {
    const getAndNavigateRandom = async () => {
      const params = { kanji_only: true } as KDKanjiRandomParams;
      const response = await API.getKDKanjiRandom(params);
      const data = response.data.data;
      navigate(`/kanji/${data}`);
    };

    getAndNavigateRandom().catch((e) => {
      console.log(getAndNavigateRandom.name, e);
    });
  };

  const handleMultiradicalNavClick = () => {
    navigate(`/multiradical`);
  };

  const handleMultiradicalTypeNavClick = () => {
    navigate(`/multiradicaltype`);
  };

  const handleSkipNavClick = () => {
    navigate(`/skip`);
  };

  return (
    <Body>
      <Banner>{t("home.openKanji")}</Banner>
      <SearchBarWrapper>
        <SearchBar text={`${t("home.searchKanji")}...`}/>
      </SearchBarWrapper>
      <RandomButtonWrapper>
        <MainMenuButton onClick={handleRandomNav}>{t("home.random")}</MainMenuButton>
      </RandomButtonWrapper>
      <RadicalsContainer>
        <OptionsTitle>{t("home.searchByRadical")}</OptionsTitle>
        <OptionButtonWrapper>
          <MainMenuButton onClick={handleMultiradicalNavClick}>{t("home.multiradicalSearch")}</MainMenuButton>
        </OptionButtonWrapper>
        <OptionButtonWrapper>
          <MainMenuButton onClick={handleMultiradicalTypeNavClick}>{t("home.multiradicalSearchByType")}</MainMenuButton>  
        </OptionButtonWrapper>
        <OptionButtonWrapper>
          <MainMenuButton onClick={handleSkipNavClick}>{t("home.skip")}</MainMenuButton>
        </OptionButtonWrapper>
      </RadicalsContainer>
    </Body>
  );
};

export default withTranslation()(Home);
