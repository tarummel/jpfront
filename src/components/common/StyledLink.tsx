import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props { 
  children?: React.ReactNode;
  fontSize?: string;
  href?: string;
  target?: string;
  to: string;
};

const StyledLink = styled(Link)<Props>`
  font-size: ${({fontSize, theme}) => fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.medium};
  text-decoration: none;
  :link {
    color: ${({theme}) => theme.colors.link};
  }
  :visited {
    color: ${({theme}) => theme.colors.linkVisited};
  }
  :hover {
    color: ${({theme}) => theme.colors.linkHover};
  }
`;

const Anchor: React.FC<Props> = ({ children, fontSize, target, to }) => {
	return (
		<StyledLink fontSize={fontSize} target={target} to={to}>{children}</StyledLink>
	);
}

export default Anchor;
