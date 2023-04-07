import React, { useEffect } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
  
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
  padding-top: 30px;
`;

const SectionTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  margin-left: 20px;
  margin-right: 45px;
`;

const Section = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  margin: 5px 45px 20px 45px;
`;

const Help: React.FC<WithTranslation> = ({ t }) => {

  useEffect(() => {
    document.title = t("help.documentTitle");
  }, []);

  return (
    <Body>
      <Banner>{t("help.helpAndFaq")}</Banner>
      <Card>
        <SectionTitle>1. {t("help.whatIsThisSiteTitle")}</SectionTitle>
        <Section>{t("help.whatIsThisSite")}</Section>
        <SectionTitle>3. {t("help.requestsTitle")}</SectionTitle>
        <Section>{t("help.requests")}</Section>
        <SectionTitle>4. {t("help.bugsTitle")}</SectionTitle>
        <Section>{t("help.bugs")}</Section>
        <SectionTitle>5. {t("help.suggestionsTitle")}</SectionTitle>
        <Section>{t("help.suggestions")}</Section>
      </Card>
    </Body>
  );
};

export default withTranslation()(Help);
