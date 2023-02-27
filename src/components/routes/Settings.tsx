import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import Button from "../buttons/Button";

import Config from "../../constants/Config";
import { HorizontalDivider, Input } from "../common";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_THEME = "dark";
const DEFAULT_HISTORY_SIZE = 12;
const WIDGET_HEIGHT = 36;
const WIDGET_WIDTH = 100;

const Page = styled.div`
  margin: 2.5% 25% 2.5%;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  padding-top: 1px;
`;

const Banner = styled.h1`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textSecondary};
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.header};
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const SettingTitle = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  padding-left: 30px;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Setting = styled.div`
  display: flex;
  align-items: center;
  padding-right: 60px;
  justify-content: center;
`;

const Description = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding-left: 60px;
`;

const StyledSelect = styled.select`
  font-size: ${({theme}) => theme.fontSizes.medium};
  height: ${WIDGET_HEIGHT}px;
  text-align: center;
  width: ${WIDGET_WIDTH}px;
`;

const StyledOption = styled.option`
  font-size: ${({theme}) => theme.fontSizes.medium};
  height: ${WIDGET_HEIGHT}px;
  text-align: center;
  width: ${WIDGET_WIDTH}px;
`;

const Settings: React.FC<WithTranslation> = ({ i18n, t }) => {

  const [language, setLanguage] = useState(localStorage.getItem(Config.localStorage.language) || DEFAULT_LANGUAGE);
  const [theme, setTheme] = useState(localStorage.getItem(Config.localStorage.theme) || DEFAULT_THEME)
  const [historySize, setHistorySize] = useState(localStorage.getItem(Config.localStorage.historySize) || DEFAULT_HISTORY_SIZE);

  useEffect(() => {

  }, []);

  const handleLanguage = (e: any) => {
    const lang = e.target.value
    localStorage.setItem(Config.localStorage.language, lang);
    i18n.changeLanguage(lang)
    setLanguage(lang)
  };

  const handleTheme = (e: any) => {
    const theme = e.target.value
    localStorage.setItem(Config.localStorage.theme, theme)
    setTheme(theme)
  };

  const handleClearHistory = () => {
    localStorage.removeItem(Config.localStorage.history)
  };

  const handleHistorySize = (e: any) => {
    let val = e.target.value
    if (val < 0) {
      val = "0"
    }
    if (val > 100) {
      val = "100"
    }
    localStorage.setItem(Config.localStorage.historySize, val);
    setHistorySize(val)
  };

  return (
    <Page>
      <Banner>{t("settings.settings")}</Banner>
      <Card>
        <SettingTitle>{t("settings.language")}</SettingTitle>
        <HorizontalDivider />
        <SettingContainer>
          <Description>- {t("settings.languageDesc")}</Description>
          <Setting>
            <StyledSelect onChange={handleLanguage} placeholder={""} value={language}>
              <StyledOption value="en">English</StyledOption>
              <StyledOption value="jp">日本語</StyledOption>
            </StyledSelect>
          </Setting>
        </SettingContainer>

        <SettingTitle>{t("settings.theme")}</SettingTitle>
        <HorizontalDivider />
        <SettingContainer>
          <Description>- {t("settings.themeDesc")}</Description>
          <Setting>
            <StyledSelect onChange={handleTheme} placeholder={""} value={theme}>
              <StyledOption value="dark">{t("settings.dark")}</StyledOption>
              <StyledOption value="light">{t("settings.light")}</StyledOption>
            </StyledSelect>
          </Setting>
        </SettingContainer>

        <SettingTitle>{t("settings.history")}</SettingTitle>
        <HorizontalDivider />
        <SettingContainer>
          <Description>- {t("settings.historySizeDesc")}</Description>
          <Setting>
            <Input height={WIDGET_HEIGHT} onChange={handleHistorySize} placeholder={""} type={"search"} value={historySize} width={WIDGET_WIDTH}/>
          </Setting>
        </SettingContainer>
        <SettingContainer>
          <Description>- {t("settings.historyClearDesc")}</Description>
          <Setting>
            <Button height={WIDGET_HEIGHT} onClick={handleClearHistory} width={WIDGET_WIDTH}>{t("settings.historyClear")}</Button>
          </Setting>
        </SettingContainer>
      </Card>
    </Page>
  );
};

export default withTranslation()(Settings);
