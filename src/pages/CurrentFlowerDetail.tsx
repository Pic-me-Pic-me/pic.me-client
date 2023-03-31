import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcVoteShareBtn } from '../asset/icon';
import { StickerAttachImg } from '../components/common';
import CurrentVoteInfoLayout from '../components/CurrentVote/Layout/CurrentVoteInfoLayout';
import { HeaderLayout } from '../components/Layout';
import useGetFlowerVoteDetailData from '../lib/hooks/useGetFlowerVoteDetailData';
import { flowerPictureResultState, voteResultState } from '../recoil/maker/atom';

const CurrentFlowerDetail = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const { flowerResult, isLoading, isError } = useGetFlowerVoteDetailData(voteId);

  const setFlowerResult = useSetRecoilState(voteResultState);
  const setFlowerPictureResult = useSetRecoilState(flowerPictureResultState);
  const flowerResultData = useRecoilValue(voteResultState);
  const flowerPictureDate = useRecoilValue(flowerPictureResultState);

  useEffect(() => {
    if (flowerResult) {
      setFlowerResult(flowerResult);
      setFlowerPictureResult(flowerResult.Picture);
    }
  }, [flowerResult, setFlowerResult, setFlowerPictureResult]);

  const strCreatedDate = flowerResultData.createdDate.toString();

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/home')} />
      <StCurrentVoteInfoWrapper>
        <IcVoteShareBtn onClick={() => navigate('/share', { state: { voteId, isFlowerVote: true } })} />

        <CurrentVoteInfoLayout
          // voteTitle={flowerResultData.voteTitle}
          voteTitle="나를 닮은 꽃은?"
          createdDate={strCreatedDate}
          totalVoteCount="총 10명 중"
          currentVoteCount={`${flowerPictureDate[0].count}명 참가`}
        />
        <StickerAttachImg stickerAttachImgSrc={flowerPictureDate[0].url} imgWrapperWidthPercent={100} imgHight={45.3} />
        <StFlowerTestStatus>
          <span>현재 진행 중 ( {flowerPictureDate[0].count} / 10 )</span>
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

  margin: 0 1.8rem;

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
