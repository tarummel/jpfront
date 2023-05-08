import React, { useEffect } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import { Anchor } from "../common";

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
`;

const SectionTitle = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  padding-left: 20px;
  padding-top: 20px;
`;

const Section = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding: 10px 60px 0 60px;
`;

const Legal: React.FC<WithTranslation> = ({ t }) => {

  useEffect(() => {
    document.title = t("legal.documentTitle");
  }, []);

  const prefix = "";

  return (
    <Body>
      <Banner>{t("legal.aboutAndLegalInformation")}</Banner>
      <Card>
        <SectionTitle>{prefix}{t("legal.codeLegalTitle")}</SectionTitle>
        <Section>
          {t("legal.codeLegal")}
          <Anchor target="_blank" href={`${t("legal.codeLegalLink")}`}>{t("legal.codeLegalLink")}</Anchor>  
        </Section>
        <SectionTitle>{prefix}{t("legal.edrdgLegalTitle")}</SectionTitle>
        <Section>
          {t("legal.edrdgLegal")}
          <Anchor target="_blank" href={`${t("legal.edrdgLink")}`}>{t("legal.edrdgLink")}</Anchor>
        </Section>
        <SectionTitle>{prefix}{t("legal.skip")}</SectionTitle>
        <Section>
          {t("legal.skipLegal")}
          <Anchor target="_blank" href={`${t("legal.skipLink")}`}>{t("legal.skipLink")}</Anchor>
        </Section>
        <SectionTitle>{prefix}{t("legal.yenckenTitle")}</SectionTitle>
        <Section>
          {t("legal.yencken")}
          <Anchor target="_blank" href={`${t("legal.yenckenLink")}`}>{t("legal.yenckenLink")}</Anchor>
        </Section>
      </Card>
    </Body>
  );
};

export default withTranslation()(Legal);
