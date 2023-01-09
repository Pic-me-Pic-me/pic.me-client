import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcHeaderLast, IcHeaderLogo } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { StickerGuide, StickerResultVoting } from '../../components/Voting/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';
import { postStickerData } from '../../lib/api/voting';
import { stickerInfoState } from '../../recoil/player/atom';

const ResultVoting = () => {
  const navigate = useNavigate();
  const [isStickerGuide, setIsStickerGuide] = useState<boolean>(true);
  const stickerVotingInfo = useRecoilValue(stickerInfoState);
  const isActiveBtn: boolean = stickerVotingInfo.location.length > 0;

  const handleVotingSuccess = async () => {
    if (isActiveBtn)
      try {
        // const { data } = await postStickerData(stickerVotingInfo);
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
      <HeaderLayout isSideIcon={true} IcHeaderSequence={<IcHeaderLast />} />
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
const StStickerAttachmentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2.6rem;
`;
