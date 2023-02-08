import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { CurrentVoteBtn, CurrentVoteInfo, CurrentVoteSlider } from '../components/CurrentVote';
import { LandingCurrentVote, LandingHeader } from '../components/Landing/maker';
import { HeaderLayout } from '../components/Layout';
import useGetCurrentVote from '../lib/hooks/useGetCurrentVote';
import { pictureCurrentIdx, pictureResultState, stickerResultState, voteResultState } from '../recoil/maker/atom';
import Error404 from './Error404';

const CurrentVoteDetail = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const { voteResult, isLoading, isError } = useGetCurrentVote(voteId);

  const currentIdx = useRecoilValue(pictureCurrentIdx);

  const setVoteResult = useSetRecoilState(voteResultState);
  const setPictureResultState = useSetRecoilState(pictureResultState);
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
  if (isError) return <Error404 />;

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
