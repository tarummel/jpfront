import React, { useState } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import { Collapsible, NumberInput } from "../../common";
import { VisualClosenessTupleArray } from "dataTypes";
import Config from "../../../constants/Config";


const HEAT_COLORS_ARRAY = ['#FF4500', '#FFA500', '#ffc700', '#ffe500', '#ffff00', '#d6ff2f', '#adff2f', '#7fff00', '#00ff00', '#24dd24', '#32cc32'];

interface Props {
  data: VisualClosenessTupleArray;
  loading: boolean;
  onSensitivityChange: (value: string) => void;
  open: boolean;
  sensitivity: string;
}

interface StampBGProp {
  color: string;
}

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;

const Group = styled.div`
  align-items: center;
  color: ${({theme}) => theme.colors.textPrimary};
  column-gap: 8px;
  display: grid;
  font-size: ${({theme}) => theme.fontSizes.medium};
  grid-template-columns: auto auto;
`;

const StampRow = styled.div`
  display: grid;
  grid-template-columns: repeat(10, calc(10% - 3px));
  column-gap: 3px;
  grid-auto-flow: column;
  padding-top: 10px;
  width: 100%;
`;

const Stamp = styled.div<StampBGProp>`
  aspect-ratio: 1 / 1.2;
  align-items: center;
  background-color: ${({color}) => color};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5px;
  padding-top: 5px;
  text-align: center;
`;

const Kanji = styled.div`
  color: ${({theme}) => theme.colors.textNegative};
  font-size: 60px;
  font-weight: bold;
`;

const Value = styled.div`
  color: ${({theme}) => theme.colors.textNegative};
  font-size: ${({theme}) => theme.fontSizes.xsmall};
`;

const VisualCloseness: React.FC<Props & WithTranslation> = ({ data, onSensitivityChange, open, sensitivity, t }) => {

  const [checked, setChecked] = useState(Config.getStorage(Config.localStorage.vcOpen) === "true" ? true : false);

  // intermediate step for checking input
  const checkSensitivity = (e: any) => {
    const value = e.target.value;
    const sense = Number(value);

    if (!(typeof sense === "number") || sense < 0.000 || sense > 1.000) {
      onSensitivityChange("0.000");
      return;
    }

    onSensitivityChange(value);
  };

  const handleDefaultOpenChange = () => {
    const c = !checked;
    Config.setStorage(Config.localStorage.vcOpen, c);
    setChecked(c);
  };

  const convertValueToColor = (value: string): string => {
    const num = Math.floor(Number(value) * 10);
    return HEAT_COLORS_ARRAY[num];
  };

  const generateList = () => {
    const visible = [];
    for (let i = 0; i < data.length; i++) {
      const tuple = data[i];
      if (Number(tuple[1]) >= Number(sensitivity)) {
        visible.push(tuple);
      }
    }
    return visible;
  };

  return (
    <Collapsible open={open} title={t("kanjiInfo.visualCloseness.visualCloseness")}>
      <ContentHeader>
        <Group>
          {t("kanjiInfo.visualCloseness.sensitivity")}:
          <NumberInput onChange={checkSensitivity} value={sensitivity} width={100} />
        </Group>
        <Group>
          {t("kanjiInfo.visualCloseness.defaultOpen")}:
          <input checked={checked} onChange={handleDefaultOpenChange} type="checkbox" />
        </Group>
      </ContentHeader>
      { data.length && (
        <StampRow>
          {generateList().map((tuple, i) => {
            return (
              <Stamp color={convertValueToColor(tuple[1])} key={i}>
                <Kanji>{tuple[0]}</Kanji>
                <Value>{tuple[1]}</Value>
              </Stamp>
            );
          })}
        </StampRow>
      )}
    </Collapsible>
  );
};

export default withTranslation()(VisualCloseness);
