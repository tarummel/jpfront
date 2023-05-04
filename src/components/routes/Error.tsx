import React, { useEffect } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button } from "../common/buttons";
import { useNavigate } from "react-router-dom";

const Body = styled.div`
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 1024px;
  width: 50%;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.header};
  padding-left: 20px;
  padding-top: 20px;
`;

const Message = styled.h2`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding-left: 20px;
  padding-top: 10px;
`;

const ButtonWrapper = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
  padding-top: 10px;
`;

const Error: React.FC<WithTranslation> = ({ t }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t("error.documentTitle");
  }, []);

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <Body>
      <Title>
        {t("error.pageNotFound")}
      </Title>
      <Message>
        {t("error.message")}
      </Message>
      <ButtonWrapper>
        <Button height={30} width={90} onClick={handleClick}>{t("error.goBack")}</Button>
      </ButtonWrapper>
    </Body>
  );
};

export default withTranslation()(Error);
