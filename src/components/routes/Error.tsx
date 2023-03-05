import React from "react";
import styled from "styled-components"
import { withTranslation, WithTranslation } from "react-i18next";
import { Anchor } from "../common";

interface Props {}
  
const Page = styled.div`
  margin-left: 5%;
  margin-top: 5%;
  width: 50%;
`;

const Card = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  border-radius: 5px;  
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  padding: 10px 20px 20px 20px;
  justify-content: flex-start;
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
    <Page>
      <Card>
        <Header>
          {t("error.pageNotFound")}
        </Header>
        <Text>
          {t("error.message")}
        </Text>
        <Anchor target="_self" href={"/"}>{t("error.home")}</Anchor>
      </Card>
    </Page>
  );
}

export default withTranslation()(Error);
