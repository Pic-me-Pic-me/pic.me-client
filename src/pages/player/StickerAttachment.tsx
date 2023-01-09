import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { IcHeaderLast, IcHeaderLogo } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';
import { postStickerData } from '../../lib/api/voting';
import { stickerInfoState } from '../../recoil/player/atom';

const StickerAttachment = () => {
  const stickerVotingInfo = useRecoilValue(stickerInfoState);
  const isActiveBtn: boolean = stickerVotingInfo.location.length > 0;
  const navigate = useNavigate();

  const handleVotingSuccess = async () => {
    if (isActiveBtn)
      try {
        const { data } = await postStickerData(stickerVotingInfo);
        navigate('/player/voting/result');
      } catch (e) {
        console.log(e);
      }
  };
  const handlePrevpage = () => {
    navigate('/player/picture_voting');
  };
  return (
    <div>
      <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderLast />} />
      <VotingLayout
        votingTitle="그 이유를 사진에 스티커로 표현해보세요!"
        btnTitle="투표 완료하기"
        isActiveBtn={isActiveBtn}
        handlePlayer={handleVotingSuccess}>
        {<StickerVoting />}
      </VotingLayout>
    </div>
  );
};

export default StickerAttachment;
