import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { PictureProps, StickerProps, VoteInfoProps } from '../../../types/voting';

const VoteSlider = (voteInfo: VoteInfoProps) => {
  const { voteId, voteStatus, voteTitle, currentVote, createDate, Picture } = voteInfo;

  //   const [currentIdx, setCurrentIdx] = useState<number>(0);
  //   const [pictureUrl, setPictureUrl] = useState<string[]>([]);

  //   useEffect(() => {
  //     setPictureUrl(Picture);
  //     console.log(pictureUrl);
  //   }, []);

  return (
    <>
      {/* <StImgWrapper ref={ref}>
        <StImgUl
          currentIdx={currentIdx}
          dragItemWidth={275}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = pictureUrl.length - 1;
              Array(2)
                .fill(0)
                .map((v, i) => 2 - i)
                .some((num) => {
                  if (deltaX < -162 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx + num, 0, maxIndex));
                    return true;
                  }
                  if (deltaX > 162 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx - num, 0, maxIndex));
                    return true;
                  }
                });

              setTransX(0);
            },
          })}>
          {pictureUrl.map((url, idx) => (
            <li key={idx}>
              {currentIdx === idx ? (
                <StSelectedImg src={url} alt="선택된 사진" />
              ) : (
                <StUnselectedImg src={url} alt="선택되지 않은 사진" />
              )}
            </li>
          ))}
        </StImgUl>
      </StImgWrapper>
      <StDotWrapper>
        {currentIdx === 0 ? (
          <>
            <StSelectedDot />
            <StUnselectedDot />
          </>
        ) : (
          <>
            <StUnselectedDot />
            <StSelectedDot />
          </>
        )}
      </StDotWrapper> */}
    </>
  );
};
export default VoteSlider;

const StImgWrapper = styled.article`
  width: 100vw;

  padding-left: 2rem;
  padding-right: 2rem;
`;

const StImgUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number }>`
  display: flex;
  gap: 1.3rem;

  padding-right: 2rem;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 200}ms ease-in -out 0s;
    `};
`;

const StSelectedImg = styled.img`
  margin-top: 1.9rem;

  width: 32.5rem;
  height: 43.4rem;

  border-radius: 1.2rem;
`;

const StUnselectedImg = styled(StSelectedImg)`
  opacity: 0.5;
`;

const StDotWrapper = styled.section`
  display: flex;
  gap: 0.8rem;

  margin-top: 1.9rem;
`;

const StDotStructure = styled.div`
  width: 0.8rem;
  height: 0.8rem;

  border-radius: 50rem;
`;

const StSelectedDot = styled(StDotStructure)`
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
`;

const StUnselectedDot = styled(StDotStructure)`
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;
