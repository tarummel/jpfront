import React from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import { JEntry, JGlossary, JKanji, JReading, JSense, JSource } from "jmdict";

interface Props {
    entry: JEntry;
    num: number;
}

const EntryRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
`;

const RowNum = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Content = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  padding-left: 20px;
`;

const JEntryDisplay: React.FC<Props & WithTranslation> = ({ entry, num, t }) => {

  const getProperty = (name: string, data: [JKanji]|[JReading]|[JSense]|[JGlossary]|[JSource]|undefined, delimiter: string): any => {
    let values = null;
    if (data) {
      values = data.map((e) => {
        return e[name as keyof typeof e];
      }).join(delimiter);
    }
    return values;
  }

  const kcontents = getProperty('content', entry.jkanji, "; ");
  const rcontents = getProperty('content', entry.jreading, "; ");
  const glosses = entry.jsense?.map((js) => {
    return getProperty('gloss', js.jglossary, ' / ');
  }).join(", ");

  return (
    <EntryRow>
      <RowNum>{num+1}.</RowNum>
      <Content>{kcontents}</Content>
      <Content>{rcontents}</Content>
      <Content>{glosses}</Content>
    </EntryRow>
  );
}

export default withTranslation()(JEntryDisplay);
