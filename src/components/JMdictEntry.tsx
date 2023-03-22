import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import styled from "styled-components";

import { JEntry, JGlossary, JKanji, JReading, JSense, JSource } from "jmdict";

interface Props {
  entry: JEntry;
  num: number;
}

const EntryRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 15px;
  padding-top: 15px;
  
`;

// const RowNum = styled.div`
//   color: ${({theme}) => theme.colors.textPrimary};
//   font-size: ${({theme}) => theme.fontSizes.medium};
// `;

const Content = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding-top: 8px;
  padding-left: 16px;
`;

const Suffixes = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding-left: 16px;
`;

const Footnote = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSizes.small};
  padding-top: 8px;
  padding-left: 16px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JEntryDisplay: React.FC<Props & WithTranslation> = ({ entry, num, t }) => {
  const getProperty = (name: string, data: [JKanji]|[JReading]|[JSense]|[JGlossary]|[JSource]|undefined): any => {
    let values = null;
    if (data) {
      values = data.map((e) => {
        return e[name as keyof typeof e];
      });
    }
    return values;
  };

  // const kcontents = getProperty('content', entry.jkanji).join("; ");
  const suffixes = getProperty('parts_of_speech', entry.jsense)[0][0] || "";
  const misc = getProperty('misc', entry.jsense)[0] || "";
  const fields = getProperty('fields', entry.jsense)[0] || "";
  const information = getProperty('information', entry.jsense)[0] || "";
  const rcontents = getProperty('content', entry.jreading).join("; ");
  const glosses = entry.jsense?.map((js) => {
    return getProperty('gloss', js.jglossary).join(" // ");
  }).join(", ");

  return (
    <EntryRow>
      {/* <RowNum>{num+1}.</RowNum> */}
      {/* <Content>{kcontents}</Content> */}
      <Suffixes>[ {suffixes} ]</Suffixes>
      <Content>{rcontents}</Content>
      <Content>{glosses}</Content>
      {fields.length && ( <Footnote>{t("kanjiInfo.jmdict.contexts")}: {fields}</Footnote> )}
      {information.length && ( <Footnote>{t("kanjiInfo.jmdict.notes")}: {information}</Footnote> )}
      {misc.length && ( <Footnote>{t("kanjiInfo.jmdict.other")}: {misc}</Footnote> )}
    </EntryRow>
  );
};

export default withTranslation()(JEntryDisplay);
