import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props { 
  children?: React.ReactNode;
  href?: string;
  target?: string;
}

const StyledLink = styled.a`
  color: white;
  font-size: ${({theme}) => theme.fontSizes.large};
  margin: 1px;
  :visited {
    color: hotpink;
  }
`;

const Anchor: React.FC<Props> = ({children, href, target}) => {
	return (
		<StyledLink target={target} href={href}>{children}</StyledLink>
	);
};

export default Anchor;
