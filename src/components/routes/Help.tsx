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
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.header};
  padding: 20px;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const SectionTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  padding-left: 20px;
`;

const Section = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding: 10px 45px 10px 45px;
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
        <SectionTitle>2. {t("help.bugsTitle")}</SectionTitle>
        <Section>{t("help.bugs")}</Section>
        <SectionTitle>3. {t("help.suggestionsTitle")}</SectionTitle>
        <Section>{t("help.suggestions")}</Section>
        <SectionTitle>4. {t("help.requestsTitle")}</SectionTitle>
        <Section>{t("help.requests")}</Section>
      </Card>
    </Body>
  );
};

export default withTranslation()(Help);
