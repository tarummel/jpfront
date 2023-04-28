import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import { NumberInput, Spinner } from "../common";
import { Button, StateButton } from "../buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import { StrokeCharactersMap } from "dataTypes";
import API from "../../API";
import LicenseAgreement from "../LicenseAgreement";

import { ReactComponent as LeftRightIcon } from "../../assets/icons/left-right-skip.svg";
import { ReactComponent as UpDownIcon } from "../../assets/icons/up-down-skip.svg";
import { ReactComponent as EncloseIcon } from "../../assets/icons/enclose-skip.svg";
import { ReactComponent as OtherIcon } from "../../assets/icons/other-skip.svg";

const CATEGORY_HEIGHT = 44;
const CATEGORY_WIDTH = CATEGORY_HEIGHT;
const INPUT_HEIGHT = 40;
const INPUT_WIDTH = 60;
const MATH_BUTTONS_HEIGHT = 30;
const MATH_BUTTONS_WIDTH = MATH_BUTTONS_HEIGHT;

const Body = styled.div`
  background: ${({theme}) => theme.colors.foreground};
  display: flex;
  flex-direction: row;
  height: 100%;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 1024px;
  margin: 0 auto;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 50%;
`;

const CodeBuilder = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  padding-left: 20px;
  padding-right: 20px;
`;

const CodeBuilderColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const CodeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  font-size: ${({theme}) => theme.fontSizes.medium};
  justify-content: center;
  padding-bottom: 5px;
  white-space: nowrap;
`;

const PlusMinus = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
  padding-bottom: 5px;
  padding-top: 5px;
  text-align: center;
`;

const ButtonPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 5px;
`;

const Dash = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSizes.large};
  line-height: 80px;
  padding-left: 10px;
  padding-right: 10px;
`;

const CategoryButtonContainer = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 5px;
  row-gap: 2px;
`;

const SVG = styled.div`
  svg {
    color: ${({theme}) => theme.colors.textPrimary};
    display: block;
    margin: auto;
    padding: 2px;
  }
`;

const KanjiContainer = styled.div`
  border-radius: 5px;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding-right: 20px;
`;

const RowContainer = styled.div`
  background: ${({theme}) => theme.colors.elementPrimary};
  height: 80%;
  margin-top: 5px;
  padding-top: 1px;
`;

const SpinnerWrapper = styled.div`
  margin: calc(50% + 20px) auto;
`;

const HistoryWrapper = styled.div`
`;

const Skip: React.FC<WithTranslation> = ({ t }) => {
  // 0 = no selection, 1-4 = selected
  const [category, setCategory] = useState(0);
  const [main, setMain] = useState(1);
  const [mainRange, setMainRange] = useState(0);
  const [sub, setSub] = useState(1);
  const [subRange, setSubRange] = useState(0);
  const [kanjiData, setKanjiData] = useState<StrokeCharactersMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = t("skip.documentTitle");
  }, []);

  useEffect(() => {
    const getAndSetKanjiData = async () => {
      setLoading(true);

      const skipcode = [category, main, sub].join('-');
      const params = { main_range: mainRange, sub_range: subRange, simple: true};
      const response = await API.getKDKanjiBySkipcode(skipcode, params);
      setKanjiData(response.data.data);

      setLoading(false);
    };

    if (category > 0 && category < 5 && main > 0 && sub > 0 && mainRange > -1 && subRange > -1) {
      getAndSetKanjiData().catch((e) => { 
        console.log(getAndSetKanjiData.name, e);
      });
    } else {
      setKanjiData({});
    }
  }, [category, main, mainRange, sub, subRange]);

  const handleSelection = (categoryValue: number): void => {
    if (category === categoryValue) {
      setCategory(0);
    } else {
      setCategory(categoryValue);
    }
  };

  const handleCategoryChange = (e: any): void => {
    setCategory(parseInput(e.target.value));
  };

  const handleMainChange = (e: any): void => {
    setMain(parseInput(e.target.value));
  };

  const handleSubChange = (e: any): void => {
    setSub(parseInput(e.target.value));
  };

  const handleMainRangeChange = (e: any): void => {
    setMainRange(parseInput(e.target.value));
  };

  const handleSubRangeChange = (e: any): void => {
    setSubRange(parseInput(e.target.value));
  };

  const parseInput = (input: string): any => {
    return input === "" ? "" : parseInt(input) || 0;
  };

  const handleAdditionMainClick = () => {
    setMain(main + 1);
  };

  const handleAdditionSubClick = () => {
    setSub(sub + 1);
  };

  const handleAdditionMainRangeClick = () => {
    setMainRange(mainRange + 1);
  };

  const handleAdditionSubRangeClick = () => {
    setSubRange(subRange + 1);
  };

  const handleSubtractMainClick = () => {
    setMain(Math.max(main - 1, 1));
  };

  const handleSubtractSubClick = () => {
    setSub(Math.max(sub - 1, 1));
  };

  const handleSubtractMainRangeClick = () => {
    setMainRange(Math.max(mainRange - 1, 0));
  };

  const handleSubtractSubRangeClick = () => {
    setSubRange(Math.max(subRange - 1, 0));
  };

  return (
    <Body>
      <CodeBuilder>
        <CodeBuilderColumn>
          <CodeInputContainer>
            <Title>{t("skip.shape")}</Title>
            <NumberInput height={INPUT_HEIGHT} onChange={handleCategoryChange} value={category} width={INPUT_WIDTH}/>
          </CodeInputContainer>
          <CategoryButtonContainer>
            <StateButton callback={1} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 1 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <LeftRightIcon />
              </SVG>
            </StateButton>
            <StateButton callback={2} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 2 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <UpDownIcon />
              </SVG>
            </StateButton>
            <StateButton callback={3} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 3 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <EncloseIcon />
              </SVG>
            </StateButton>
            <StateButton callback={4} handleClick={handleSelection} height={CATEGORY_HEIGHT} state={category === 4 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <OtherIcon />
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
            <PlusMinus>{t("skip.plusminus")}</PlusMinus>
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
            <PlusMinus>{t("skip.plusminus")}</PlusMinus>
            <NumberInput height={INPUT_HEIGHT} onChange={handleSubRangeChange} value={subRange} width={INPUT_WIDTH}/>
            <ButtonPair>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={handleSubtractSubRangeClick} width={MATH_BUTTONS_WIDTH}>-</Button>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={handleAdditionSubRangeClick} width={MATH_BUTTONS_WIDTH}>+</Button>
            </ButtonPair>
          </CodeInputContainer>
        </CodeBuilderColumn>
      </CodeBuilder>
      <KanjiContainer>
        <HistoryWrapper>
          <History />
        </HistoryWrapper>
        <RowContainer>
          { loading && (
            <SpinnerWrapper>
              <Spinner size={40} />
            </SpinnerWrapper>
          )}
          { !loading && kanjiData && ( <NumberedKanjiRow kanjiData={kanjiData} /> )}
        </RowContainer>
        <LicenseAgreement krad={true} skip={true} />
      </KanjiContainer>
    </Body>
  );
};

export default withTranslation()(Skip);
