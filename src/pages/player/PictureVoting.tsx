import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { IcHeaderFirst } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import PictureSlider from '../../components/Voting/player/PictureSlider';
import { votingInfoState } from '../../recoil/player/atom';

const PictureVoting = () => {
  const navigate = useNavigate();
  const votingInfoAtom = useRecoilValue(votingInfoState);

  const handleVotingSuccess = () => {
    navigate('/player/reason_voting');
  };
  const handlePrevpage = () => {
    navigate('/player');
  };
  return (
    <div>
      <HeaderLayout isSideIcon={true} handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderFirst />} />
      <VotingLayout
        votingTitle={votingInfoAtom.voteTitle}
        pageType="PictureVoting"
        votingSubTitle="*당신의 모든 선택은 익명으로 전달됩니다"
        margin={1}
        btnTitle="이 사진으로 하기"
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {<PictureSlider />}
      </VotingLayout>
    </div>
  );
};

export default PictureVoting;
