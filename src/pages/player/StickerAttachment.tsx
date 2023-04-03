import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcBlackHeaderLast, IcHeaderLast } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { StickerGuide } from '../../components/Voting/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';
import {
  FLOWER_STICKER_ATTACH_INFO,
  FLOWER_STICKER_ATTACH_SUBINFO,
  STICKER_ATTACH_INFO,
} from '../../constant/playerInfo';
import { postFlowerStickerData, postStickerData } from '../../lib/api/voting';
import { playerStickerInfoState } from '../../recoil/player/atom';

const StickerAttachment = () => {
  const navigate = useNavigate();
  const [isStickerGuide, setIsStickerGuide] = useState<boolean>(true);
  const playerStickerVotingInfo = useRecoilValue(playerStickerInfoState);
  const isActiveBtn: boolean = playerStickerVotingInfo.location.length > 0;

  const { isFlowerVoting } = playerStickerVotingInfo;

  const handleVotingSuccess = async () => {
    if (isActiveBtn)
      try {
        const { data } = isFlowerVoting
          ? await postFlowerStickerData(playerStickerVotingInfo)
          : await postStickerData(playerStickerVotingInfo);

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
      {isFlowerVoting ? (
        <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcBlackHeaderLast />} />
      ) : (
        <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderLast />} />
      )}
      <VotingLayout
        votingTitle={isFlowerVoting ? FLOWER_STICKER_ATTACH_INFO : STICKER_ATTACH_INFO}
        pageType="StickerAttachment"
        votingSubTitle={
          isFlowerVoting
            ? FLOWER_STICKER_ATTACH_SUBINFO
            : isStickerGuide
            ? '최대 3회'
            : `${3 - playerStickerVotingInfo.location.length}회 남음`
        }
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

  position: relative;

  width: 100%;
`;
