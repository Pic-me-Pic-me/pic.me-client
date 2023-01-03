import styled from 'styled-components';

import { ImageAdd } from '../../asset/image';

const ImageInput = () => (
  <StImageInputWrapper>
    <StImageInputLabel>
      <StImageInput type="file" />
      <StImageTextBlock>
        <ImageAdd />
        <StImageText>여기에 사진을 넣어주세요!</StImageText>
      </StImageTextBlock>
    </StImageInputLabel>
    <StImageInputLabel>
      <StImageInput type="file" />
      <StImageTextBlock>
        <ImageAdd />
        <StImageText>여기에 사진을 넣어주세요!</StImageText>
      </StImageTextBlock>
    </StImageInputLabel>
    <StImageSubmitButton type="button">투표 만들기 완료</StImageSubmitButton>
  </StImageInputWrapper>
);

export default ImageInput;

const StImageInputWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
  margin-top: 6.2rem;
`;
const StImageInputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 52rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  & + & {
    margin-top: 2rem;
  }

  cursor: pointer;
`;
const StImageTextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StImageText = styled.span`
  margin-top: 2.827rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
`;
const StImageInput = styled.input`
  display: none;
`;
const StImageSubmitButton = styled.button`
  width: 100%;
  height: 5.8rem;
  margin-top: 3rem;

  border: none;
  border-radius: 0.9rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  cursor: pointer;
`;
