import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import styled from "styled-components";

import { JEntry, JGlossary, JKanji, JReading, JSense, JSource } from "jmdict";
import { Collapsible } from "../../common";

// const SHOW_DEFS_COUNT_DEFAULT = 4;

interface Props {
  entry: JEntry;
  num: number;
}

const BulletedList = styled.ul`
  list-style-type: circle;
  list-style-position: inside;
  padding-top: 4px;

  li {
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: ${({theme}) => theme.fontSizes.medium};
    padding-top: 4px;
  }
`;

const Suffixes = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Footnote = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSizes.small};
  padding-top: 8px;
`;

const JEntryDisplay: React.FC<Props & WithTranslation> = ({ entry, num, t }) => {
  // const [showMore, setShowMore] = useState(false);

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
  const suffixes = getProperty("parts_of_speech", entry.jsense)[0][0] || "";
  const misc = getProperty("misc", entry.jsense)[0] || "";
  const fields = getProperty("fields", entry.jsense)[0] || "";
  const information = getProperty("information", entry.jsense)[0] || "";
  const rcontents = getProperty("content", entry.jreading).join("; ");
  const glossesList = entry.jsense?.map((js) => {
    return getProperty("gloss", js.jglossary).join(", ");
  }) || [];

  return (
    <Collapsible number={num} title={rcontents}>
      <Suffixes>[ {suffixes} ]</Suffixes>
      <BulletedList>
        { glossesList.map((gloss, i) => {
          return <li key={i}>{gloss}</li>;
        })}
      </BulletedList>
      {fields.length && ( <Footnote>{t("kanjiInfo.jmdict.contexts")}: {fields}</Footnote> )}
      {information.length && ( <Footnote>{t("kanjiInfo.jmdict.notes")}: {information}</Footnote> )}
      {misc.length && ( <Footnote>{t("kanjiInfo.jmdict.other")}: {misc}</Footnote> )}
    </Collapsible>
  );
};

export default withTranslation()(JEntryDisplay);
