import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcClose } from '../../asset/icon';
import { votingTitleState } from '../../recoil/maker/atom';
import { ImageCrop, ImageInput, TitleInput } from '../MakerVoting';

const MakerVotingLayout = () => {
  const [input, setInput] = useRecoilState(votingTitleState);
  const [isCropToggle, setIsCropToggle] = useState({
    firstCrop: false,
    secondCrop: false,
  });

  const { firstCrop, secondCrop } = isCropToggle;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCloseModal = () => {
    setIsCropToggle({ firstCrop: false, secondCrop: false });
  };

  const handleCropImageToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      if (target.value === 'firstCrop') {
        setIsCropToggle({ firstCrop: !firstCrop, secondCrop: false });
      } else {
        setIsCropToggle({ firstCrop: false, secondCrop: !secondCrop });
      }
    }
  };
  return (
    <>
      {(firstCrop || secondCrop) && (
        <StImageCropLayoutWrapper>
          <StHeader>
            <StCropTitle>편집하기</StCropTitle>
            <StCloseBtn onClick={handleCloseModal}>
              <IcClose />
            </StCloseBtn>
          </StHeader>
          <ImageCrop firstCrop={firstCrop} />
          <StCropDescription>좌우로 위치를 옮겨보세요!</StCropDescription>
          <StFooter>
            <StCropBtn onClick={() => console.log(1)}>완료</StCropBtn>
          </StFooter>
        </StImageCropLayoutWrapper>
      )}
      <StMakerVotingLayoutWrapper>
        <TitleInput input={input} handleChangeInput={handleChangeInput} />
        <ImageInput input={input} handleCropImageToggle={handleCropImageToggle} />
      </StMakerVotingLayoutWrapper>
    </>
  );
};

export default MakerVotingLayout;

const StMakerVotingLayoutWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
`;

const StImageCropLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 67.8rem;
  padding: 7.5rem 3.1rem 13.3rem 3.1rem;

  backdrop-filter: blur(70px);

  z-index: 100;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 2.4rem;

  svg {
    pointer-events: none;
  }
`;
const StCloseBtn = styled.button`
  position: absolute;
  right: 0;

  border: none;
  background-color: transparent;

  z-index: 100;
`;
const StCropTitle = styled.h1`
  ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20}

  text-align: center;
`;
const StCropDescription = styled.span`
  margin-top: 1.6rem;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
`;
const StFooter = styled.footer`
  width: 100%;
`;
const StCropBtn = styled.button`
  width: 100%;
  height: 5.8rem;
  margin-top: 2.1rem;

  border: none;
  border-radius: 0.9rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  cursor: pointer;
  z-index: 100;
`;
