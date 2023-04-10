import React, { useEffect, useLayoutEffect } from "react";
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

const AnchorWrapper = styled.div`
  margin-top: 5px;
  margin-left: 45px;
`;

const Legal: React.FC<WithTranslation> = ({ t }) => {

  useLayoutEffect(() => {
    document.title = t("legal.documentTitle");
  }, []);

  return (
    <Body>
      <Banner>{t("legal.aboutAndLegalInformation")}</Banner>
      <Card>
        <SectionTitle>- {t("legal.codeLegalTitle")}</SectionTitle>
        <Section>{t("legal.codeLegal")}</Section>
        <SectionTitle>- {t("legal.edrdgLegalTitle")}</SectionTitle>
        <AnchorWrapper>
          <Anchor target="_blank" href={`${t("legal.edrdgLink")}`}>{t("legal.edrdgLink")}</Anchor>
        </AnchorWrapper>
        <Section>{t("legal.edrdgLegal")}</Section>
        <SectionTitle>- {t("legal.skip")}</SectionTitle>
        <Section>{t("legal.skipLegal")}</Section>
      </Card>
    </Body>
  );
};

export default withTranslation()(Legal);
