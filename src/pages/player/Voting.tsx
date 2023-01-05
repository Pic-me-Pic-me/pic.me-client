import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { VotingLayout } from '../../components/Layout/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';
import { postStickerData } from '../../lib/api/voting';
import { stickerInfoState } from '../../recoil/player/atom';

const PlayerVoting = () => {
  const stickerVotingInfo = useRecoilValue(stickerInfoState);

  const navigate = useNavigate();
  const handleVotingSuccess = async () => {
    try {
      const { data } = await postStickerData(stickerVotingInfo);
      navigate('/player/voting/result');
    } catch (e) {
      console.log(e);
    }
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
