import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import Button from "../common/buttons/Button";
import Config from "../../constants/Config";
import { NumberInput } from "../common";

const DEFAULT_LANGUAGE = "en";
const WIDGET_HEIGHT = 36;
const WIDGET_WIDTH = 100;

interface Props {
  setTheme: (theme: string) => void;
  theme: string;
}

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
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.header};
  padding: 20px;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  padding-top: 10px;
  padding-left: 20px;
`;

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${WIDGET_HEIGHT}px;
  padding: 10px 60px 0 60px;
`;

const Description = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  line-height: ${WIDGET_HEIGHT}px;
`;

const StyledSelect = styled.select`
  background-color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  height: ${WIDGET_HEIGHT}px;
  text-align: center;
  width: ${WIDGET_WIDTH}px;
`;

const StyledOption = styled.option`
  background-color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  height: ${WIDGET_HEIGHT}px;
  text-align: center;
  width: ${WIDGET_WIDTH}px;
`;

const Settings: React.FC<Props & WithTranslation> = ({ i18n, setTheme, t, theme }) => {
  // TODO: use i18n default
  const [language, setLanguage] = useState(Config.getStorage(Config.localStorage.language) || DEFAULT_LANGUAGE);
  const [historySize, setHistorySize] = useState(Config.getStorage(Config.localStorage.historySize) || Config.localStorage.historySizeDefault);

  useEffect(() => {
    document.title = t("settings.documentTitle");
  }, []);

  const handleLanguage = (e: any) => {
    const lang = e.target.value;
    Config.setStorage(Config.localStorage.language, lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const handleTheme = (e: any) => {
    const newTheme = e.target.value;
    Config.setStorage(Config.localStorage.theme, newTheme);
    setTheme(newTheme);
  };

  const handleClearHistory = () => {
    Config.setStorage(Config.localStorage.history, "[]");
  };

  const handleHistorySize = (e: any) => {
    const value = e.target.value;
    let size = parseInt(value);
    if (!(typeof size === "number")) {
      setHistorySize(12);
      return;
    }

    size = Math.min(Math.max(size, 0), 100);
    Config.setStorage(Config.localStorage.historySize, String(size));
    setHistorySize(size);
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
              <StyledOption value="jp">日本語</StyledOption>
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
              {/* <StyledOption value="purpleism">{t("settings.purpleism")}</StyledOption> */}
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
