import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Error } from '../components/common';
import CurrentVoteBtn from '../components/CurrentVote/CurrentVoteBtn';
import CurrentVoteInfo from '../components/CurrentVote/CurrentVoteInfo';
import CurrentVoteSlider from '../components/CurrentVote/CurrentVoteSlider';
import LandingCurrentVote from '../components/Landing/maker/LandingCurrentVote';
import LandingHeader from '../components/Landing/maker/LandingHeader';
import { HeaderLayout } from '../components/Layout';
import useGetCurrentVote from '../lib/hooks/useGetCurrentVote';
import { pictureResultState, stickerResultState, voteResultState } from '../recoil/maker/atom';
import { jsonGetStickerList } from '../utils/jsonGetStickerList';

const CurrentVoteDetail = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const { voteResult, isLoading, isError } = useGetCurrentVote(voteId);

  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const setVoteResult = useSetRecoilState(voteResultState);
  const setPictureResultState = useSetRecoilState(pictureResultState);
  const setStickerResultState = useSetRecoilState(stickerResultState);
  const resetVoteResult = useResetRecoilState(voteResultState);
  const resetPictureResult = useResetRecoilState(pictureResultState);
  const resetStickerResult = useResetRecoilState(stickerResultState);

  useEffect(() => {
    resetVoteResult();
    resetPictureResult();
    resetStickerResult();
  }, []);

  useEffect(() => {
    if (voteResult) {
      setVoteResult(voteResult);
      setPictureResultState(voteResult.Picture);
      setStickerResultState(jsonGetStickerList(voteResult.Picture[currentIdx].Sticker));
      window.scrollTo(0, 0);
    }
  }, [currentIdx, voteResult]);

  if (isLoading)
    return (
      <>
        <LandingHeader />
        <LandingCurrentVote />
      </>
    );
  if (isError) return <Error />;

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/home')} />
      <CurrentVoteDetailWrapper>
        <CurrentVoteInfo />
        <CurrentVoteSlider />
        <CurrentVoteBtn />
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

  width: 100%;
`;
