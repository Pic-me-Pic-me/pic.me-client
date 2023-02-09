import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { StickerResultVoting } from '../../components/Voting/player';
<<<<<<< HEAD
import { playerStickerInfoState } from '../../recoil/player/atom';
=======
import { stickerInfoState } from '../../recoil/player/atom';
>>>>>>> 7264b6dd294299171fd6f5e3477b0626f23f66c5

const ResultVoting = () => {
  const navigate = useNavigate();
  const playerStickerVotingInfo = useRecoilValue(playerStickerInfoState);

  const isActiveBtn: boolean = playerStickerVotingInfo.location.length > 0;

  const handleVotingSuccess = async () => {
    navigate('/');
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeaderLayout isSideIcon={true} />
      <VotingLayout
        votingTitle="투표가 완료되었습니다!"
        votingNextLineTitle="실시간 투표 현황을 확인해보세요!"
        pageType="ResultVoting"
        btnTitle="내 투표 만들러 가기"
        isActiveBtn={isActiveBtn}
        handlePlayer={handleVotingSuccess}>
        {<StickerResultVoting />}
      </VotingLayout>
    </div>
  );
};

export default ResultVoting;
