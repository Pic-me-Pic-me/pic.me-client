import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { Error, Loading } from '../components/common';
import { HeaderLayout } from '../components/Layout';
import ResultPicSlider from '../components/Result/ResultPicSlider';
import ResultReason from '../components/Result/ResultReason';
import SliderTitle from '../components/Result/SliderTitle';
import useGetVoteResult from '../lib/hooks/useGetVoteResult';
import { stickerResultState } from '../recoil/maker/atom';
import { jsonGetResultStickerList } from '../utils/jsonGetStickerList';

const Result = () => {
  const navigate = useNavigate();
  const { voteId } = useParams() as { voteId: string };
  const { voteResult, isLoading, isError } = useGetVoteResult(voteId);
  const [chosenPictureIdx, setChosenPictureIdx] = useState(0);
  const [isOpenResultReason, setIsOpenResultReason] = useState(false);
  const setStickerResultState = useSetRecoilState(stickerResultState);

  const handleIsOpenResultReason = () => {
    setIsOpenResultReason(!isOpenResultReason);
  };

  useEffect(() => {
    if (voteResult) {
      setStickerResultState(jsonGetResultStickerList(voteResult.Picture[chosenPictureIdx].Sticker));
    }
  }, [voteResult, chosenPictureIdx]);

  if (isError) <Error />;

  if (voteResult)
    return (
      <>
        <StBackgroundWrapper src={voteResult.Picture[chosenPictureIdx].url}>
          <StBackground isChosenPic={!chosenPictureIdx}>
            <HeaderLayout
              HeaderTitle="최종 투표 결과"
              handleGoback={() => navigate('/library')}
              isBanner></HeaderLayout>

            <SliderTitle
              isChosenPic={!chosenPictureIdx}
              voteTitle={voteResult.voteTitle}
              voteTotalNumber={voteResult.Picture[chosenPictureIdx].count}
            />

            <section>
              <ResultPicSlider
                chosenPictureIdx={chosenPictureIdx}
                setChosenPictureIdx={(idx: number) => setChosenPictureIdx(idx)}
              />
              <ResultReason
                totalVoteCount={voteResult.currentVote}
                handleIsOpenResultReason={handleIsOpenResultReason}
                isOpenResultReason={isOpenResultReason}
              />
            </section>
          </StBackground>
        </StBackgroundWrapper>
      </>
    );
  return <Loading />;
};

export default Result;

const StBackgroundWrapper = styled.div<{ src: string }>`
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
`;

const StBackground = styled.main<{ isChosenPic: boolean }>`
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);

  z-index: -5;

  & > svg {
    width: 2.9rem;
    position: absolute;

    top: ${window.screen.height * 0.05}rem;
    ${({ isChosenPic }) =>
      isChosenPic
        ? css`
            right: 0;
          `
        : css`
            left: 0;
          `};

    z-index: 2;
  }
  & > section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
