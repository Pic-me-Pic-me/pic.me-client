import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import TimeAgo from 'timeago-react';

import { IcVoteShareBtn } from '../asset/icon';
import { Error } from '../components/common';
import Modal from '../components/common/Modal';
import LandingCurrentVote from '../components/Landing/maker/LandingCurrentVote';
import LandingHeader from '../components/Landing/maker/LandingHeader';
import { HeaderLayout } from '../components/Layout';
import { STICKER_LIST } from '../constant/StickerIconList';
import { getCurrentVoteDatailData, patchCurrentVoteData } from '../lib/api/voting';
import { useCarouselSize } from '../lib/hooks/useCarouselSize';
import { useGetCurrentVote } from '../lib/hooks/useGetCurrentVote';
import { CurrentVoteInfo, StickerLocation, StickerResultInfo } from '../types/vote';
import { modifySliderRange, picmeSliderEvent } from '../utils/picmeSliderEvent';

const CurrentVoteDetail = () => {
  const { voteid } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const [voteInfo, setVoteInfo] = useState<CurrentVoteInfo>();
  const [currentVote, setCurrentVote] = useState<number>();
  const [pictureUrl, setPictureUrl] = useState<string[]>([]);
  const [pictureCount, setPictureCount] = useState<number[]>([]);
  const [resultStickerList, setResultStickerList] = useState<StickerResultInfo[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const { ref, width } = useCarouselSize();

  const { currentVoteInfo, isError } = useGetCurrentVote(voteid);

  timeago.register('ko', ko);
  const createdAt =
    voteInfo?.createdDate.toString().slice(0, 10) + ' ' + voteInfo?.createdDate.toString().slice(11, 19);

  useEffect(() => {
    if (currentVoteInfo) {
      setVoteInfo(currentVoteInfo.data);
      setCurrentVote(currentVoteInfo.data.currentVote);
      setPictureUrl([currentVoteInfo.data.Picture[0].url, currentVoteInfo.data.Picture[1].url]);
      setPictureCount([currentVoteInfo.data.Picture[0].count, currentVoteInfo.data.Picture[1].count]);
    }
  }, [currentVoteInfo]);

  useEffect(() => {
    if (voteInfo) {
      const { Picture } = voteInfo;
      const getStickerList = Picture[currentIdx].Sticker.filter(
        ({ emoji, count, stickerLocation }) => stickerLocation !== '',
      ).map(({ emoji, count, stickerLocation }) => {
        const jsonLocation = JSON.parse(stickerLocation) as StickerLocation[];
        return {
          stickerLocation: jsonLocation,
          emoji,
          count,
        };
      });
      setResultStickerList([...getStickerList]);
    }
  }, [voteInfo, currentIdx]);

  const handleGoResultPage = () => {
    patchCurrentVoteData(voteid);
    navigate(`/result/${voteid}`);
  };

  // if (isLoading && currentVoteInfo == undefined)
  //   return (
  //     <>
  //       <LandingHeader />
  //       <LandingCurrentVote />
  //     </>
  //   );
  if (isError) return <Error />;

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/home')} />
      <CurrentVoteDetailWrapper>
        <StVoteInfo>
          <span>
            <TimeAgo datetime={createdAt} locale="ko" />
          </span>
          <h1>{voteInfo?.voteTitle}</h1>
        </StVoteInfo>
        <StVoteStatus>
          <span>{currentVote}명 투표 중</span>
          {currentIdx === 0 ? <span>{pictureCount[0]}표</span> : <span>{pictureCount[1]}표</span>}
        </StVoteStatus>
        <StImgWrapper ref={ref}>
          <StImgUl
            currentIdx={currentIdx}
            dragItemWidth={width}
            transX={transX}
            width={window.screen.width}
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
            {voteInfo?.Picture.map(({ pictureId, url, count }, idx) => (
              <li key={idx}>
                {currentIdx === idx ? (
                  <StSelectedImg width={window.screen.width} src={url} alt="선택된 사진" />
                ) : (
                  <StUnselectedImg width={window.screen.width} src={url} alt="선택되지 않은 사진" />
                )}
              </li>
            ))}
            {/* 스티커 붙이는 컴포넌트 쇽샥해서 여기에 뒀습니다. */}
            {resultStickerList.map(({ stickerLocation, emoji }, idx) =>
              stickerLocation.map(({ x, y, degRate }, stickerIdx) => (
                <StEmojiIcon key={`sticker${stickerIdx}_${emoji}`} locationX={x} locationY={y} degRate={degRate}>
                  {STICKER_LIST[emoji].icon()}
                </StEmojiIcon>
              )),
            )}
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
        </StDotWrapper>
        <IcVoteShareBtn onClick={() => navigate('/share', { state: voteid })} />
        <StCompleteVoteBtnStructure>
          <StCompleteVoteBtn onClick={() => setIsModalShowing(true)}>투표 마감</StCompleteVoteBtn>
        </StCompleteVoteBtnStructure>
      </CurrentVoteDetailWrapper>
      <Modal
        isShowing={isModalShowing}
        message="투표를 마감하시겠습니까?"
        handleHide={() => setIsModalShowing(false)}
        handleConfirm={handleGoResultPage}
        isFinishing={true}
      />
    </>
  );
};

export default CurrentVoteDetail;

const CurrentVoteDetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  & > svg {
    position: fixed;

    top: 62vh;
    left: 75%;

    cursor: pointer;
  }
`;

const StVoteInfo = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20}
  }
`;

const StVoteStatus = styled.section`
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

const StImgWrapper = styled.article`
  width: 100%;
  height: 45.3rem;

  position: relative;

  overflow: hidden;
`;

const StImgUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number; width: number }>`
  display: flex;

  width: 100%;
  align-items: center;
  position: absolute;
  gap: 1.3rem;

  ${({ currentIdx, dragItemWidth, width }) =>
    currentIdx === 0
      ? css`
          left: ${(dragItemWidth * 0.05) / 10}rem;
        `
      : css`
          left: ${(width * 1.5) / 45 + (dragItemWidth * 0.1) / 45}rem;
        `}
  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10.55}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 300}ms ease-in -out 0s;
    `};
  width: ${({ width }) => (width * 1.5) / 10}rem;
  touch-action: auto;
`;

const StSelectedImg = styled.img<{ width: number }>`
  position: relative;

  width: ${({ width }) => width * 0.075585}rem;
  /* width: 32.5rem; */

  margin-top: 1.9rem;
  height: 43.4rem;

  border-radius: 1.2rem;

  object-fit: cover;
`;

const StUnselectedImg = styled(StSelectedImg)`
  width: ${({ width }) => width * 0.075585}rem;
  /* width: 32.5rem; */

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

const StCompleteVoteBtnStructure = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;
`;

const StCompleteVoteBtn = styled.button`
  width: 100%;
  height: 6rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
  border-radius: 0.9rem;
`;
const StEmojiIcon = styled.div<{ locationX: number; locationY: number; degRate: number }>`
  position: absolute;
  left: ${({ locationX }) => locationX}rem;
  top: ${({ locationY }) => locationY}rem;

  & > svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 5.3rem;
    height: 5.3rem;
    z-index: 3;
    transform-origin: 50% 50%;
    transform: ${({ degRate }) => `rotate(${degRate}deg)`};
  }
`;
