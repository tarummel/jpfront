import React, { useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import Button from "../buttons/Button";
import Config from "../../constants/Config";
import { NumberInput } from "../common";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_THEME = "dark";
const DEFAULT_HISTORY_SIZE = 12;
const WIDGET_HEIGHT = 36;
const WIDGET_WIDTH = 100;

const Body = styled.div`
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  min-width: 1024px;
  width: 50%;
`;

const Banner = styled.h1`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.header};
  margin: 10px auto;
  padding: 10px 20px 10px 20px;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  border-bottom: 1px solid ${({theme}) => theme.colors.textSecondary};;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  margin-top: 5px;
  margin-left: 20px;
`;

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${WIDGET_HEIGHT}px;
  margin: 10px 60px 10px 60px;
`;

const Description = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  line-height: ${WIDGET_HEIGHT}px;
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
  const [theme, setTheme] = useState(localStorage.getItem(Config.localStorage.theme) || DEFAULT_THEME);
  const [historySize, setHistorySize] = useState(localStorage.getItem(Config.localStorage.historySize) || DEFAULT_HISTORY_SIZE);

  const handleLanguage = (e: any) => {
    const lang = e.target.value;
    localStorage.setItem(Config.localStorage.language, lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const handleTheme = (e: any) => {
    const theme = e.target.value;
    localStorage.setItem(Config.localStorage.theme, theme);
    setTheme(theme);
  };

  const handleClearHistory = () => {
    localStorage.removeItem(Config.localStorage.history);
  };

  const handleHistorySize = (e: any) => {
    const value = e.target.value;
    let num = parseInt(value);
    if (!(typeof num === "number")) {
      setHistorySize(12);
      return;
    }

    num = Math.min(Math.max(num, 0), 100);
    localStorage.setItem(Config.localStorage.historySize, String(num));
    setHistorySize(num);
  };

  return (
    <Body>
      <Banner>{t("settings.settings")}</Banner>
      <Card>
        <SettingContainer>
          <SettingTitle>{'>'} {t("settings.language")}</SettingTitle>
          <Setting>
            <Description>- {t("settings.languageDesc")}</Description>
            <StyledSelect onChange={handleLanguage} placeholder={""} value={language}>
              <StyledOption value="en">English</StyledOption>
              <StyledOption value="jp">?????????</StyledOption>
            </StyledSelect>
          </Setting>
        </SettingContainer>
        <SettingContainer>
          <SettingTitle>{'>'} {t("settings.theme")}</SettingTitle>
          <Setting>
            <Description>- {t("settings.themeDesc")}</Description>
            <StyledSelect onChange={handleTheme} placeholder={""} value={theme}>
              <StyledOption value="dark">{t("settings.dark")}</StyledOption>
              <StyledOption value="light">{t("settings.light")}</StyledOption>
            </StyledSelect>
          </Setting>
        </SettingContainer>
        <SettingContainer>
          <SettingTitle>{'>'} {t("settings.history")}</SettingTitle>
          <Setting>
            <Description>- {t("settings.historySizeDesc")}</Description>
            <NumberInput height={WIDGET_HEIGHT} onChange={handleHistorySize} placeholder={""} value={historySize} width={WIDGET_WIDTH}/>
          </Setting>
          <Setting>
            <Description>- {t("settings.historyClearDesc")}</Description>
            <Button height={WIDGET_HEIGHT} onClick={handleClearHistory} width={WIDGET_WIDTH}>{t("settings.historyClear")}</Button>
          </Setting>
        </SettingContainer>
      </Card>
    </Body>
  );
};

export default withTranslation()(Settings);
