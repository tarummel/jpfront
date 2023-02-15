import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  enabled?: boolean;
};

const SpinnerContainer = styled.div`
  display: block;
  margin-top: 32px;
  text-align: center;
`;

const SpinFrames = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const Spin = styled.div`
  animation-name: ${SpinFrames};
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;  
  border: 2px solid ${({theme}) => theme.colors.spinnerPrimary};
  border-top-color: ${({theme}) => theme.colors.spinnerSecondary};
  border-radius: 50%;
  display: inline-block;
  height: 32px;
  width: 32px;
`;

// enabled set manually to true
const Spinner: React.FC<Props> = ({ enabled }) => {
  return (
    <>
      { !enabled
        ? (<div/>)
        : (
          <SpinnerContainer>
            <Spin />
          </SpinnerContainer>
        )
      }
    </>
  );
};

export default Spinner;
