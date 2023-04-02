import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { IcStickerOff, IcStickerOn } from '../asset/icon';
import { StickerAttachImg } from '../components/common';
import { HeaderLayout } from '../components/Layout';
import { FLOWER_ICON_LIST } from '../constant/FlowerIconList';
import useGetFlowerVoteResult from '../lib/hooks/useGetFlowerVoteResult';
import useGetUserData from '../lib/hooks/useGetUserData';
import { stickerResultState } from '../recoil/maker/atom';
import { MakerPictureData } from '../types/vote';
import { jsonGetStickerList } from '../utils/jsonGetStickerList';
import Error404 from './Error404';

export default function FlowerResult() {
  const navigate = useNavigate();
  const { voteId } = useParams() as { voteId: string };

  const { voteResult, isLoading, isError } = useGetFlowerVoteResult(voteId);
  const setStickerResultState = useSetRecoilState(stickerResultState);

  const { userInfo } = useGetUserData();
  const userHeaderTitle = userInfo?.userName + '님의 꽃인상 카드';
  const [isStickerOn, setIsStickerOn] = useState(true);
  const flowerInfo = voteResult?.Picture[0] as MakerPictureData;
  const flowerIndex = flowerInfo?.flower as number;
  if (isError) <Error404 />;

  const handleStickerOnOff = () => {
    setIsStickerOn((prev) => !prev);
  };

  useEffect(() => {
    if (voteResult) {
      const { Sticker: stickerList } = voteResult.Picture[0];
      setStickerResultState([...jsonGetStickerList(stickerList)]);
    }
  }, [voteResult]);

  return (
    <>
      <StResultWrapper flowerColor={FLOWER_ICON_LIST[flowerIndex - 1]?.color}>
        <HeaderLayout HeaderTitle={userHeaderTitle} handleGoback={() => navigate(-1)} isBanner></HeaderLayout>
        {isStickerOn ? <IcStickerOn onClick={handleStickerOnOff} /> : <IcStickerOff onClick={handleStickerOnOff} />}
        <StMainContentWrapper>
          <p>
            {userInfo?.userName} 님은 {FLOWER_ICON_LIST[flowerIndex - 1]?.flowerKorName}을 가장 많이 받았어요!
          </p>
          {isStickerOn ? (
            <StickerAttachImg
              stickerAttachImgSrc={flowerInfo?.url as string}
              imgWrapperWidthPercent={76.8}
              imgHight={38.372}
            />
          ) : (
            <img src={flowerInfo?.url} alt="스티커없는사진" />
          )}

          <h1>{FLOWER_ICON_LIST[flowerIndex - 1]?.flowerEngName}</h1>

          <StKeywordSectionWrapper>
            <h2>BEST KEYWORD!</h2>
            <StKeywordsWrapper keywordCnt={FLOWER_ICON_LIST[flowerIndex - 1]?.keywordList.length}>
              {FLOWER_ICON_LIST[flowerIndex - 1]?.keywordList.map((content, idx) => (
                <StKeyWord key={idx}>{content}</StKeyWord>
              ))}
            </StKeywordsWrapper>
          </StKeywordSectionWrapper>
        </StMainContentWrapper>
      </StResultWrapper>
    </>
  );
}

const StResultWrapper = styled.main<{ flowerColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) => props.flowerColor};

  > svg {
    position: absolute;
    top: 7rem;
    right: 2.6rem;
  }
`;

const StMainContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    margin-top: 4.6rem;
    margin-bottom: 1.4rem;
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_4};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
  }

  > h1 {
    width: min-content;

    margin-top: 1.928rem;
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_3};
    color: #fffdc2;
    text-align: center;
  }

  > img {
    border-radius: 1rem;
    width: 76.8%;
    height: 38.372rem;
    object-fit: cover;
  }
`;

const StKeywordSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  > h2 {
    margin-top: 1.1rem;
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_3};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
  }
`;

const StKeywordsWrapper = styled.div<{ keywordCnt: number }>`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;

  width: 65%;

  ${({ keywordCnt }) =>
    keywordCnt === 5
      ? css`
          width: 55%;
          gap: 1rem 3%;
        `
      : css`
          width: 73.68%;
          gap: 1rem 2%;
        `}

  > div {
    ${({ keywordCnt }) =>
      keywordCnt === 5
        ? css`
            width: 31.22%;
          `
        : css`
            width: 23%;
          `}
  }
`;

const StKeyWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 2.4rem;

  background-color: #fffdc2;
  border-radius: 2.2707rem;

  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};
  color: #ee5761;
`;
