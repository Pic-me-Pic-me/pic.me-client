import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import TimeAgo from 'timeago-react';

import { IcVoteShareBtn } from '../asset/icon';
import { Error } from '../components/common';
import Modal from '../components/common/Modal';
import StickerAttachImg from '../components/common/StickerAttachImg';
import { HeaderLayout } from '../components/Layout';
import { STICKER_LIST } from '../constant/StickerIconList';
import { patchCurrentVoteData } from '../lib/api/voting';
import { useCarouselSize } from '../lib/hooks/useCarouselSize';
import useGetCurrentVote from '../lib/hooks/useGetCurrentVote';
import { stickerResultState } from '../recoil/maker/atom';
import { NaturalImgInfo, StickerLocation } from '../types/vote';
import { jsonGetStickerList } from '../utils/jsonGetStickerList';
import { modifySliderRange, picmeSliderEvent } from '../utils/picmeSliderEvent';

const CurrentVoteDetail = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();
  const { voteResult, isLoading, isError } = useGetCurrentVote(voteId);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const setStickerResultState = useSetRecoilState(stickerResultState);
  const resetStickerResult = useResetRecoilState(stickerResultState);
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();
  const [imgViewInfo, setImgViewInfo] = useState<NaturalImgInfo>();

  const { ref, width } = useCarouselSize();

  timeago.register('ko', ko);
  const createdAt =
    voteResult?.createdDate.toString().slice(0, 10) + ' ' + voteResult?.createdDate.toString().slice(11, 19);

  useEffect(() => {
    resetStickerResult();
  }, []);

  useEffect(() => {
    if (voteResult) {
      setStickerResultState(jsonGetStickerList(voteResult.Picture[currentIdx].Sticker));
      window.scrollTo(0, 0);
    }
  }, [currentIdx, voteResult]);

  const handleGoResultPage = () => {
    patchCurrentVoteData(voteId);
    navigate(`/result/${voteId}`);
  };

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight, width, height } = e.target as HTMLImageElement;
    setImgViewInfo({ width, height });
    setImgInfo({ width: naturalWidth, height: naturalHeight });
  };

  // if (isLoading)
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
          <h1>{voteResult?.voteTitle}</h1>
        </StVoteInfo>
        <StVoteStatus>
          <span>{voteResult?.currentVote}명 투표 중</span>
          <span>{voteResult?.Picture[currentIdx].count}표</span>
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
                const maxIndex = 1;
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
            {voteResult?.Picture.map(({ pictureId, url, count }, idx) => (
              <li key={idx}>
                {currentIdx === idx ? (
                  <>
                    <StickerAttachImg stickerAttachImgSrc={url} imgWrapperWidthPercent={100} imgHight={43.4} />
                  </>
                ) : (
                  <StUnselectedImg width={window.screen.width} src={url} alt="선택되지 않은 사진" />
                )}
              </li>
            ))}
          </StImgUl>
        </StImgWrapper>
        <StDotWrapper>
          {!currentIdx ? (
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
        <StCompleteVoteBtnStructure>
          <IcVoteShareBtn onClick={() => navigate('/share', { state: voteId })} />
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
  width: ${({ width }) => (width * 1.55) / 10}rem;
  touch-action: auto;

  & > li {
    position: relative;

    width: 100%;

    margin-top: 1.9rem;
  }
`;
const StUnselectedImg = styled.img<{ width: number }>`
  width: 100%;

  opacity: 0.5;
  border-radius: 1.2rem;

  object-fit: cover;
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
  position: relative;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  & > svg {
    position: absolute;

    bottom: 13rem;
    right: 3em;

    cursor: pointer;
  }
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
