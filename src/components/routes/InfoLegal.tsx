import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

const Page = styled.div`
  margin: 2.5% 25% 2.5%;
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
    <Page>
      <Banner>{t("infoLegal.informationAndLegal")}</Banner>
      <Card>
        <SectionTitle>{t("infoLegal.codeLegalTitle")}</SectionTitle>
        <Section>{t("infoLegal.codeLegal")}</Section>
        <SectionTitle>{t("infoLegal.edrdgLegalTitle")}</SectionTitle>
        <Section>{t("infoLegal.edrdgLegal")}</Section>
      </Card>
    </Page>
  );
}

export default withTranslation()(InfoLegal);
