import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const StyledText = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};  
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const Text: React.FC<Props> = ({ children }) => { 
  return (
    <StyledText>{children}</StyledText>
  );
}
  
export default Text;
