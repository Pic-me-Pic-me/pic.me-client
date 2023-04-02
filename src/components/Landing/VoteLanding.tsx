import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcFlower, IcModalBG } from '../../asset/icon';
import { PlayerTitle } from '../../asset/image';
import Onboarding from '../../pages/Onboarding';
import { playerStickerInfoState, votingInfoState } from '../../recoil/player/atom';

const VoteLanding = () => {
  const votingInfoAtom = useRecoilValue(votingInfoState);
  const { voteTitle, userName, voteId, isFlowerVoting, Picture } = votingInfoAtom;
  const setStickerInfo = useSetRecoilState(playerStickerInfoState);
  const navigate = useNavigate();

  const handleStartVoting = () => {
    if (isFlowerVoting) {
      setStickerInfo((prev) => ({ ...prev, pictureId: Picture[0].id, location: [], emoji: 0 }));
      navigate(`/player/reason_voting`);
    } else navigate(`/player/picture_voting/${voteId}`);
  };

  return (
    <>
      <StModalWrapper>
        <StModal>
          {isFlowerVoting ? (
            <StContent>
              <IcFlower />
              <StDescription>
                <p>{userName}님의 꽃인상을</p>
                <p>선택해주세요!</p>
              </StDescription>
            </StContent>
          ) : (
            <>
              <StTitle>
                <div>
                  <h1>{voteTitle}</h1>
                </div>
              </StTitle>
              <StContent>
                <IcModalBG fill="#FF5E67" />
                <StDescription>
                  <p>{userName}님의 사진</p>
                  <p>2개 중 1개를 골라주세요!</p>
                </StDescription>
              </StContent>
            </>
          )}
          <StButtonWrapper>
            <button type="button" onClick={handleStartVoting}>
              익명 투표 시작하기
            </button>
            <button type="button" onClick={() => navigate('/')}>
              홈으로 가기
            </button>
          </StButtonWrapper>
        </StModal>
      </StModalWrapper>
    </>
  );
};
export default VoteLanding;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;
  padding: 0rem 4.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2rem);
`;

const StModal = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: fit-content;
  padding: 4.9rem 1.8rem 2.3rem 1.8rem;
  margin: auto;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

  & > svg {
    width: 20rem;
    height: 6.6rem;
  }
`;

const StTitle = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 7.651rem;
  z-index: 1;

  color: ${({ theme }) => theme.colors.Pic_Color_White};

  background-image: url(${PlayerTitle});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    position: relative;
    width: 21.2rem;
    height: 5.836rem;

    & > h1 {
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;
      width: 100%;

      padding: 0rem 2rem;

      ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
    }
  }
  & > svg {
    position: absolute;
    width: 21.2rem;
    height: 7.651rem;
    object-fit: fill;
  }
`;

const StDescription = styled.article`
  margin-top: 2.5rem;
  margin-bottom: 3.4rem;
  & > p {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20}
  }
`;

const StContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 1.95rem;

  & > svg {
    margin: 0 auto;
    width: 14.9rem;
    height: 15.8rem;

    object-fit: fill;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  width: 100%;

  & > button {
    width: 100%;
    height: 5.4rem;

    border: none;
    border-radius: 0.9rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

    cursor: pointer;

    :last-child {
      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    }
  }
`;
