import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1024px;
  margin: 0 auto;
  padding-top: 10px;
  width: 50%;
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

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
`;

const SectionTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
`;

const Section = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding-left: 25px;
`;

const InfoLegal: React.FC<WithTranslation> = ({ t }) => { 
  return (
    <Body>
      <Banner>{t("infoLegal.informationAndLegal")}</Banner>
      <Card>
        <SectionTitle>{t("infoLegal.codeLegalTitle")}</SectionTitle>
        <Section>{t("infoLegal.codeLegal")}</Section>
        <SectionTitle>{t("infoLegal.edrdgLegalTitle")}</SectionTitle>
        <Section>{t("infoLegal.edrdgLegal")}</Section>
      </Card>
    </Body>
  );
};

export default withTranslation()(InfoLegal);
