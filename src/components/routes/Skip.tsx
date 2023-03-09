import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import { NumberInput, Spinner } from "../common";
import { Button, StateButton } from "../buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import { StrokeCharactersMap } from "dataTypes";
import API from "../../API";


const CATEGORY_HEIGHT = 44;
const CATEGORY_WIDTH = CATEGORY_HEIGHT;
const INPUT_HEIGHT = 40;
const INPUT_WIDTH = 60;
const MATH_BUTTONS_HEIGHT = 30;
const MATH_BUTTONS_WIDTH = MATH_BUTTONS_HEIGHT;

const Page = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2.5% 2.5% 2.5% 55px;
`;

const Spacer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  width: 50%;
`;

const CodeBuilder = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5%;
`;

const CodeBuilderColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 0;
`;

const CodeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.medium};
  justify-content: center;
  padding-bottom: 4px;
  white-space: nowrap;
`;

const ButtonPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2px;
`;

const Dash = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
  line-height: 80px;
  padding-left: 10px;
  padding-right: 10px;
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RowContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  flex-direction: column;
  overflow-y: scroll;
`;

const SVG = styled.svg`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  height: auto;
  justify-content: center;
  padding: 2px;
  width: auto;
`;

const SpinnerWrapper = styled.div`
  padding: 20px;
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
        setKanjiData(response.data.data)
        setLoading(false)
      }

      if (category > 0 && category < 5 && main > 0 && sub > 0 && mainRange > -1 && subRange > -1) {
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
      setCategory(parseInput(e.target.value))
    };

    const handleMainChange = (e: any): void => {
      setMain(parseInput(e.target.value))
    };

    const handleSubChange = (e: any): void => {
      setSub(parseInput(e.target.value))
    };

    const handleMainRangeChange = (e: any): void => {
      setMainRange(parseInput(e.target.value))
    };

    const handleSubRangeChange = (e: any): void => {
      setSubRange(parseInput(e.target.value))
    };

    const parseInput = (input: string): any => {
      return input === "" ? "" : parseInt(input) || 0
    };

    const handleAdditionMainClick = () => {
      setMain(main + 1)
    };

    const handleAdditionSubClick = () => {
      setSub(sub + 1)
    };

    const handleAdditionMainRangeClick = () => {
      setMainRange(mainRange + 1)
    };

    const handleAdditionSubRangeClick = () => {
      setSubRange(subRange + 1)
    };

    const handleSubtractMainClick = () => {
      setMain(Math.max(main - 1, 1))
    };

    const handleSubtractSubClick = () => {
      setSub(Math.max(sub - 1, 1))
    };

    const handleSubtractMainRangeClick = () => {
      setMainRange(Math.max(mainRange - 1, 0))
    };

    const handleSubtractSubRangeClick = () => {
      setSubRange(Math.max(subRange - 1, 0))
    };

    return (
      <Page>
        <Spacer>
          <CodeBuilder>
            <CodeBuilderColumn>
              <CodeInputContainer>
                <Title>{t("skip.shape")}</Title>
                <NumberInput height={INPUT_HEIGHT} onChange={handleCategoryChange} value={category} width={INPUT_WIDTH}/>
              </CodeInputContainer>
              <CategoryButtonContainer>
                {/* Left/Right */}
                <StateButton callback={1} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 1 ? 2 : 1} width={CATEGORY_WIDTH}>
                  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path d="M 0 0 L 100 0 L 100 50 L 0 50 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                    <path d="M 0 50 L 5 50 L 5 100 L 0 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                    <path d="M 5 95 L 95 95 L 95 100 L 5 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                    <path d="M 95 50 L 100 50 L 100 100 L 95 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)" />
                  </SVG>
                </StateButton>
                {/* Up/Down */}
                <StateButton callback={2} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 2 ? 2 : 1} width={CATEGORY_WIDTH}>
                  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path d="M 0 0 L 50 0 L 50 100 L 0 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                    <path d="M 50 0 L 95 0 L 95 5 L 50 5 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                    <path d="M 95 0 L 100 0 L 100 95 L 95 95 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                    <path d="M 50 95 L 95 95 L 100 100 L 50 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)"/>
                  </SVG>
                </StateButton>
                {/* Enclose */}
                <StateButton callback={3} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 3 ? 2 : 1} width={CATEGORY_WIDTH}>
                  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path d="M 0 0 L 100 0 L 100 5 L 0 5 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)" />
                    <path d="M 95 5 L 100 5 L 100 95 L 95 95 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)" />
                    <path d="M 0 95 L 100 95 L 100 100 L 0 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)" />
                    <path d="M 0 5 L 5 5 L 5 95 L 0 95 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)" />
                  </SVG>
                </StateButton>
                {/* Other */}
                <StateButton callback={4} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 4 ? 2 : 1} width={CATEGORY_WIDTH}>
                  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path d="M 0 0 L 100 0 L 100 100 L 0 100 z" fill="currentColor" stroke="currentColor" transform="translate(0, 0)" />
                  </SVG>
                </StateButton>
              </CategoryButtonContainer>
            </CodeBuilderColumn>
            <Dash>-</Dash>
            <CodeBuilderColumn>
              <CodeInputContainer>
                <Title>{t("skip.main")}</Title>
                <NumberInput height={INPUT_HEIGHT} onChange={handleMainChange} value={main} width={INPUT_WIDTH}/>
                <ButtonPair>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleSubtractMainClick} width={MATH_BUTTONS_WIDTH}>-</Button>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleAdditionMainClick} width={MATH_BUTTONS_WIDTH}>+</Button>
                </ButtonPair>
              </CodeInputContainer>
              <CodeInputContainer>
                <Title>{t("skip.plusminus")}</Title>
                <NumberInput height={INPUT_HEIGHT} onChange={handleMainRangeChange} value={mainRange} width={INPUT_WIDTH}/>
                <ButtonPair>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleSubtractMainRangeClick} width={MATH_BUTTONS_WIDTH}>-</Button>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleAdditionMainRangeClick} width={MATH_BUTTONS_WIDTH}>+</Button>
                </ButtonPair>
              </CodeInputContainer>
            </CodeBuilderColumn>
            <Dash>-</Dash>
            <CodeBuilderColumn>
              <CodeInputContainer>
                <Title>{t("skip.sub")}</Title>
                <NumberInput height={INPUT_HEIGHT} onChange={handleSubChange} value={sub} width={INPUT_WIDTH}/>
                <ButtonPair>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleSubtractSubClick} width={MATH_BUTTONS_WIDTH}>-</Button>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleAdditionSubClick} width={MATH_BUTTONS_WIDTH}>+</Button>
                </ButtonPair>
              </CodeInputContainer>
              <CodeInputContainer>
                <Title>{t("skip.plusminus")}</Title>
                <NumberInput height={INPUT_HEIGHT} onChange={handleSubRangeChange} value={subRange} width={INPUT_WIDTH}/>
                <ButtonPair>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleSubtractSubRangeClick} width={MATH_BUTTONS_WIDTH}>-</Button>
                  <Button height={MATH_BUTTONS_HEIGHT} onClick={handleAdditionSubRangeClick} width={MATH_BUTTONS_WIDTH}>+</Button>
                </ButtonPair>
              </CodeInputContainer>
            </CodeBuilderColumn>
          </CodeBuilder>
        </Spacer>
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
      <Spacer />
    </Page>
  );
};

export default withTranslation()(Skip);
