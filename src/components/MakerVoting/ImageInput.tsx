import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { IcImageAdd } from '../../asset/icon';

interface ImageInputProps {
  input: string;
}

const ImageInput = (props: ImageInputProps) => {
  const [isToggle, setIsToggle] = useState({
    firstToggle: true,
    secondToggle: true,
  });
  const [imageUrl, setImageUrl] = useState({
    firstImageUrl: '',
    secondImageUrl: '',
  });
  const [isComplete, setIsComplete] = useState(false);

  const { input } = props;
  const { firstImageUrl, secondImageUrl } = imageUrl;
  const { firstToggle, secondToggle } = isToggle;

  useEffect(() => {
    handleCheckImageObj();
  }, [input, firstImageUrl, secondImageUrl]);

  const handleReadFirstFileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUrl({ ...imageUrl, firstImageUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleReadSecondFileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUrl({ ...imageUrl, secondImageUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleCheckImageObj = () => {
    if (input !== '' && firstImageUrl !== '' && secondImageUrl !== '') {
      setIsComplete(true);
    }
  };

  return (
    <StImageInputWrapper>
      {firstImageUrl ? (
        <StImageInputLabel>
          <StImageTextBlock>
            <StImage src={firstImageUrl} alt="첫번째 이미지" />
            {firstToggle ? (
              <StModifyImageButton
                type="button"
                onClick={() => setIsToggle({ ...isToggle, firstToggle: !firstToggle })}>
                수정
              </StModifyImageButton>
            ) : (
              <StModifyBlock />
            )}
          </StImageTextBlock>
        </StImageInputLabel>
      ) : (
        <StImageInputLabel>
          <StImageInput type="file" name="firstImg" accept="image/*" onChange={handleReadFirstFileUrl} />
          <StImageTextBlock>
            <IcImageAdd />
            <StImageText>여기에 사진을 넣어주세요!</StImageText>
          </StImageTextBlock>
        </StImageInputLabel>
      )}
      {secondImageUrl ? (
        <StImageInputLabel>
          <StImageTextBlock>
            <StImage src={secondImageUrl} alt="두번째 이미지" />
            {secondToggle ? (
              <StModifyImageButton
                type="button"
                onClick={() => setIsToggle({ ...isToggle, secondToggle: !secondToggle })}>
                수정
              </StModifyImageButton>
            ) : (
              <StModifyBlock>
                <StDeleteImageBtn type="button">삭제</StDeleteImageBtn>
                <StCropImageBtn type="button">수정</StCropImageBtn>
              </StModifyBlock>
            )}
          </StImageTextBlock>
        </StImageInputLabel>
      ) : (
        <StImageInputLabel>
          <StImageInput type="file" name="secondImg" accept="image/*" onChange={handleReadSecondFileUrl} />
          <StImageTextBlock>
            <IcImageAdd />
            <StImageText>여기에 사진을 넣어주세요!</StImageText>
          </StImageTextBlock>
        </StImageInputLabel>
      )}
      <StImageSubmitButton type="button" isComplete={isComplete} disabled={!isComplete}>
        투표 만들기 완료
      </StImageSubmitButton>
    </StImageInputWrapper>
  );
};

export default ImageInput;

const StImageInputWrapper = styled.section`
  width: 100%;
  margin-top: 4.1rem;
`;
const StImageInputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 52rem;
  & + & {
    margin-top: 2rem;
  }

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  cursor: pointer;
`;
const StImage = styled.img`
  width: 100%;
  height: 52rem;

  border-radius: 1.2rem;
`;
const StImageTextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  width: 100%;
`;
const StImageText = styled.span`
  margin-top: 2.827rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
`;
const StImageInput = styled.input`
  display: none;
`;
const StImageSubmitButton = styled.button<{ isComplete: boolean }>`
  width: 100%;
  height: 5.8rem;
  margin-top: 3rem;

  border: none;
  border-radius: 0.9rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  cursor: pointer;

  ${({ isComplete }) =>
    isComplete
      ? css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
        `}
`;
const StModifyImageButton = styled.button`
  position: absolute;
  right: 2.1rem;
  bottom: 2.1rem;

  width: 6rem;
  height: 6rem;

  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  cursor: pointer;
`;
const StModifyBlock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: 2.1rem;
  bottom: 2.1rem;

  width: 6rem;
  height: 12rem;

  border-radius: 6rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
`;
const StDeleteImageBtn = styled.button``;
const StCropImageBtn = styled.button``;
