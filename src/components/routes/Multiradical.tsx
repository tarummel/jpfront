import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { StrokeCharactersMap, RadicalsState } from "dataTypes";
import API from "../../api";
import NumberedRadicalRow from "../NumberedRadicalRow";
import NumberedKanjiRow from "../NumberedKanjiRow";
import ColumnSpacer from "../ColumnSpacer";

interface Props {}

const ALL_RADICALS:StrokeCharactersMap = {
  1: ["\u4e00", "\uff5c", "\u4e36", "\u30ce", "\u4e59", "\u4e85"],
  2: ["\ud840\udc89", "\u4e5d", "\u4e8c", "\u4ea0", "\u4eba", "\u2e85", "\ud840\udda2", "\u513f", "\u5165", "\u30cf", "\u4e37", "\u5182", "\u5196", "\u51ab", "\u51e0", "\u51f5", "\u5200", "\u2e89", "\u529b", "\u52f9", "\u5315", "\u531a", "\u5341", "\u535c", "\u5369", "\u5382", "\u53b6", "\u53c8", "\u30de", "\u30e6", "\u4e43"],
  3: ["\u4ea1", "\u53e3", "\u56d7", "\u571f", "\u58eb", "\u5902", "\u590a", "\u5915", "\u5927", "\u5973", "\u5b50", "\u5b80", "\u5bf8", "\u5c0f", "\u2e8c", "\u5c22", "\u5c38", "\u5c6e", "\u5c71", "\u5ddb", "\u5ddd", "\u5de5", "\u5df2", "\u5dfe", "\u5e72", "\u5e7a", "\u5e7f", "\u5ef4", "\u5efe", "\u5f0b", "\u5f13", "\u30e8", "\u5f51", "\u5f61", "\u5f73", "\u2e96", "\u624c", "\u2ea1", "\u2ea8", "\u2ebe", "\u2ecc", "\u2ecf", "\u2ed6", "\u4e5f", "\u53ca", "\u4e45"],
  4: ["\u5c24", "\u5fc3", "\u6208", "\u6238", "\u624b", "\u652f", "\u6535", "\u6587", "\u6597", "\u65a4", "\u65b9", "\u65e0", "\u65e5", "\u66f0", "\u6708", "\u6728", "\u6b20", "\u6b62", "\u6b79", "\u6bb3", "\u6bcb", "\u6bd4", "\u6bdb", "\u6c0f", "\u6c14", "\u6c34", "\u706b", "\u2ea3", "\u722a", "\u7236", "\u723b", "\u723f", "\u7247", "\u7259", "\u725b", "\u72ac", "\u738b", "\u2ead", "\u2eb9", "\u5143", "\u4e95", "\u52ff", "\u4e94", "\u5c6f", "\u5df4"],
  5: ["\u6bcd", "\u7384", "\u74dc", "\u74e6", "\u7518", "\u751f", "\u7528", "\u7530", "\u758b", "\u2f67", "\u7676", "\u767d", "\u76ae", "\u76bf", "\u76ee", "\u77db", "\u77e2", "\u77f3", "\u793a", "\u2f71", "\u79be", "\u7a74", "\u7acb", "\u2eb2", "\u2ec2", "\u4e16", "\u5de8", "\u518a"],
  6: ["\u7af9", "\u7c73", "\u7cf8", "\u7f36", "\u7f8a", "\u7fbd", "\u800c", "\u8012", "\u8033", "\u807f", "\u8089", "\u81ea", "\u81f3", "\u81fc", "\u820c", "\u821f", "\u826e", "\u8272", "\u864d", "\u866b", "\u8840", "\u884c", "\u8863", "\u897f"],
  7: ["\u81e3", "\u821b", "\u898b", "\u89d2", "\u8a00", "\u8c37", "\u8c46", "\u8c55", "\u8c78", "\u8c9d", "\u8d64", "\u8d70", "\u8db3", "\u8eab", "\u8eca", "\u8f9b", "\u8fb0", "\u9091", "\u9149", "\u91c6", "\u91cc", "\u9ea6"],
  8: ["\u91d1", "\u9577", "\u9580", "\u96b6", "\u96b9", "\u96e8", "\u9752", "\u975e", "\u6589", "\u5944", "\u5ca1", "\u514d"],
  9: ["\u54c1", "\u9762", "\u9769", "\u97cb", "\u97ed", "\u97f3", "\u9801", "\u98a8", "\u98db", "\u98df", "\u9996", "\u9999"],
  10: ["\u99ac", "\u9aa8", "\u9ad8", "\u9adf", "\u9b25", "\u9b2f", "\u9b32", "\u9b3c", "\u7adc"],
  11: ["\u9b5a", "\u9ce5", "\u9e75", "\u9e7f", "\u9ebb", "\u9ec4", "\u9ed2", "\u4e80", "\u5547"], 
  12: ["\u7121", "\u9ecd", "\u9ef9", "\u6b6f"],
  13: ["\u9efd", "\u9f0e", "\u9f13", "\u9f20"], 
  14: ["\u9f3b", "\u9f4a"], 
  17: ["\u9fa0"]
}

const getDefaultRadicalsState = (): RadicalsState => {
  const state:RadicalsState = {}
  for (const key in ALL_RADICALS) {
    const radicals = ALL_RADICALS[key]
    for (let i = 0; i < radicals.length; i++) {
      state[radicals[i]] = 1
    }
  };
  return state
}

const DEFAULT_STATE = getDefaultRadicalsState()

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const RowContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${({theme}) => theme.colors.elementPrimary};
`;

const Multiradical: React.FC<Props> = () => {

  const [radicalsState, setRadicalsState] = useState<RadicalsState>({...DEFAULT_STATE})
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([])
  const [kanjiData, setKanjiData] = useState<StrokeCharactersMap>({})

  useEffect(() => {
    let newState = {...DEFAULT_STATE}
    const getAndSetDisabledRadicals = async () => {
      const response = await API.getInvertedRadicalsSimplified(selectedRadicals)
      const data = response.data.data

      for (let i = 0; i < data.length; i++) {
        newState[data[i]] = 0
      }
      setRadicalsState({...newState})
    };

    if (selectedRadicals.length) {
      // add selected radicals
      for (let i = 0; i < selectedRadicals.length; i++) {
        newState[selectedRadicals[i]] = 2
      }
      // add disabled radicals
      getAndSetDisabledRadicals()
    } else {
      setRadicalsState(newState)
    }

    const getAndSetMatchingKanji = async () => {
      const response = await API.getMatchingKanjiByRadicalSimplified(selectedRadicals)
      setKanjiData(response.data.data)
    }

    // update shown kanji
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

  const handleSelection = (radical: string): void => {
    const newSelected = selectedRadicals.includes(radical) 
      ? arrayRemove(selectedRadicals, radical) 
      : selectedRadicals.concat(radical)

    setSelectedRadicals(newSelected)
  };

  return (
    <Container>
      <ColumnSpacer />
      <RowContainer>
        {Object.keys(ALL_RADICALS).map((s, i) => {
          return <NumberedRadicalRow key={i} radicals={ALL_RADICALS[s]} radicalsState={radicalsState} rowNumber={s} handleClick={handleSelection} />
        })};
      </RowContainer>
      <ColumnSpacer />
      <RowContainer>
        {Object.keys(kanjiData).map((s, i) => {
          return <NumberedKanjiRow key={i} kanji={kanjiData[s]} rowNumber={s} />
        })};
      </RowContainer>
      <ColumnSpacer />
    </Container>
  );
};

export default Multiradical;
