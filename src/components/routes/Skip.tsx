import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

interface Props {}

const Page = styled.div`

`;

const Skip: React.FC<WithTranslation> = ({ t }) => { 
  return (
    <Page>Skip Code Page</Page>
  );
}

export default withTranslation()(Skip);
