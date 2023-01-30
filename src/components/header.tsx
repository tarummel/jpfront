import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Headers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 336px;
`;

const ClickablesBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px 10px;
  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
`;

const Text = styled.header`
  font-size: ${props => props.theme.fontSizes.header};
  color: ${props => props.theme.colors.textPrimary};
`;

const Divider = styled.div`
  display: flex;
  flex-grow: 1;
  border: 1px solid ${props => props.theme.colors.buttonSelected};
`;

const Header: React.FC<Props> = ({}) => { 
  return (
    <Headers>
      <Box>
        <ClickablesBox>
          <Link to="/">
            <TextBox>
              <Text>Home</Text>
            </TextBox>
          </Link>
          <Link to="/About">
            <TextBox>
              <Text>About</Text>
            </TextBox>
          </Link>
          <Link to="/Settings">
            <TextBox>
              <Text>Settings</Text>
            </TextBox>
          </Link>
        </ClickablesBox>

        <Divider />
      </Box>
    </Headers>
  );
}

export default Header;
