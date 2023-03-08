import React from "react";
import styled from "styled-components";

interface Props {
  fontSize?: string;
  height?: string|number;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  placeholder?: any;
  value: string|number;
  width?: string|number;
};

const StyledInput = styled.input<Props>`
  border: none;
  border-radius: 20px;
  font-size: ${({fontSize, theme}) => fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.large};
  height: ${({height}) => height ? `${height}px` : "auto"};
  outline: none;
  text-align: center; 
  width: ${({width}) => width ? `${width}px` : "auto"};
`;

const SearchInput: React.FC<Props> = ({ fontSize, height, onChange, onKeyDown, placeholder, value, width }) => {
	return (
		<StyledInput fontSize={fontSize} height={height} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} type={"search"} value={value} width={width} />
	);
};

export default SearchInput;
