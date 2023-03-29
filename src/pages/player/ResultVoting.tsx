import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { StickerResultVoting } from '../../components/Voting/player';
import { MAKE_MY_FLOWER_VOTING, MAKE_MY_VOTING } from '../../constant/playerInfo';
import { playerStickerInfoState } from '../../recoil/player/atom';

const ResultVoting = () => {
  const navigate = useNavigate();
  const playerStickerVotingInfo = useRecoilValue(playerStickerInfoState);
  const { isFlowerVoting } = playerStickerVotingInfo;

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
        btnTitle={isFlowerVoting ? MAKE_MY_FLOWER_VOTING : MAKE_MY_VOTING}
        isActiveBtn={isActiveBtn}
        handlePlayer={handleVotingSuccess}>
        {<StickerResultVoting />}
      </VotingLayout>
    </div>
  );
};

export default ResultVoting;
