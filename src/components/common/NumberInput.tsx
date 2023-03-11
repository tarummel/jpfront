import React from "react";
import styled from "styled-components";

interface Props {
  fontSize?: string;
  height?: number;
  max?: number;
  min?: number;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  placeholder?: any;
  value: string|number;
  width?: number;
};

const StyledInput = styled.input<Props>`
  border: none;
  border-radius: 20px;
  font-size: ${({fontSize, theme}) => fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.large};
  height: ${({height}) => height ? `${height}px` : "auto"};
  outline: none;
  text-align: center; 
  width: ${({width}) => width ? `${width}px` : "auto"};
  -moz-appearance: textfield;
`;

const NumberInput: React.FC<Props> = ({ fontSize, height, max, min, onChange, onKeyDown, placeholder, value, width }) => {
	return (
		<StyledInput fontSize={fontSize} height={height} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} type={"number"} value={value} width={width} />
	);
}

export default NumberInput;
