import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";
import Anchor from "./common/Anchor";

interface Props {
  krad?: boolean;
  kanjidic?: boolean;
  jmdict?: boolean;
  skip?: boolean;
}

const Table = styled.ul`
  display: grid;
  row-gap: 4px;
  padding-top: 10px;
`;

const Item = styled.li`
  font-size: ${({theme}) => theme.fontSizes.xsmall};
`; 

const LicenseAgreement: React.FC<Props & WithTranslation> = ({ krad, kanjidic, jmdict, skip, t }) => {
  return (
    <Table>
      {krad && ( <Anchor target={"_blank"} href={`${t("legal.kradfileLink")}`}><Item>{t("legal.kradfile")}</Item></Anchor>)}
      {kanjidic && ( <Anchor target={"_blank"} href={`${t("legal.kanjidictLink")}`}><Item>{t("legal.kanjidic")}</Item></Anchor>)}
      {jmdict && ( <Anchor target={"_blank"} href={`${t("legal.jmdictLink")}`}><Item>{t("legal.jmdict")}</Item></Anchor>)}
      {skip && ( <Anchor target={"_blank"} href={`${t("legal.skipLink")}`}><Item>{t("legal.skipLegal")}</Item></Anchor>)}
    </Table>
  );
};

export default withTranslation()(LicenseAgreement);