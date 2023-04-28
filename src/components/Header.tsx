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
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.small};
  line-height: 20px;
  width: 100px;

  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
    border-left: 1px dotted ${({theme}) => theme.colors.textPrimary};
    border-right: 1px dotted ${({theme}) => theme.colors.textPrimary};
  }
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
        {t("header.home")}
      </HeaderButton>
      <HeaderButton onClick={handleHelpNavClick}>
        {t("header.help")}
      </HeaderButton>
      <HeaderButton onClick={handleLegalNavClick}>
        {t("header.legal")}
      </HeaderButton>
      <HeaderButton onClick={handleSettingsNavClick}>
        {t("header.settings")}
      </HeaderButton>
    </Container>
  );
};

export default withTranslation()(Header);
