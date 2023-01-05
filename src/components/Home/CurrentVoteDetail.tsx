import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcVoteShareBtn } from '../../asset/icon';
import { ImgSiru } from '../../asset/image';
import { useCarouselSize } from '../../lib/hooks/useCarouselSize';
import { modifySliderRange, picmeSliderEvent } from '../../utils/picmeSliderEvent';
import { HeaderLayout } from '../Layout';

const CurrentVoteDetail = () => {
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoShare = () => {
    navigate('/share');
  };

  const ImgList: JSX.Element[] = [<ImgSiru key="siruone" />, <ImgSiru key="sirutwo" />];

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={handleGoHome} />
      <CurrentVoteDetailWrapper>
        <span>42분 전</span>
        <h1>어제 연남동 가서 찍은 사진 골라주ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</h1>
        <StVoteStatus>
          <span>15명 투표 중</span>
          <span>12표</span>
        </StVoteStatus>
        <StImgUl
          currentIdx={currentIdx}
          dragItemWidth={275}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = ImgList.length - 1;
              Array(2)
                .fill(0)
                .map((v, i) => 2 - i)
                .some((num) => {
                  if (deltaX < 70 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx + num, 0, maxIndex));
                    return true;
                  }
                  if (deltaX > 70 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx - num, 0, maxIndex));
                    return true;
                  }
                });

              setTransX(0);
            },
          })}>
          <li>
            <img src={ImgSiru} alt="투표현황 사진" />
          </li>
          <li>
            <img src={ImgSiru} alt="투표현황 사진" />
          </li>
          {/* {ImgList.map((menu, idx) =>
            idx !== currentIdx ? (
              <li key={idx} className="select_item">
                {menu}
              </li>
            ) : (
              <li key={idx}>{menu}</li>
            ),
          )} */}
        </StImgUl>
        <IcVoteShareBtn onClick={handleGoShare} />
        <StCompleteVoteBtn>투표 마감</StCompleteVoteBtn>
      </CurrentVoteDetailWrapper>
    </>
  );
};

export default CurrentVoteDetail;

const CurrentVoteDetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  & > span {
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }

  & > h1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    margin-top: 0.8rem;

    width: 34.6rem;
    height: 5.6rem;

    ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22}
  }

  & > svg {
    position: fixed;

    top: 56rem;
    left: 32.8rem;

    cursor: pointer;
  }
`;

const StVoteStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 15.1rem;
  height: 2.7rem;

  margin-top: 0.8rem;
  padding-left: 2.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_6};
  border-radius: 3.3rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}

  & > span:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 5.6rem;
    height: 2.7rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    border-radius: 3.3rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;

const StImgUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number }>`
  display: flex;
  gap: 1.3rem;

  padding-left: 2rem;
  width: 43rem;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 200}ms ease-in -out 3s;
    `};
  /* & > .select_item {
    opacity: 0.5;
  } */

  & > li > img {
    margin-top: 1.9rem;

    width: 32.5rem;
    height: 43.4rem;

    border-radius: 1.2rem;
  }
`;

const StCompleteVoteBtn = styled.button`
  width: 39rem;
  height: 6rem;

  margin-top: 4.7rem;
  padding: 0;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
  border-radius: 0.9rem;
`;
