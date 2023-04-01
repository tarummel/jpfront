import React, { useEffect } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import { Anchor } from "../common";

const Body = styled.div`
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 1024px;
  padding: 10px;
  width: 50%;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.header};
`;

const Message = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Error: React.FC<WithTranslation> = ({ t }) => {

  useEffect(() => {
    document.title = t("error.documentTitle");
  }, []);

  return (
    <Body>
      <Title>
        {t("error.pageNotFound")}
      </Title>
      <Message>
        {t("error.message")}
      </Message>
      <Anchor target="_self" href={"/"}>{t("error.home")}</Anchor>
    </Body>
  );
};

export default withTranslation()(Error);
