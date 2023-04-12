import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/icons/chevron-right.svg";

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

const Header = styled.button<HeaderProps>`
  background: ${({theme}) => theme.colors.buttonPrimary};
  border: none;
  color ${({theme}) => theme.colors.textPrimary};
  border-bottom-left-radius ${({collapsed}) => collapsed ? "5px" : "0px"};
  border-bottom-right-radius: ${({collapsed}) => collapsed ? "5px" : "0px"};
  border-top-left-radius 5px;
  border-top-right-radius: 5px;
  display: flex;
  font-size ${({theme}) => theme.fontSizes.large};
  height: 36px;
  width: 100%;
`;

const ChevronWrapper = styled.div`
  aspect-ratio: 1;
  padding: 5px;
`;

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  color: ${({theme}) => theme.colors.textPrimary};
  fill: ${({theme}) => theme.colors.textPrimary};
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  color: ${({theme}) => theme.colors.textPrimary};
  fill: ${({theme}) => theme.colors.textPrimary};
`;

const Contents = styled.div`
  padding: 10px;
`;

const ColumnSpacer: React.FC<Props> = ({ children, open, number, title }) => {
  const [collapsed, setCollapsed] = useState(open || DEFAULT_OPEN);

  const numberPrefix = number ? `${number} | ` : "";
  const fullTitle = `${numberPrefix}${title}`;

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box>
      <Header onClick={handleClick} collapsed={collapsed}>
        <ChevronWrapper>
        { collapsed 
          ? <StyledChevronRightIcon />
          : <StyledChevronDownIcon /> 
        }
        </ChevronWrapper>
        {fullTitle}
      </Header>
      { collapsed
        ? null
        : <Contents>{children}</Contents>
      }
    </Box>
  );
};

export default ColumnSpacer;
