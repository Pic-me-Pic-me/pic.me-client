import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { IcCropImg, IcImageAdd, IcModify, IcRemoveImg } from '../../../asset/icon';
import { votingImageState } from '../../../recoil/maker/atom';
import { setImgCompress } from '../../../utils/setImgCompress';

type ToggleProps = {
  firstToggle: boolean;
  secondToggle: boolean;
};

interface ImageInputProps {
  handleCropImageToggle: React.MouseEventHandler;
  handleToggleModify: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isToggle: ToggleProps;
}

const ImageInput = (props: ImageInputProps) => {
  const { handleCropImageToggle, handleToggleModify, isToggle } = props;

  const [votingForm, setVotingForm] = useRecoilState(votingImageState);
  const [isComplete, setIsComplete] = useState(false);
  const { title, firstImageUrl, secondImageUrl } = votingForm;
  const { firstToggle, secondToggle } = isToggle;

  useEffect(() => {
    if (!title) {
      setIsComplete(false);
    }
    handleCheckImageObj();
  }, [title, votingForm]);

  const handleReadFileUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileBlob = e.target.files[0];
      const compressedImg = await setImgCompress(fileBlob);
      const reader = new FileReader();
      if (compressedImg) {
        reader.readAsDataURL(compressedImg);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          if (e.target.name === 'firstImg') {
            setVotingForm({ ...votingForm, firstImageUrl: base64data });
          } else {
            setVotingForm({ ...votingForm, secondImageUrl: base64data });
          }
        };
      }
    }
  };

  const handleRemoveImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      if (target.value === 'firstRemove') {
        setVotingForm({ ...votingForm, firstImageUrl: '' });
        window.location.reload();
      } else {
        setVotingForm({ ...votingForm, secondImageUrl: '' });
        window.location.reload();
      }
    }
  };

  const handleCheckImageObj = () => {
    if (title && firstImageUrl && secondImageUrl) {
      setIsComplete(true);
    }
  };

  return (
    <>
      <StImageInputWrapper>
        {firstImageUrl ? (
          <StImageTextBlock>
            <StImage src={firstImageUrl} alt="첫번째 이미지" />
            {firstToggle ? (
              <StModifyImageButton type="button" value="firstModify" onClick={handleToggleModify}>
                <IcModify />
              </StModifyImageButton>
            ) : (
              <StModifyBlock>
                <StModifyDepthBtn type="button" value="firstRemove" onClick={handleRemoveImg}>
                  <IcRemoveImg />
                </StModifyDepthBtn>
                <StModifyDepthBtn type="button" value="firstCrop" onClick={handleCropImageToggle}>
                  <IcCropImg />
                </StModifyDepthBtn>
              </StModifyBlock>
            )}
          </StImageTextBlock>
        ) : (
          <StImageInputLabel>
            <StImageInput type="file" name="firstImg" accept="image/*" onChange={handleReadFileUrl} />
            <StImageTextBlock>
              <IcImageAdd />
              <StImageText>여기에 사진을 넣어주세요!</StImageText>
            </StImageTextBlock>
          </StImageInputLabel>
        )}
        {secondImageUrl ? (
          <StImageTextBlock>
            <StImage src={secondImageUrl} alt="두번째 이미지" />
            {secondToggle ? (
              <StModifyImageButton type="button" value="secondModify" onClick={handleToggleModify}>
                <IcModify />
              </StModifyImageButton>
            ) : (
              <StModifyBlock>
                <StModifyDepthBtn type="button" value="secondRemove" onClick={handleRemoveImg}>
                  <IcRemoveImg />
                </StModifyDepthBtn>
                <StModifyDepthBtn type="button" value="secondCrop" onClick={handleCropImageToggle}>
                  <IcCropImg />
                </StModifyDepthBtn>
              </StModifyBlock>
            )}
          </StImageTextBlock>
        ) : (
          <StImageInputLabel>
            <StImageInput type="file" name="secondImg" accept="image/*" onChange={handleReadFileUrl} />
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
    </>
  );
};

export default ImageInput;

const StImageInputWrapper = styled.section`
  position: relative;

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
  margin-bottom: 2rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  cursor: pointer;
`;
const StImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 1.2rem;

  object-fit: cover;
`;
const StImageTextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 52rem;
  margin-bottom: 2rem;

  overflow: hidden;
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
  margin-bottom: 13.3rem;

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
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  cursor: pointer;
  svg {
    pointer-events: none;
  }
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
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  z-index: 5;
`;
const StModifyDepthBtn = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  outline: none;
  cursor: pointer;
  svg {
    pointer-events: none;
  }
`;
