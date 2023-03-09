import React from "react";
import styled from "styled-components";

interface Props { 
  children?: React.ReactNode;
  href?: string;
  target?: string;
}

const StyledAnchor = styled.a`
  font-size: ${({theme}) => theme.fontSizes.medium};
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

const Anchor: React.FC<Props> = ({children, href, target}) => {
	return (
		<StyledAnchor target={target} href={href}>{children}</StyledAnchor>
	);
};

export default Anchor;
