import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import { Anchor } from "../common";

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 1024px;
  padding-top: 10px;
  width: 50%;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 20px 20px 20px;
  margin-top: 40px;
  max-width: 676px;
`;

const Header = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.header};
`;

const Text = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Error: React.FC<WithTranslation> = ({ t }) => { 
  return (
    <Body>
      <Card>
        <Header>
          {t("error.pageNotFound")}
        </Header>
        <Text>
          {t("error.message")}
        </Text>
        <Anchor target="_self" href={"/"}>{t("error.home")}</Anchor>
      </Card>
    </Body>
  );
};

export default withTranslation()(Error);
