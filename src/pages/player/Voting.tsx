import { useNavigate } from 'react-router-dom';

import { VotingLayout } from '../../components/Layout/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';

const PlayerVoting = () => {
  const navigate = useNavigate();
  const handleVotingSuccess = () => {
    navigate('/player/voting/success');
  };
  return (
    <>
      <VotingLayout
        votingTitle="그 이유를 사진에 스티커로 표현해보세요!"
        btnTitle="투표 완료하기"
        handlePlayer={handleVotingSuccess}>
        {<StickerVoting />}
      </VotingLayout>
    </>
  );
};

export default PlayerVoting;
