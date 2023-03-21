import React from "react";
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

const RowNum = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

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

const Notes = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSizes.small};
  padding-top: 8px;
  padding-left: 16px;
`;

const JEntryDisplay: React.FC<Props> = ({ entry, num }) => {

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
  const miscNote = getProperty('misc', entry.jsense)[0] || "";
  const rcontents = getProperty('content', entry.jreading).join("; ");
  const glosses = entry.jsense?.map((js) => {
    return getProperty('gloss', js.jglossary).join(" // ");
  }).join(", ");

  return (
    <EntryRow>
      {/* <RowNum>{num+1}.</RowNum> */}
      {/* <Content>{kcontents}</Content> */}
      <Suffixes>[{suffixes}]</Suffixes>
      <Content>{rcontents}</Content>
      <Content>{glosses}</Content>
      {
        miscNote.length && (
          <Notes>Note: {miscNote}</Notes>
        )
      }
    </EntryRow>
  );
};

export default JEntryDisplay;
