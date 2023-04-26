import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

const Container = styled.nav`
  background: ${({theme}) => theme.colors.buttonPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 24px;
  width: 100%;
`;

const HeaderButton = styled.button`
  background: ${({theme}) => theme.colors.buttonPrimary};
  border: none;
  display: flex;
  flex-direction: row;
  width: 100px;
  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
    border-left: 1px solid ${({theme}) => theme.colors.textPrimary};
    border-right: 1px solid ${({theme}) => theme.colors.textPrimary};
  }
`;

const ButtonText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.small};
  line-height: 24px;
  margin: 0 auto;
`;

const Header: React.FC<WithTranslation> = ({ t }) => {
  const navigate = useNavigate();

  const handleHomeNavClick = () => {
    navigate("/");
  };

  const handleLegalNavClick = () => {
    navigate("/legal");
  };

  const handleSettingsNavClick = () => {
    navigate("/settings");
  };

  const handleHelpNavClick = () => {
    navigate("/help");
  };

  return (
    <Container>
      <HeaderButton onClick={handleHomeNavClick}>
        <ButtonText>{t("header.home")}</ButtonText>
      </HeaderButton>
      <HeaderButton onClick={handleLegalNavClick}>
        <ButtonText>{t("header.legal")}</ButtonText>
      </HeaderButton>
      <HeaderButton onClick={handleSettingsNavClick}>
        <ButtonText>{t("header.settings")}</ButtonText>
      </HeaderButton>
      <HeaderButton onClick={handleHelpNavClick}>
        <ButtonText>{t("header.help")}</ButtonText>
      </HeaderButton>
    </Container>
  );
};

export default withTranslation()(Header);
