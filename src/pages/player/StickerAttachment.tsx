import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcHeaderLast, IcHeaderLogo } from '../../asset/icon';
import { LandingHeader, LandingVoting } from '../../components/Landing/player';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { StickerGuide } from '../../components/Voting/player';
import StickerVoting from '../../components/Voting/player/StickerVoting';
import { postStickerData } from '../../lib/api/voting';
import { stickerInfoState } from '../../recoil/player/atom';

const StickerAttachment = () => {
  const navigate = useNavigate();
  const [isStickerGuide, setIsStickerGuide] = useState<boolean>(true);
  const stickerVotingInfo = useRecoilValue(stickerInfoState);
  const [isLoading, setIsLoading] = useState(true);
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
      {isLoading ? (
        <>
          <LandingHeader />
          <LandingVoting pageType="StickerAttachment" margin={0.3}>
            <div className="landging_img"></div>
          </LandingVoting>
        </>
      ) : (
        <>
          <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderLast />} />
          <VotingLayout
            votingTitle="그 이유를 사진에 스티커로 표현해보세요!"
            pageType="StickerAttachment"
            votingSubTitle={isStickerGuide ? '최대 3회' : `${3 - stickerVotingInfo.location.length}회 남음`}
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
        </>
      )}
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
