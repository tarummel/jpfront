import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withTranslation, WithTranslation } from "react-i18next";

import { NumberInput, Spinner } from "../common";
import { Button, StateButton } from "../common/buttons";
import History from "../History";
import NumberedKanjiRow from "../NumberedKanjiRow";
import { StrokeCharactersMap } from "dataTypes";
import { getKDKanjiBySkipcode } from "../../API";
import LicenseAgreement from "../LicenseAgreement";

import { ReactComponent as LeftRightIcon } from "../../assets/icons/left-right-skip.svg";
import { ReactComponent as UpDownIcon } from "../../assets/icons/up-down-skip.svg";
import { ReactComponent as EncloseIcon } from "../../assets/icons/enclose-skip.svg";
import { ReactComponent as OtherIcon } from "../../assets/icons/other-skip.svg";
import { KDKanjiBySkipcodeParams } from "apiParamTypes";
import { getErrorMessage } from "../utils/helpers_funcs";

const CATEGORY_HEIGHT = 44;
const CATEGORY_WIDTH = CATEGORY_HEIGHT;
const INPUT_HEIGHT = 40;
const INPUT_WIDTH = 60;
const MATH_BUTTONS_HEIGHT = 30;
const MATH_BUTTONS_WIDTH = MATH_BUTTONS_HEIGHT;

interface Form {
  category: number,
  main: number,
  sub: number,
  mainRange: number,
  subRange: number
}

const CATEGORY = 'category';
const MAIN = 'main';
const MAIN_RANGE = 'mainRange';
const SUB = 'sub';
const SUB_RANGE = 'subRange';

const CATEGORY_MAX = 4;
const CATEGORY_MIN = 0;
const PART_MAX = 34;
const PART_MIN = 1;
const RANGE_MAX = PART_MAX;
const RANGE_MIN = 0;

const DEFAULT_FORM = {
  'category': 0,
  'main': 1,
  'sub': 1,
  'mainRange': 0,
  'subRange': 0,
};

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
  const [form, setForm] = useState(DEFAULT_FORM);
  const [data, setData] = useState<StrokeCharactersMap>({});
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);

  const { category, main, sub, mainRange, subRange } = form;

  useEffect(() => {
    document.title = t("skip.documentTitle");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const skipcode = [category, main, sub].join('-');
      const params = { main_range: mainRange, sub_range: subRange, simple: true } as KDKanjiBySkipcodeParams;
      
      setLoading(true);

      try {
        const response = await getKDKanjiBySkipcode(skipcode, params, controller.signal);
        setData(response.data.data as StrokeCharactersMap);
        setError(false);
      } catch (e: unknown) {
        console.log(getErrorMessage(e));
        setError(true);
      }
      
      setLoading(false);
    };

    if (category > 0 && category < 5 && main > 0 && sub > 0 && mainRange > -1 && subRange > -1) {
      fetchData();
    } else {
      setData({});
      setError(false);
    }

    return () => {
      controller.abort();
    };
  }, [form]);

  // 0 = no selection, 1-4 = selected
  const handleSelection = (categoryValue: number): void => {
    setForm(prev => {
      // select that value if not already selected, otherwise deselect
      const newValue = form.category !== categoryValue ? categoryValue : 0;
      return { ...prev, 'category': newValue };
    });
  };

  const between = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max) || min;
  };

  const getNewValue = (valueName: string, amount: number): number => {
    let newValue;

    if (valueName === CATEGORY) {
      newValue = between(amount, CATEGORY_MIN, CATEGORY_MAX);
    } else if (valueName === MAIN || valueName === SUB) {
      newValue = between(amount, PART_MIN, PART_MAX);
    } else {
      newValue = between(amount, RANGE_MIN, RANGE_MAX);
    }

    return newValue;
  };

  const handleInputChange = (valueName: string, e: any): void => {
    setForm(prev => {
      const newValue = getNewValue(valueName, parseInt(e.target.value));
      return { ...prev, [valueName as keyof Form]: newValue, };
    });
  };

  const handleClick = (valueName: string, amount: number, ) => {
    const key: keyof Form = valueName as keyof Form;
    setForm(prev => { 
      const newValue = getNewValue(valueName, prev[key] + amount);
      return { ...prev, [key]: newValue };
    });
  };

  return (
    <Body>
      <CodeBuilder>
        <CodeBuilderColumn>
          <CodeInputContainer>
            <Title>{t("skip.shape")}</Title>
            <NumberInput height={INPUT_HEIGHT} onChange={(e) => handleInputChange(CATEGORY, e)} value={category} width={INPUT_WIDTH}/>
          </CodeInputContainer>
          <CategoryButtonContainer>
            <StateButton handleClick={() => handleSelection(1)} height={CATEGORY_HEIGHT} state={category === 1 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <LeftRightIcon />
              </SVG>
            </StateButton>
            <StateButton handleClick={() => handleSelection(2)} height={CATEGORY_HEIGHT} state={category === 2 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <UpDownIcon />
              </SVG>
            </StateButton>
            <StateButton handleClick={() => handleSelection(3)} height={CATEGORY_HEIGHT} state={category === 3 ? 2 : 1} width={CATEGORY_WIDTH}>
              <SVG>
                <EncloseIcon />
              </SVG>
            </StateButton>
            <StateButton handleClick={() => handleSelection(4)} height={CATEGORY_HEIGHT} state={category === 4 ? 2 : 1} width={CATEGORY_WIDTH}>
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
            <NumberInput height={INPUT_HEIGHT} onChange={(e) => handleInputChange(MAIN, e)} value={main} width={INPUT_WIDTH}/>
            <ButtonPair>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(MAIN, -1)} width={MATH_BUTTONS_WIDTH}>-</Button>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(MAIN, 1)} width={MATH_BUTTONS_WIDTH}>+</Button>
            </ButtonPair>
          </CodeInputContainer>
          <CodeInputContainer>
            <PlusMinus>{t("skip.plusminus")}</PlusMinus>
            <NumberInput height={INPUT_HEIGHT} onChange={(e) => handleInputChange(MAIN_RANGE, e)} value={mainRange} width={INPUT_WIDTH}/>
            <ButtonPair>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(MAIN_RANGE, -1)} width={MATH_BUTTONS_WIDTH}>-</Button>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(MAIN_RANGE, 1)} width={MATH_BUTTONS_WIDTH}>+</Button>
            </ButtonPair>
          </CodeInputContainer>
        </CodeBuilderColumn>
        <Dash>-</Dash>
        <CodeBuilderColumn>
          <CodeInputContainer>
            <Title>{t("skip.sub")}</Title>
            <NumberInput height={INPUT_HEIGHT} onChange={(e) => handleInputChange(SUB, e)} value={sub} width={INPUT_WIDTH}/>
            <ButtonPair>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(SUB, -1)} width={MATH_BUTTONS_WIDTH}>-</Button>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(SUB, 1)} width={MATH_BUTTONS_WIDTH}>+</Button>
            </ButtonPair>
          </CodeInputContainer>
          <CodeInputContainer>
            <PlusMinus>{t("skip.plusminus")}</PlusMinus>
            <NumberInput height={INPUT_HEIGHT} onChange={(e) => handleInputChange(SUB_RANGE, e)} value={subRange} width={INPUT_WIDTH}/>
            <ButtonPair>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(SUB_RANGE, -1)} width={MATH_BUTTONS_WIDTH}>-</Button>
              <Button height={MATH_BUTTONS_HEIGHT} onClick={() => handleClick(SUB_RANGE, 1)} width={MATH_BUTTONS_WIDTH}>+</Button>
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
          { !loading && data && ( <NumberedKanjiRow kanjiData={data} /> )}
        </RowContainer>
        <LicenseAgreement krad={true} skip={true} />
      </KanjiContainer>
    </Body>
  );
};

export default withTranslation()(Skip);
