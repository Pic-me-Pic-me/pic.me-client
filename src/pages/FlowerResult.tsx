import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IcStickerOff, IcStickerOn } from '../asset/icon';
import { StickerAttachImg } from '../components/common';
import { HeaderLayout } from '../components/Layout';
import useGetFlowerVoteResult from '../lib/hooks/useGetFlowerVoteResult';
import Error404 from './Error404';

export default function FlowerResult() {
  const navigate = useNavigate();
  const { voteId } = useParams() as { voteId: string };
  const { voteResult, isLoading, isError } = useGetFlowerVoteResult(voteId);
  console.log(voteResult);
  const [isStickerOn, setIsStickerOn] = useState(true);

  if (isError) <Error404 />;

  const keywords = ['열정적', '우아함', '활기참'];

  function handleStickerOnOff() {
    setIsStickerOn((prev) => !prev);
  }
  return (
    <>
      <StResultWrapper>
        <HeaderLayout HeaderTitle="이지윤님의 꽃인상 카드" handleGoback={() => navigate(-1)} isBanner></HeaderLayout>
        {isStickerOn ? <IcStickerOn onClick={handleStickerOnOff} /> : <IcStickerOff onClick={handleStickerOnOff} />}
        <StMainContentWrapper>
          <p>“이지윤 님은 ‘벚꽃’을 가장 많이 받았어요!”</p>
          {isStickerOn ? (
            <StickerAttachImg
              stickerAttachImgSrc={voteResult?.Picture[0]?.url}
              imgWrapperWidthPercent={76.8}
              imgHight={38.372}></StickerAttachImg>
          ) : (
            <img src={voteResult?.Picture[0]?.url} alt="스티커없는사진" />
          )}

          <h1>
            CHERRY <br /> BLOSSOM
          </h1>

          <StKeywordSectionWrapper>
            <h2>BEST KEYWORD!</h2>
            <StKeywordsWrapper>
              {keywords.map((content, idx) => (
                <StKeyWord key={idx}>{content}</StKeyWord>
              ))}
            </StKeywordsWrapper>
          </StKeywordSectionWrapper>
        </StMainContentWrapper>
      </StResultWrapper>
    </>
  );
}

const StResultWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ee5761;

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
    margin-top: 1.928rem;
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_3};
    color: #fffdc2;
    text-align: center;
  }

  > img {
    border-radius: 1rem;
    width: 28.8rem;
    height: 38.372rem;
  }
`;

const StKeywordSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    margin-top: 1.1rem;
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_3};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
  }
`;

const StKeywordsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  gap: 0.7rem;
`;

const StKeyWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.398rem;
  height: 2.4rem;

  background-color: #fffdc2;
  border-radius: 2.2707rem;

  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};
  color: #ee5761;
`;
