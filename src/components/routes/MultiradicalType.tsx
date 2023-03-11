import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { Anchor, ColumnSpacer, Spinner } from "../common";
import { Button, StateButton } from "../buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import NumberedRadicalRow from "../NumberedRadicalRow";
import { RadicalsState, StrokeCharactersMap } from "dataTypes";
import { MatchingKanjiByRadicalsParams, RelatedRadicalsParams } from "apiParamTypes";

interface RowsColumns {
  rows: number;
  columns: number;
}

type SortedRadicals = {
  t: string[];
  l: string[];
  e: string[];
  u: { [stroke: string]: string[]; }
  r: { [stroke: string]: string[]; }
}

const ALL_RADICALS = ["一", "｜", "丶", "ノ", "𠂉", "乙", "九", "亅", "二", "亠", "人", "⺅", "𠆢", "儿", "入", "ハ", "丷", "冂", "冖", "冫", "几", "凵", "刀", "⺉", "力", "勹", "匕", "匚", "亡", "十", "卜", "卩", "厂", "厶", "又", "口", "品", "囗", "土", "士", "夂", "夊", "夕", "大", "女", "子", "宀", "寸", "小", "⺌", "尢", "尤", "尸", "屮", "山", "巛", "川", "工", "已", "巾", "干", "幺", "广", "廴", "廾", "弋", "弓", "ヨ", "彑", "彡", "彳", "心", "⺖", "戈", "戸", "手", "扌", "支", "攵", "文", "斗", "斤", "方", "无", "無", "日", "曰", "月", "木", "欠", "止", "歹", "殳", "毋", "母", "比", "毛", "氏", "气", "水", "⺡", "火", "⺣", "爪", "父", "爻", "爿", "片", "牙", "牛", "犬", "⺨", "玄", "王", "瓜", "瓦", "甘", "生", "用", "田", "疋", "⽧", "癶", "白", "皮", "皿", "目", "矛", "矢", "石", "示", "⺭", "⽱", "禾", "穴", "立", "竹", "米", "糸", "缶", "⺲", "羊", "羽", "⺹", "而", "耒", "耳", "聿", "肉", "臣", "自", "至", "臼", "舌", "舛", "舟", "艮", "色", "⺾", "虍", "虫", "血", "行", "衣", "⻂", "西", "見", "角", "言", "谷", "豆", "豕", "豸", "貝", "赤", "走", "足", "身", "車", "辛", "辰", "⻌", "邑", "⻏", "酉", "釆", "里", "金", "長", "門", "⻖", "隶", "隹", "雨", "青", "非", "面", "革", "韋", "韭", "音", "頁", "風", "飛", "食", "首", "香", "馬", "骨", "高", "髟", "鬥", "鬯", "鬲", "鬼", "魚", "鳥", "鹵", "鹿", "麦", "麻", "黄", "黍", "黒", "黹", "黽", "鼎", "鼓", "鼠", "鼻", "齊", "斉", "歯", "竜", "亀", "龠", "マ", "ユ", "乃", "也", "及", "久", "元", "井", "勿", "五", "屯", "巴", "世", "巨", "冊", "奄", "岡", "免", "啇"];

const SORTED_RADICALS:SortedRadicals = {
  "t": ["𠂉", "亠", "𠆢", "冖", "宀", "⺌", "⺾", "⺹", "⺲", "竹", "雨"],
  "e": ["冂", "凵", "勹", "匚", "厂", "囗", "尸", "广", "弋", "⻌", "戈", "⽧", "虍", "門"],
  "l": ["⺅", "冫", "彳", "⺖", "扌", "⺡", "⺨", "⻖", "爿", "⺭", "⻂", "虫", "言", "足", "車", "金", "食", "魚"],
  "r": {
    "1": ["一", "｜", "丶", "ノ", "乙", "亅"],
    "2": ["九", "二", "人", "儿", "入", "ハ", "丷", "几", "刀", "⺉", "力", "匕", "十", "卜", "卩", "厶", "又", "マ"],
    "3": ["口", "土", "士", "夂", "夕", "大", "女", "子", "寸", "小", "屮", "山", "巛", "工", "已", "巾", "干", "幺", "廾", "弓", "ヨ", "彡", "⻏"],
    "4": ["心", "戸", "手", "支", "攵", "斤", "方", "日", "曰", "月", "木", "欠", "止", "歹", "殳", "比", "氏", "水", "火", "⺣", "爪", "牛", "犬", "王", "勿", "巴"],
    "5": ["甘", "用", "田", "疋", "白", "皿", "目", "矛", "矢", "石", "示", "⽱", "禾", "穴", "立", "冊"],
    "6": ["米", "糸", "缶", "羊", "羽", "而", "耳", "聿", "自", "至", "臼", "舟", "艮", "衣", "西"],
    "7": ["臣", "見", "豆", "豕", "貝", "辛", "酉", "里"],
    "8": ["長", "隹", "非"],
    "9": ["革", "音", "頁"],
    "10": ["馬", "髟"],
    "11": ["鳥", "鹿"]
  },
  "u": {
    "2": ["ユ", "乃"],
    "3": ["亡", "夊", "尢", "川", "廴", "彑", "久", "也", "及"],
    "4": ["尤", "文", "斗", "无", "毋", "毛", "气", "父", "爻", "片", "牙", "五", "井", "元", "屯"],
    "5": ["母", "玄", "瓜", "瓦", "生", "癶", "皮", "世", "巨"],
    "6": ["耒", "肉", "舌", "色", "血", "行"],
    "7": ["舛", "角", "谷", "豸", "赤", "走", "身", "辰", "邑", "釆", "麦"],
    "8": ["隶", "青", "斉", "免", "奄", "岡"],
    "9": ["品", "面", "韋", "韭", "風", "飛", "首", "香"],
    "10": ["骨", "高", "鬥", "鬯", "鬲", "鬼", "竜"],
    "11": ["鹵", "麻", "黄", "黒", "亀", "啇"],
    "12": ["無", "黍", "黹", "歯"],
    "13": ["黽", "鼎", "鼓", "鼠"],
    "14": ["鼻", "齊"],
    "17": ["龠"]
  }
};

const getDefaultRadicalsState = (): RadicalsState => {
  const state:RadicalsState = {};
  for (let i = 0; i < ALL_RADICALS.length; i++) {
    state[ALL_RADICALS[i]] = 1;
  }
  return state;
};

const DEFAULT_STATE = getDefaultRadicalsState();

const Body = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 1024px;
  margin: 0 auto;
  padding-top: 10px;
  width: 80%;
`;

const ContentContainer = styled.div`
  border-radius: 5px;
  flex: 1;
  flex-direction: column;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 41px;
  padding-right: 2px;
`;

const RadicalsBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadicalsHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;
  margin-left: 37px;
`;

const TitleContainer = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const SpinnerButtonPair = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4px;
`;

const MiniSpinner = styled.div`
  padding-bottom: 4px;
  padding-right: 10px;
`;

const BigSpinner = styled.div`
  padding: 20px;
`;

const RowContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  flex-direction: column;
  overflow-y: scroll;
`;

const StructuredRow = styled.div<RowsColumns>`
  background: ${({theme}) => theme.colors.elementPrimary};
  display: flex;
  flex-wrap: wrap;
  height: ${({rows}) => 38 * rows}px;
  padding: 1px;
  width: ${({columns}) => 38 * columns}px;
`;

const Details = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.small};
`;

const Disclaimer = styled.p`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const MultiradicalType: React.FC<WithTranslation> = ({ t }) => {
  const [radicalsState, setRadicalsState] = useState<RadicalsState>({...DEFAULT_STATE});
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([]);
  const [kanjiData, setKanjiData] = useState<StrokeCharactersMap>({});
  const [radicalsLoading, setRadicalsLoading] = useState(false);
  const [kanjiLoading, setKanjiLoading] = useState(false);

  useEffect(() => {
    const newState = {...DEFAULT_STATE};
    const getAndSetDisabledRadicals = async () => {
      setRadicalsLoading(true);

      const params = { simple: true, invert: true } as RelatedRadicalsParams;
      const response = await API.getRelatedRadicalsByRadicals(selectedRadicals, params);
      const data = response.data.data;

      for (let i = 0; i < data.length; i++) {
        newState[data[i]] = 0;
      }

      setRadicalsState({...newState});
      setRadicalsLoading(false);
    };

    if (selectedRadicals.length) {
      for (let i = 0; i < selectedRadicals.length; i++) {
        newState[selectedRadicals[i]] = 2;
      }

      getAndSetDisabledRadicals().catch((e) => {
        console.log(getAndSetDisabledRadicals.name, e);
      });
    } else {
      setRadicalsState(newState);
    }

    const getAndSetMatchingKanji = async () => {
      setKanjiLoading(true);
      const params = { simple: true } as MatchingKanjiByRadicalsParams;
      const response = await API.getMatchingKDKanjiByRadicals(selectedRadicals, params);
      setKanjiData(response.data.data);
      setKanjiLoading(false);
    };

    if (selectedRadicals.length) {
      getAndSetMatchingKanji().catch((e) => { 
        console.log(getAndSetMatchingKanji.name, e);
      });
    } else {
      setKanjiData({});
    }
  }, [selectedRadicals]);

  const arrayRemove = (arr: string[], val: string): string[] => { 
    return arr.filter((ele) => {
      return ele !== val;
    });
  };

  const handleClickReset = (): void => {
    setRadicalsState({...DEFAULT_STATE});
    setKanjiData({});
    setSelectedRadicals([]);
  };

  const handleSelection = (radical: string): void => {
    const newSelected = selectedRadicals.includes(radical) 
      ? arrayRemove(selectedRadicals, radical) 
      : selectedRadicals.concat(radical);

    setSelectedRadicals(newSelected);
  };

  return (
    <Body>
      <ContentContainer>
        <RadicalsBody>
          <LeftContainer>
            <TitleContainer>
              {t("multiType.enclose")}
              <StructuredRow columns={3} rows={5}>
                {SORTED_RADICALS["e"].map((s, i) => {
                  return <StateButton key={i} callback={s} handleClick={handleSelection} state={radicalsState[s]}>{s}</StateButton>;
                })}
              </StructuredRow>
            </TitleContainer>
            <TitleContainer>
              {t("multiType.left")}
              <StructuredRow columns={3} rows={6}>
                {SORTED_RADICALS["l"].map((s, i) => {
                  return <StateButton key={i} callback={s} handleClick={handleSelection} state={radicalsState[s]}>{s}</StateButton>;
                })}
              </StructuredRow>
            </TitleContainer>
          </LeftContainer>
          <RightContainer>
            <RadicalsHeaders>
              <TitleContainer>
                {t("multiType.top")}
                <StructuredRow columns={6} rows={2}>
                  {SORTED_RADICALS["t"].map((s, i) => {
                    return <StateButton key={i} callback={s} handleClick={handleSelection} state={radicalsState[s]}>{s}</StateButton>;
                  })}
                </StructuredRow>
              </TitleContainer>
              <SpinnerButtonPair>
                { radicalsLoading && (
                  <MiniSpinner>
                    <Spinner size={20} />
                  </MiniSpinner>
                )}
                <Button height={32} onClick={handleClickReset} width={100}>{t("multi.reset")}</Button>
              </SpinnerButtonPair>
            </RadicalsHeaders>
            <RowContainer>
              {Object.keys(SORTED_RADICALS["r"]).map((s, i) => {
                return <NumberedRadicalRow handleClick={handleSelection} key={i} radicals={SORTED_RADICALS["r"][s]} radicalsState={radicalsState} rowNumber={s} />;
              })}
            </RowContainer>
          </RightContainer>
        </RadicalsBody>
        <Details>{t("multiType.uncommon")}</Details>
        <RowContainer>
          {Object.keys(SORTED_RADICALS["u"]).map((s, i) => {
            return <NumberedRadicalRow handleClick={handleSelection} key={i} radicals={SORTED_RADICALS["u"][s]} radicalsState={radicalsState} rowNumber={s} />;
          })}
        </RowContainer>
        <Disclaimer>{t("legal.kradfile")} <Anchor target={"_blank"} href={`${t("legal.kradfileLink")}`}>Link</Anchor></Disclaimer>
      </ContentContainer>
      <ColumnSpacer minWidth={"4px"} width={"1%"} />
      <ContentContainer>
        <History />
        <RowContainer>
          { kanjiLoading && (
            <BigSpinner>
              <Spinner size={40} />
            </BigSpinner>
          )}
          { !kanjiLoading && Object.keys(kanjiData).map((s, i) => {
            return <NumberedKanjiRow key={i} kanji={kanjiData[s]} rowNumber={s} />;
          })}
        </RowContainer>
      </ContentContainer>
    </Body>
  );
};

export default withTranslation()(MultiradicalType);
