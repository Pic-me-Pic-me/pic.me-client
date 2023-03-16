import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IcVoteShareBtn } from '../asset/icon';
import { StickerAttachImg } from '../components/common';
import CurrentVoteInfoLayout from '../components/CurrentVote/Layout/CurrentVoteInfoLayout';
import { HeaderLayout } from '../components/Layout';

const CurrentFlowerDetail = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/home')} />
      <StCurrentVoteInfoWrapper>
        <IcVoteShareBtn onClick={() => navigate('/share', { state: voteId })} />
        <CurrentVoteInfoLayout voteTitle="나를 닮은 꽃은?" createdAt="42" totalVoteCount={10} currentVoteCount={3} />
        <StickerAttachImg
          stickerAttachImgSrc="https://user-images.githubusercontent.com/97586683/224237345-a6164178-7588-49de-9675-bf4b8a99d61d.jpg"
          imgWrapperWidthPercent={100}
          imgHight={45.3}
        />
        <StFlowerTestStatus>
          <span>현재 진행 중 ( 3 / 10 )</span>
        </StFlowerTestStatus>
      </StCurrentVoteInfoWrapper>
    </>
  );
};
export default CurrentFlowerDetail;

const StCurrentVoteInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 1.8rem 0 1.8rem;

  & > svg {
    position: absolute;

    width: 5.93rem;
    height: 5.93rem;

    bottom: 20rem;
    right: 2.07rem;

    cursor: pointer;

    z-index: 1;
  }
`;

const StFlowerTestStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1.1rem;

  width: 100%;
  height: 5.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  border-radius: 0.75389rem;
  & > span {
    text-align: center;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}
  }
`;
