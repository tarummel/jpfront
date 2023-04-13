import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";

const DEFAULT_OPEN = false;

interface Props {
  children?: React.ReactNode;
  open?: boolean;
  number?: number | string;
  title?: string;
}

interface HeaderProps {
  collapsed: boolean;
}

const Box = styled.div`
  border-radius: 5px;
  background: ${({theme}) => theme.colors.elementPrimary};
`;

const HeaderButton = styled.button<HeaderProps>`
  background: ${({theme}) => theme.colors.buttonPrimary};
  border: none;
  border-bottom-left-radius ${({collapsed}) => collapsed ? "5px" : "0px"};
  border-bottom-right-radius: ${({collapsed}) => collapsed ? "5px" : "0px"};
  border-top-left-radius 5px;
  border-top-right-radius: 5px;
  display: flex;
  height: 36px;
  justify-content: space-between;
  width: 100%;

  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
  }
`;

const TitleWrapper = styled.div`
  color ${({theme}) => theme.colors.textPrimary};
  font-size ${({theme}) => theme.fontSizes.large};
  line-height: 36px;
  padding-left: 10px;
`;

const ChevronWrapper = styled.div`
  aspect-ratio: 1;
  
  padding: 4px;
`;

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  color: ${({theme}) => theme.colors.textPrimary};
`;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  color: ${({theme}) => theme.colors.textPrimary};
`;

const Contents = styled.div`
  padding: 10px;
`;

const ColumnSpacer: React.FC<Props> = ({ children, open, number, title }) => {
  const [collapsed, setCollapsed] = useState(open || DEFAULT_OPEN);

  const handleCollapseClick = () => {
    setCollapsed(!collapsed);
  };

  const fullTitle = number ? `${number}. ${title}` : "";

  return (
    <Box>
      <HeaderButton onClick={handleCollapseClick} collapsed={collapsed}>
        <TitleWrapper>{fullTitle}</TitleWrapper>
        <ChevronWrapper>
          { collapsed
            ? <StyledChevronLeftIcon />
            : <StyledChevronDownIcon />
          }
        </ChevronWrapper>
      </HeaderButton>
      { collapsed
        ? null
        : <Contents>{children}</Contents>
      }
    </Box>
  );
};

export default ColumnSpacer;
