import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcHeaderLast } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { StickerGuide } from '../../components/Voting/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';
import { postStickerData } from '../../lib/api/voting';
import { playerStickerInfoState } from '../../recoil/player/atom';

const StickerAttachment = () => {
  const navigate = useNavigate();
  const [isStickerGuide, setIsStickerGuide] = useState<boolean>(true);
  const playerStickerVotingInfo = useRecoilValue(playerStickerInfoState);
  const isActiveBtn: boolean = playerStickerVotingInfo.location.length > 0;

  const handleVotingSuccess = async () => {
    if (isActiveBtn)
      try {
        const { data } = await postStickerData(stickerVotingInfo);
        navigate('/player/voting/result');
      } catch (e) {
        console.error(e);
      }
  };
  const handlePrevpage = () => {
    navigate(-1);
  };

  const handleStickerGuide = () => {
    if (isStickerGuide) setIsStickerGuide(!isStickerGuide);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderLast />} />
      <VotingLayout
        votingTitle="그 이유를 사진에 스티커로 표현해보세요!"
        pageType="StickerAttachment"
        votingSubTitle={isStickerGuide ? '최대 3회' : `${3 - playerStickerVotingInfo.location.length}회 남음`}
        margin={0.9}
        btnTitle="투표 완료하기"
        isActiveBtn={isActiveBtn}
        handlePlayer={handleVotingSuccess}>
        {
          <StStickerAttachmentWrapper onClick={handleStickerGuide}>
            {isStickerGuide && <StickerGuide />}
            <StickerVoting isStickerGuide={isStickerGuide} />
          </StStickerAttachmentWrapper>
        }
      </VotingLayout>
    </div>
  );
};

export default StickerAttachment;
const StStickerAttachmentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
