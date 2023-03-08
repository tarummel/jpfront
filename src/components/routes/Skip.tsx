import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import { ColumnSpacer, NumberInput, Spinner } from "../common";
import { Button, StateButton } from "../buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import { StrokeCharactersMap } from "dataTypes";
import API from "../../API";


const ADD_SUBTRACT_HEIGHT_SIZE = 40;
const ADD_SUBTRACT_WIDTH_SIZE = 60;

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

const Categories = styled.div`

`;

const RowContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};  
  flex-direction: column;
  overflow-y: scroll;
`;

const SpinnerWrapper = styled.div`
  padding: 20px;
`;

const SVG = styled.svg`
  height: 250px;
  width: 250px;
  color: ${({theme}) => theme.colors.textPrimary};
  fill: black;
  padding: 2px;
`;

const Skip: React.FC<WithTranslation> = ({ t }) => {
  // 0 = no selection, 1-4 = selected
  const [category, setCategory] = useState(0)
  const [main, setMain] = useState(1)
  const [mainRange, setMainRange] = useState(0)
  const [sub, setSub] = useState(1)
  const [subRange, setSubRange] = useState(0)
  const [kanjiData, setKanjiData] = useState<StrokeCharactersMap>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAndSetKanjiData = async () => {
      setLoading(true)
      const skipcode = [category, main, sub].join('-')
      const response = await API.getKDKanjiBySkipcode(skipcode, mainRange, subRange, true)
      console.log('data', response.data.data)
      setKanjiData(response.data.data)
      setLoading(false)
    }

    if (category && main > 0 && sub > 0 && mainRange > -1 && subRange > -1) {
      getAndSetKanjiData()
    } else {
      setKanjiData({})
    }
  }, [category, main, mainRange, sub, subRange]);

  const handleSelection = (categoryValue: number): void => {
    if (category === categoryValue) {
      setCategory(0)
    } else {
      setCategory(categoryValue)
    }
  };

  const handleCategoryChange = (e: any): void => {
    const value = inputToInt(e)
    setCategory(value)
  };

  const handleMainChange = (e: any): void => {
    const value = inputToInt(e)
    setMain(value)
  };

  const handleSubChange = (e: any): void => {
    const value = inputToInt(e)
    setSub(value)
  };

  const handleMainRangeChange = (e: any): void => {
    const value = inputToInt(e)
    setMainRange(value)
  };

  const handleMainRangeAddClick = (): void => {
    setMainRange(mainRange + 1)
  };

  const handleMainRangeSubtractClick = (): void => {
    if (mainRange < 1) {
      setMainRange(0)
    } else {
      setMainRange(mainRange - 1)
    }
  };

  const handleSubRangeChange = (e: any): void => {
    const value = inputToInt(e)
    setSubRange(value)
  };

  const handleSubRangeAddClick = (): void => {
    setSubRange(subRange + 1)
  };

  const handleSubRangeSubtractClick = (): void => {
    if (subRange < 1) {
      setSubRange(0)
    } else {
      setSubRange(subRange - 1)
    }
  };

  const inputToInt = (input: string): number => {
    return 0
  }

  return (
    <Page>
      <ContentContainer>
        <Categories>
          <StateButton callback={1} handleClick={handleSelection} state={category === 1 ? 2 : 1}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="currentColor" transform="translate(0, 0)" d="M 0 0 L 100 0 L 100 100 L 0 100 z" />
              <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="rgb(0,0,0)" transform="translate(0, 0)" d="M 5 50 L 95 50 L 95 95 L 5 95 z" />
            </SVG>
          </StateButton>
          <StateButton callback={2} handleClick={handleSelection} state={category === 2 ? 2 : 1}>
          <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="currentColor" transform="translate(0, 0)" d="M 0 0 L 100 0 L 100 100 L 0 100 z" />
            <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="rgb(0,0,0)" transform="translate(0, 0)" d="M 50 5 L 95 5 L 95 95 L 50 95 z" />
          </SVG>
          </StateButton>
          <StateButton callback={3} handleClick={handleSelection} state={category === 3 ? 2 : 1}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="currentColor" transform="translate(0, 0)" d="M 0 0 L 100 0 L 100 100 L 0 100 z" />
              <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="rgb(0,0,0)" transform="translate(0, 0)" d="M 5 5 L 95 5 L 95 95 L 5 95 z" />
            </SVG>
          </StateButton>
          <StateButton callback={4} handleClick={handleSelection} state={category === 4 ? 2 : 1}>
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="4" fill="currentColor" transform="translate(0, 0)" d="M 0 0 L 100 0 L 100 100 L 0 100 z" />
            </SVG>
          </StateButton>
        </Categories>
        <NumberInput height={ADD_SUBTRACT_HEIGHT_SIZE} onChange={handleCategoryChange} value={category} width={ADD_SUBTRACT_WIDTH_SIZE}/>
        <NumberInput height={ADD_SUBTRACT_HEIGHT_SIZE} onChange={handleMainChange} value={main} width={ADD_SUBTRACT_WIDTH_SIZE}/>
        <NumberInput height={ADD_SUBTRACT_HEIGHT_SIZE} onChange={handleSubChange} value={sub} width={ADD_SUBTRACT_WIDTH_SIZE}/>
        <NumberInput height={ADD_SUBTRACT_HEIGHT_SIZE} onChange={handleMainRangeChange} value={mainRange} width={ADD_SUBTRACT_WIDTH_SIZE}/>
        <Button onClick={handleMainRangeAddClick}>+</Button>
        <Button onClick={handleMainRangeSubtractClick}>-</Button>
        <NumberInput height={ADD_SUBTRACT_HEIGHT_SIZE} onChange={handleSubRangeChange} value={subRange} width={ADD_SUBTRACT_WIDTH_SIZE}/>
        <Button onClick={handleSubRangeAddClick}>+</Button>
        <Button onClick={handleSubRangeSubtractClick}>-</Button>
        {/* <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path stroke={"currentColor"} stroke-width={"0"} strokeLinecap="butt" strokeDashoffset="0" strokeLinejoin="miter" strokeMiterlimit="4" fill="rgb(40,202,35)" fillRule="nonzero" opacity="1" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -40.46392 -40.46392 L 40.46391 -40.46392 L 40.46391 40.46391 L -40.46392 40.46391 z" stroke-linecap="round" />
        </SVG> */}
        {/* <SVG>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="500" height="500" viewBox="0 0 500 500">
          <g transform="matrix(1.24 0 0 1.24 150 200)" id="B4hLEE404c73SY_nQiYCW">
          <path d=" " stroke={"currentColor"} stroke-width={"0"} strokeLinecap={"butt"} stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(142,109,125); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -40.46392 -40.46392 L 40.46391 -40.46392 L 40.46391 40.46391 L -40.46392 40.46391 z" stroke-linecap="round" />
          </g>
          <g transform="matrix(0.87 0 0 1.75 172.5 200)" id="qlhkPg1JKBE_6Wm1-M71-">
          <path style="stroke: rgb(214,229,36); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(220,75,125); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -25.7732 -25.7732 L 25.773190000000003 -25.7732 L 25.773190000000003 25.773190000000003 L -25.7732 25.773190000000003 z" stroke-linecap="round" />
          </g>
          <g transform="matrix(1.94 0 0 1.94 150 70)" id="s-hQ77eIiLjO4lD4ISegh">
          <path style="stroke: rgb(89,56,198); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(40,202,35); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -25.7732 -25.7732 L 25.773190000000003 -25.7732 L 25.773190000000003 25.773190000000003 L -25.7732 25.773190000000003 z" stroke-linecap="round" />
          </g>
          <g transform="matrix(1.75 0 0 0.87 150 92.5)" id="UWYNInCGfPevSPMHsVKVB">
          <path style="stroke: rgb(77,40,217); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(15,80,190); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -25.7732 -25.7732 L 25.773190000000003 -25.7732 L 25.773190000000003 25.773190000000003 L -25.7732 25.773190000000003 z" stroke-linecap="round" />
          </g>
          <g transform="matrix(1.94 0 0 1.94 150 320)" id="nSoShUp28NNYVDFP1zF_3">
          <path style="stroke: rgb(17,157,218); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(106,141,50); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -25.7732 -25.7732 L 25.773190000000003 -25.7732 L 25.773190000000003 25.773190000000003 L -25.7732 25.773190000000003 z" stroke-linecap="round" />
          </g>
          <g transform="matrix(1.75 0 0 1.75 150 320)" id="bE8Rqv60oYhpQIUIN7X1M">
          <path style="stroke: rgb(120,144,212); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(33,28,103); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -25.7732 -25.7732 L 25.773190000000003 -25.7732 L 25.773190000000003 25.773190000000003 L -25.7732 25.773190000000003 z" stroke-linecap="round" />
          </g>
          <g transform="matrix(1.94 0 0 1.94 150 429)" id="9KSw6Gu3KX55gCg5GEDX9">
          <path style="stroke: rgb(220,250,9); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(116,181,126); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -25.7732 -25.7732 L 25.773190000000003 -25.7732 L 25.773190000000003 25.773190000000003 L -25.7732 25.773190000000003 z" stroke-linecap="round" />
          </g>
          </svg>
        </SVG> */}
      </ContentContainer>
      <ColumnSpacer width={30} />
      <ContentContainer>
        <History />
        <RowContainer>
          { loading && (
            <SpinnerWrapper>
              <Spinner size={40} />
            </SpinnerWrapper>
          )}
          { !loading && (Object.keys(kanjiData).map((s, i) => {
            return <NumberedKanjiRow key={i} kanji={kanjiData[s]} rowNumber={s} />
          }))};
        </RowContainer>
      </ContentContainer>
    </Page>
  );
};

export default withTranslation()(Skip);
