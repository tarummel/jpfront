import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import API from "../../API";
import { Anchor, ColumnSpacer, Spinner } from "../common";
import { GenericButton, RadicalStateButton } from "../buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import NumberedRadicalRow from "../NumberedRadicalRow";
import { RadicalsState, StrokeCharactersMap } from "dataTypes";

interface Props {}

interface StructuredRow {
  rows: number;
  columns: number;
}

type SortedRadicals = {
  t: string[];
  l: string[];
  e: string[];
  unc: { [stroke: string]: string[]; }
  r: { [stroke: string]: string[]; }
}

const ALL_RADICALS = ['一', '｜', '丶', 'ノ', '𠂉', '乙', '九', '亅', '二', '亠', '人', '⺅', '𠆢', '儿', '入', 'ハ', '丷', '冂', '冖', '冫', '几', '凵', '刀', '⺉', '力', '勹', '匕', '匚', '亡', '十', '卜', '卩', '厂', '厶', '又', '口', '品', '囗', '土', '士', '夂', '夊', '夕', '大', '女', '子', '宀', '寸', '小', '⺌', '尢', '尤', '尸', '屮', '山', '巛', '川', '工', '已', '巾', '干', '幺', '广', '廴', '廾', '弋', '弓', 'ヨ', '彑', '彡', '彳', '心', '⺖', '戈', '戸', '手', '扌', '支', '攵', '文', '斗', '斤', '方', '无', '無', '日', '曰', '月', '木', '欠', '止', '歹', '殳', '毋', '母', '比', '毛', '氏', '气', '水', '⺡', '火', '⺣', '爪', '父', '爻', '爿', '片', '牙', '牛', '犬', '⺨', '玄', '王', '瓜', '瓦', '甘', '生', '用', '田', '疋', '⽧', '癶', '白', '皮', '皿', '目', '矛', '矢', '石', '示', '⺭', '⽱', '禾', '穴', '立', '竹', '米', '糸', '缶', '⺲', '羊', '羽', '⺹', '而', '耒', '耳', '聿', '肉', '臣', '自', '至', '臼', '舌', '舛', '舟', '艮', '色', '⺾', '虍', '虫', '血', '行', '衣', '⻂', '西', '見', '角', '言', '谷', '豆', '豕', '豸', '貝', '赤', '走', '足', '身', '車', '辛', '辰', '⻌', '邑', '⻏', '酉', '釆', '里', '金', '長', '門', '⻖', '隶', '隹', '雨', '青', '非', '面', '革', '韋', '韭', '音', '頁', '風', '飛', '食', '首', '香', '馬', '骨', '高', '髟', '鬥', '鬯', '鬲', '鬼', '魚', '鳥', '鹵', '鹿', '麦', '麻', '黄', '黍', '黒', '黹', '黽', '鼎', '鼓', '鼠', '鼻', '齊', '斉', '歯', '竜', '亀', '龠', 'マ', 'ユ', '乃', '也', '及', '久', '元', '井', '勿', '五', '屯', '巴', '世', '巨', '冊', '奄', '岡', '免', '啇']

const SORTED_RADICALS:SortedRadicals = {"t": ["\u2e8c", "\u2eb2", "\u2eb9", "\u2ebe", "\u4ea0", "\u5196", "\u5b80", "\u7af9", "\u96e8", "\ud840\udc89", "\ud840\udda2"], "l": ["\u2e85", "\u2e96", "\u2ea1", "\u2ea8", "\u2ead", "\u2ec2", "\u2ed6", "\u51ab", "\u5f73", "\u624c", "\u723f", "\u866b", "\u8a00", "\u8db3", "\u8eca", "\u91d1", "\u98df", "\u9b5a"], "e": ["\u2ecc", "\u2f67", "\u5182", "\u51f5", "\u52f9", "\u531a", "\u5382", "\u56d7", "\u5c38", "\u5e7f", "\u5f0b", "\u6208", "\u864d", "\u9580"], "unc": {"2": ["\u30e6", "\u4e43"], "5": ["\u4e16", "\u5de8", "\u6bcd", "\u7384", "\u74dc", "\u74e6", "\u751f", "\u7676", "\u76ae"], "3": ["\u4e45", "\u4e5f", "\u4ea1", "\u53ca", "\u590a", "\u5c22", "\u5ddd", "\u5ef4", "\u5f51"], "11": ["\u4e80", "\u5547", "\u9e75", "\u9ebb", "\u9ec4", "\u9ed2"], "4": ["\u4e94", "\u4e95", "\u5143", "\u5c24", "\u5c6f", "\u6587", "\u6597", "\u65e0", "\u6bcb", "\u6bdb", "\u6c14", "\u7236", "\u723b", "\u7247", "\u7259"], "8": ["\u514d", "\u5944", "\u5ca1", "\u6589", "\u96b6", "\u9752"], "9": ["\u54c1", "\u9762", "\u97cb", "\u97ed", "\u98a8", "\u98db", "\u9996", "\u9999"], "12": ["\u6b6f", "\u7121", "\u9ecd", "\u9ef9"], "10": ["\u7adc", "\u9aa8", "\u9ad8", "\u9b25", "\u9b2f", "\u9b32", "\u9b3c"], "6": ["\u8012", "\u8089", "\u820c", "\u8272", "\u8840", "\u884c"], "7": ["\u821b", "\u89d2", "\u8c37", "\u8c78", "\u8d64", "\u8d70", "\u8eab", "\u8fb0", "\u9091", "\u91c6", "\u9ea6"], "13": ["\u9efd", "\u9f0e", "\u9f13", "\u9f20"], "14": ["\u9f3b", "\u9f4a"], "17": ["\u9fa0"]}, "r": {"2": ["\u2e89", "\u30cf", "\u30de", "\u4e37", "\u4e5d", "\u4e8c", "\u4eba", "\u513f", "\u5165", "\u51e0", "\u5200", "\u529b", "\u5315", "\u5341", "\u535c", "\u5369", "\u53b6", "\u53c8"], "4": ["\u2ea3", "\u52ff", "\u5df4", "\u5fc3", "\u6238", "\u624b", "\u652f", "\u6535", "\u65a4", "\u65b9", "\u65e5", "\u66f0", "\u6708", "\u6728", "\u6b20", "\u6b62", "\u6b79", "\u6bb3", "\u6bd4", "\u6c0f", "\u6c34", "\u706b", "\u722a", "\u725b", "\u72ac", "\u738b"], "3": ["\u2ecf", "\u30e8", "\u53e3", "\u571f", "\u58eb", "\u5902", "\u5915", "\u5927", "\u5973", "\u5b50", "\u5bf8", "\u5c0f", "\u5c6e", "\u5c71", "\u5ddb", "\u5de5", "\u5df2", "\u5dfe", "\u5e72", "\u5e7a", "\u5efe", "\u5f13", "\u5f61"], "5": ["\u2f71", "\u518a", "\u7518", "\u7528", "\u7530", "\u758b", "\u767d", "\u76bf", "\u76ee", "\u77db", "\u77e2", "\u77f3", "\u793a", "\u79be", "\u7a74", "\u7acb"], "1": ["\u30ce", "\u4e00", "\u4e36", "\u4e59", "\u4e85", "\uff5c"], "6": ["\u7c73", "\u7cf8", "\u7f36", "\u7f8a", "\u7fbd", "\u800c", "\u8033", "\u807f", "\u81ea", "\u81f3", "\u81fc", "\u821f", "\u826e", "\u8863", "\u897f"], "7": ["\u81e3", "\u898b", "\u8c46", "\u8c55", "\u8c9d", "\u8f9b", "\u9149", "\u91cc"], "8": ["\u9577", "\u96b9", "\u975e"], "9": ["\u9769", "\u97f3", "\u9801"], "10": ["\u99ac", "\u9adf"], "11": ["\u9ce5", "\u9e7f"]}}

const getDefaultRadicalsState = (): RadicalsState => {
  const state:RadicalsState = {}
  for (let i = 0; i < ALL_RADICALS.length; i++) {
    state[ALL_RADICALS[i]] = 1
  }
  return state
};

const DEFAULT_STATE = getDefaultRadicalsState()

const Page = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
  margin: 2.5% 2.5% 2.5% 55px;
`;

const FlexContainer = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: ${({theme}) => theme.fontSizes.medium};
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

const RowContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};  
  flex-direction: column;
  overflow-y: scroll;
`;

const TitleContainer = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const StructuredRow = styled.div<StructuredRow>`
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

const MultiradicalType: React.FC<Props & WithTranslation> = ({ t }) => {
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
      setRadicalsState(newState)
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
      <FlexContainer>
        <RadicalsBody>
          <LeftContainer>
            <TitleContainer>
              {t("multiType.enclose")}
              <StructuredRow columns={3} rows={5}>
                {SORTED_RADICALS["e"].map((s, i) => {
                  return <RadicalStateButton handleClick={handleSelection} key={i} radical={s} state={radicalsState[s]} />
                })}
              </StructuredRow>
            </TitleContainer>
            <TitleContainer>
              {t("multiType.left")}
              <StructuredRow columns={3} rows={6}>
                {SORTED_RADICALS["l"].map((s, i) => {
                  return <RadicalStateButton handleClick={handleSelection} key={i} radical={s} state={radicalsState[s]} />
                })}
              </StructuredRow>
            </TitleContainer>
          </LeftContainer>
          <RightContainer>
          <RadicalsHeaders>
            <TitleContainer>
              {t("multiType.top")}
              <StructuredRow columns={11} rows={1}>
                {SORTED_RADICALS["t"].map((s, i) => {
                  return <RadicalStateButton handleClick={handleSelection} key={i} radical={s} state={radicalsState[s]} />
                })}
              </StructuredRow>
            </TitleContainer>
          </RadicalsHeaders>
          <RowContainer>
            {Object.keys(SORTED_RADICALS["r"]).map((s, i) => {
              return <NumberedRadicalRow handleClick={handleSelection} key={i} radicals={SORTED_RADICALS["r"][s]} radicalsState={radicalsState} rowNumber={s} />
            })}
          </RowContainer>
        </RightContainer>
        </RadicalsBody>
        <Details>{t("multiType.uncommon")}</Details>
        <RowContainer>
          {Object.keys(SORTED_RADICALS["unc"]).map((s, i) => {
            return <NumberedRadicalRow handleClick={handleSelection} key={i} radicals={SORTED_RADICALS["unc"][s]} radicalsState={radicalsState} rowNumber={s} />
          })}
        </RowContainer>
      </FlexContainer>
      <ColumnSpacer width={30} />
      <FlexContainer>
        <History />
        <RowContainer>
          { Object.keys(kanjiData).map((s, i) => {
            return <NumberedKanjiRow key={i} kanji={kanjiData[s]} rowNumber={s} />
          })}
        </RowContainer>
      </FlexContainer>
    </Page>
  );
};

export default withTranslation()(MultiradicalType);
