import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcVoteShareBtn } from '../../asset/icon';
import { ImgSiru } from '../../asset/image';
import { deleteCurrentVoteData, getCurrentVoteData } from '../../lib/api/voting';
import { useCarouselSize } from '../../lib/hooks/useCarouselSize';
import { PictureProps, StickerProps, VoteInfoProps } from '../../types/voting';
import { modifySliderRange, picmeSliderEvent } from '../../utils/picmeSliderEvent';
import Modal from '../common/Modal';
import { HeaderLayout } from '../Layout';
import VoteInfo from './VoteInfo';

const CurrentVoteDetail = () => {
  const navigate = useNavigate();

  const [voteInfo, setVoteInfo] = useState<VoteInfoProps>();
  const [currentVote, setCurrentVote] = useState<number>();
  const [pictureUrl, setPictureUrl] = useState<string[]>([]);
  const [pictureCount, setPictureCount] = useState<number[]>();
  const [pictureInfo, setPictureInfo] = useState<PictureProps[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const { ref, width } = useCarouselSize();

  const HandleGetCurrentVoteData = async () => {
    const res = await getCurrentVoteData();
    setVoteInfo({
      voteId: res.data.id,
      voteStatus: res.data.status,
      voteTitle: res.data.title,
      createDate: res.data.createdDate,
    });
    setCurrentVote(res.data.current);
    setPictureInfo(res.data.Picture);
    setPictureUrl([res.data.Picture[0].url, res.data.Picture[1].url]);
    setPictureCount([res.data.Picture[0].count, res.data.Picture[1].count]);
  };

  useEffect(() => {
    HandleGetCurrentVoteData();
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoShare = () => {
    navigate('/share');
  };

  const handleModal = () => {
    setIsModalShowing(false);
  };

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={handleGoHome} />
      <CurrentVoteDetailWrapper>
        <VoteInfo {...voteInfo} />
        <StVoteStatus>
          <span>{currentVote}명 투표 중</span>
          {/* {currentIdx === 0 ? <span>{pictureCount[0].count}표</span> : <span>{pictureCount[0].count}표</span>} */}
          <span>12표</span>
        </StVoteStatus>
        <StImgWrapper ref={ref}>
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
        </StDotWrapper>
        <IcVoteShareBtn onClick={handleGoShare} />
        <StCompleteVoteBtn onClick={() => setIsModalShowing(true)}>투표 마감</StCompleteVoteBtn>
      </CurrentVoteDetailWrapper>
      <Modal
        isShowing={isModalShowing}
        message="투표를 마감하시겠습니까?"
        handleHide={() => setIsModalShowing(false)}
        handleConfirm={deleteCurrentVoteData}
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
