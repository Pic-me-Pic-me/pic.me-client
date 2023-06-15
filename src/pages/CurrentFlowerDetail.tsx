import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcVoteShareBtn } from '../asset/icon';
import { StickerAttachFlowerImg } from '../components/common';
import CurrentVoteInfoLayout from '../components/CurrentVote/Layout/CurrentVoteInfoLayout';
import { HeaderLayout } from '../components/Layout';
import { patchCurrentVoteData } from '../lib/api/voting';
import useGetFlowerVoteDetail from '../lib/hooks/useGetFlowerVoteDetail';
import { flowerResultState, pictureResultState, stickerResultState } from '../recoil/maker/atom';
import { jsonGetStickerList } from '../utils/jsonGetStickerList';

const CurrentFlowerDetail = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const { flowerResult, isLoading, isError } = useGetFlowerVoteDetail(voteId);

  const setFlowerResult = useSetRecoilState(flowerResultState);
  const setFlowerPictureResult = useSetRecoilState(pictureResultState);
  const setFlowerStickerResult = useSetRecoilState(stickerResultState);
  const flowerResultData = useRecoilValue(flowerResultState);
  const flowerPictureData = useRecoilValue(pictureResultState);
  const resetFlowerResultData = useResetRecoilState(flowerResultState);
  const resetFlowerPictureData = useResetRecoilState(pictureResultState);
  const resetFlowerStickerData = useResetRecoilState(stickerResultState);
  const voteInfoWrapperRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (flowerPictureData[0].count === 10) {
      patchCurrentVoteData(voteId);
    }
  }, [flowerPictureData, voteId]);

  useEffect(() => {
    if (flowerResult) {
      resetFlowerResultData();
      resetFlowerPictureData();
      resetFlowerStickerData();

      setFlowerResult(flowerResult);
      setFlowerPictureResult(flowerResult.Picture);
      setFlowerStickerResult(jsonGetStickerList(flowerResult.Picture[0].Sticker));
    }
  }, [flowerResult]);

  const strCreatedDate = flowerResultData.createdDate.toString();

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/home')} />
      <StCurrentVoteInfoWrapper ref={voteInfoWrapperRef}>
        <CurrentVoteInfoLayout
          voteTitle="나를 닮은 꽃은?"
          createdDate={strCreatedDate}
          totalVoteCount="총 10명 중"
          currentVoteCount={`${flowerPictureData[0].count}명 참가`}
        />
        <StickerAttachFlowerImg
          stickerAttachImgSrc={flowerPictureData[0].url}
          imgWrapperWidthPercent={100}
          imgHight={45.3}
          imgViewInfo={{
            width: voteInfoWrapperRef.current?.clientWidth ? voteInfoWrapperRef.current?.clientWidth : 0,
            height: 453,
          }}
        />
        <StFlowerTestStatus>
          <span>현재 진행 중 ( {flowerPictureData[0].count} / 10 )</span>
          <div onClick={() => navigate('/share', { state: { voteId, isFlowerVote: true } })}>
            <IcVoteShareBtn />
          </div>
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
`;

const StFlowerTestStatus = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  margin-top: 1.1rem;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 0.9rem;

    width: 5.6rem;
    min-width: 5.6rem;
    height: 5.2rem;

    border-radius: 0.75389rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    cursor: pointer;
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 5.2rem;

    text-align: center;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    border-radius: 0.75389rem;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}
  }
`;
