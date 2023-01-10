import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as timeago from 'timeago.js';
import { format } from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import TimeAgo from 'timeago-react';

import { IcVoteShareBtn } from '../asset/icon';
import { Error } from '../components/common';
import Modal from '../components/common/Modal';
import LandingCurrentVote from '../components/Landing/maker/LandingCurrentVote';
import LandingHeader from '../components/Landing/maker/LandingHeader';
import { HeaderLayout } from '../components/Layout';
import { patchCurrentVoteData } from '../lib/api/voting';
import { useCarouselSize } from '../lib/hooks/useCarouselSize';
import { useGetCurrentVote } from '../lib/hooks/useGetCurrentVote';
import { CurrentVoteInfo, GetStickerResultInfo, StickerLocation } from '../types/voting';
import { modifySliderRange, picmeSliderEvent } from '../utils/picmeSliderEvent';

const CurrentVoteDetail = () => {
  const { voteid } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const [voteInfo, setVoteInfo] = useState<CurrentVoteInfo>();
  const [currentVote, setCurrentVote] = useState<number>();
  const [pictureUrl, setPictureUrl] = useState<string[]>([]);
  const [pictureCount, setPictureCount] = useState<number[]>([]);
  const [stickerList, setStickerList] = useState<GetStickerResultInfo[]>([]);
  const [resultStickerList, setResultStickerList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const { currentVoteInfo, isLoading, isError } = useGetCurrentVote(voteid);

  const { ref, width } = useCarouselSize();

  timeago.register('ko', ko);
  const createdAt =
    voteInfo?.createdDate.toString().slice(0, 10) + ' ' + voteInfo?.createdDate.toString().slice(11, 19);

  useEffect(() => {
    if (currentVoteInfo) {
      setVoteInfo(currentVoteInfo);
      setCurrentVote(currentVoteInfo.currentVote);
      setPictureUrl([currentVoteInfo.Picture[0].url, currentVoteInfo.Picture[1].url]);
      setPictureCount([currentVoteInfo.Picture[0].count, currentVoteInfo.Picture[1].count]);
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
      console.log(getStickerList);
      //setResultStickerList(getStickerList);
    }
  }, [voteInfo]);

  const handleGoResultPage = () => {
    patchCurrentVoteData(voteid);
    navigate(`/result/${voteid}`);
  };

  if (isLoading && ref.current === null)
    return (
      <>
        <LandingHeader />
        <LandingCurrentVote />
      </>
    );
  if (isError) return <Error />;

  // console.log('swr', currentVoteInfo, isLoading);
  // console.log(ref, width, currentIdx);

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/')} />
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
        <StCompleteVoteBtn onClick={() => setIsModalShowing(true)}>투표 마감</StCompleteVoteBtn>
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

  overflow: hidden;

  padding-left: 2rem;
  padding-right: 2rem;

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

    ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22}
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
`;

const StImgUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number; width: number }>`
  width: 100%;

  display: flex;
  gap: 1.3rem;

  padding-right: 2rem;

  ${({ currentIdx, dragItemWidth, width }) =>
    currentIdx === 0
      ? css`
          left: ${(dragItemWidth * 0.1) / 10}rem;
        `
      : css`
          left: ${(width * 1.5) / 35 + (dragItemWidth * 0.1) / 30}rem;
        `}
  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 13.275}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 300}ms ease-in -out 0s;
    `};
`;

const StSelectedImg = styled.img<{ width: number }>`
  width: ${({ width }) => width * 0.0755}rem;

  margin-top: 1.9rem;

  width: 32.5rem;
  height: 43.4rem;

  border-radius: 1.2rem;
`;

const StUnselectedImg = styled(StSelectedImg)`
  width: ${({ width }) => width * 0.0755}rem;

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

const StCompleteVoteBtn = styled.button`
  width: 100%;
  height: 6rem;

  margin: 2rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
  border-radius: 0.9rem;
`;
