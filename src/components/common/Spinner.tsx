import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  enabled?: boolean;
  size?: string|number;
};

const SpinnerContainer = styled.div`
  display: block;
  text-align: center;
`;

const SpinFrames = keyframes`
  from {
    -webkit-transform: rotate(0deg)
  }
  to {
    -webkit-transform: rotate(360deg)
  }
`;

const Spin = styled.div<Props>`
  animation-name: ${SpinFrames};
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;  
  border: 2px solid ${({theme}) => theme.colors.spinnerPrimary};
  border-top-color: ${({theme}) => theme.colors.spinnerSecondary};
  border-radius: 50%;
  display: inline-block;
  height: ${({size}) => size || 32}px;
  width: ${({size}) => size || 32}px;
`;

const Spinner: React.FC<Props> = ({ size }) => (
  <SpinnerContainer>
    <Spin size={size} />
  </SpinnerContainer>
)

export default Spinner;
