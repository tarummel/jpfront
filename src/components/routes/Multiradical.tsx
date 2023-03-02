import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { Anchor, ColumnSpacer, Spinner } from "../common";
import { GenericButton } from "../buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import NumberedRadicalRow from "../NumberedRadicalRow";
import { RadicalsState, StrokeCharactersMap } from "dataTypes";

const ALL_RADICALS:StrokeCharactersMap = {
  1: ["一", "｜", "丶", "ノ", "乙", "亅"],
  2: ["𠂉", "九", "二", "亠", "人", "⺅", "𠆢", "儿", "入", "ハ", "丷", "冂", "冖", "冫", "几", "凵", "刀", "⺉", "力", "勹", "匕", "匚", "十", "卜", "卩", "厂", "厶", "又", "マ", "ユ", "乃"],
  3: ["亡", "口", "囗", "土", "士", "夂", "夊", "夕", "大", "女", "子", "宀", "寸", "小", "⺌", "尢", "尸", "屮", "山", "巛", "川", "工", "已", "巾", "干", "幺", "广", "廴", "廾", "弋", "弓", "ヨ", "彑", "彡", "彳", "⺖", "扌", "⺡", "⺨", "⺾", "⻌", "⻏", "⻖", "也", "及", "久"],
  4: ["尤", "心", "戈", "戸", "手", "支", "攵", "文", "斗", "斤", "方", "无", "日", "曰", "月", "木", "欠", "止", "歹", "殳", "毋", "比", "毛", "氏", "气", "水", "火", "⺣", "爪", "父", "爻", "爿", "片", "牙", "牛", "犬", "王", "⺭", "⺹", "元", "井", "勿", "五", "屯", "巴"],
  5: ["母", "玄", "瓜", "瓦", "甘", "生", "用", "田", "疋", "⽧", "癶", "白", "皮", "皿", "目", "矛", "矢", "石", "示", "⽱", "禾", "穴", "立", "⺲", "⻂", "世", "巨", "冊"],
  6: ["竹", "米", "糸", "缶", "羊", "羽", "而", "耒", "耳", "聿", "肉", "自", "至", "臼", "舌", "舟", "艮", "色", "虍", "虫", "血", "行", "衣", "西"],
  7: ["臣", "舛", "見", "角", "言", "谷", "豆", "豕", "豸", "貝", "赤", "走", "足", "身", "車", "辛", "辰", "邑", "酉", "釆", "里", "麦"],
  8: ["金", "長", "門", "隶", "隹", "雨", "青", "非", "斉", "奄", "岡", "免"],
  9: ["品", "面", "革", "韋", "韭", "音", "頁", "風", "飛", "食", "首", "香"],
  10: ["馬", "骨", "高", "髟", "鬥", "鬯", "鬲", "鬼", "竜"],
  11: ["魚", "鳥", "鹵", "鹿", "麻", "黄", "黒", "亀", "啇"],
  12: ["無", "黍", "黹", "歯"],
  13: ["黽", "鼎", "鼓", "鼠"],
  14: ["鼻", "齊"],
  17: ["龠"]
};

const getDefaultRadicalsState = (): RadicalsState => {
  const state:RadicalsState = {}
  for (const key in ALL_RADICALS) {
    const radicals = ALL_RADICALS[key]
    for (let i = 0; i < radicals.length; i++) {
      state[radicals[i]] = 1
    }
  };
  return state
};

const DEFAULT_STATE = getDefaultRadicalsState()

const Page = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
  margin: 2.5% 2.5% 2.5% 55px;
`;

const ContentContainer = styled.div`
  display: flex;
  border-radius: 5px;
  flex: 1;
  flex-direction: column;
`;

const RadicalHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const StrokesText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.small};
  padding-top: 13px;
`;

const RowContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};  
  flex-direction: column;
  overflow-y: scroll;
`;

const BigSpinner = styled.div`
  padding: 20px;
`;

const SpinnerButtonPair = styled.div`
  display: flex;
  flex-direction: row;
`;

const MiniSpinner = styled.div`
  padding-top: 4px;
  padding-right: 10px;
`;

const Instructions = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.small};
`;

const Disclaimer = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.small};
`;

const Multiradical: React.FC<WithTranslation> = ({ t }) => {
  const [radicalsState, setRadicalsState] = useState<RadicalsState>({...DEFAULT_STATE})
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([])
  const [kanjiData, setKanjiData] = useState<StrokeCharactersMap>({})
  const [radicalsLoading, setRadicalsLoading] = useState(false)
  const [kanjiLoading, setKanjiLoading] = useState(false)

  useEffect(() => {
    let newState = {...DEFAULT_STATE}
    const getAndSetDisabledRadicals = async () => {
      setRadicalsLoading(true)
      const response = await API.getInvertedRadicalsSimplified(selectedRadicals)
      const data = response.data.data
      
      for (let i = 0; i < data.length; i++) {
        newState[data[i]] = 0
      }

      setRadicalsState({...newState})
      setRadicalsLoading(false)
    };

    if (selectedRadicals.length) {
      for (let i = 0; i < selectedRadicals.length; i++) {
        newState[selectedRadicals[i]] = 2
      }

      getAndSetDisabledRadicals()
    } else {
      setRadicalsState({...newState})
    }

    const getAndSetMatchingKanji = async () => {
      setKanjiLoading(true)
      const response = await API.getMatchingKanjiByRadicalSimplified(selectedRadicals)
      setKanjiData(response.data.data)
      setKanjiLoading(false)
    }

    if (selectedRadicals.length) {
      getAndSetMatchingKanji()
    } else {
      setKanjiData({})
    }
  }, [selectedRadicals]);

  const arrayRemove = (arr: string[], val: string): string[] => { 
    return arr.filter((ele) => {
        return ele !== val;
    });
  };

  const handleClickReset = (): void => {
    setRadicalsState({...DEFAULT_STATE})
    setKanjiData({})
    setSelectedRadicals([])
  };

  const handleSelection = (radical: string): void => {
    const newSelected = selectedRadicals.includes(radical) 
      ? arrayRemove(selectedRadicals, radical) 
      : selectedRadicals.concat(radical)

    setSelectedRadicals(newSelected)
  };

  return (
    <Page>
      <ContentContainer>
        <Instructions>*{t("multi.instructions")}*</Instructions>
        <RadicalHeaders>
          <StrokesText>{t("multi.strokes")}</StrokesText>
          <SpinnerButtonPair>
            { radicalsLoading && (
              <MiniSpinner>
                <Spinner size={20} />
              </MiniSpinner>
            )}
            <GenericButton height={32} onClick={handleClickReset} width={100}>{t("multi.reset")}</GenericButton>
          </SpinnerButtonPair>
        </RadicalHeaders>
        <RowContainer>
          {Object.keys(ALL_RADICALS).map((s, i) => {
            return <NumberedRadicalRow handleClick={handleSelection} key={i} radicals={ALL_RADICALS[s]} radicalsState={radicalsState} rowNumber={s} />
          })};
        </RowContainer>
        <Disclaimer>{t("legal.kradfile")} <Anchor target={"_blank"} href={`${t("legal.kradfileLink")}`}>Link</Anchor></Disclaimer>
      </ContentContainer>
      <ColumnSpacer width={30} />
      <ContentContainer>
        <History />
        <RowContainer>
          { kanjiLoading && (
            <BigSpinner>
              <Spinner size={40} />
            </BigSpinner>
          )}
          { !kanjiLoading && (Object.keys(kanjiData).map((s, i) => {
            return <NumberedKanjiRow key={i} kanji={kanjiData[s]} rowNumber={s} />
          }))};
        </RowContainer>
      </ContentContainer>
    </Page>
  );
};

export default withTranslation()(Multiradical);
