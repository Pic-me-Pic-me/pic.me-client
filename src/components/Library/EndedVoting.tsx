import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcDelete, IcLibraryFlower } from '../../asset/icon';
import { VoteInfo } from '../../types/library';
import Modal from '../common/Modal';

interface endedVotingProps {
  voteType: number;
  voteData: VoteInfo;
  id: string;
  handleDeleteVote: (id: string) => void;
}

const EndedVoting = (props: endedVotingProps) => {
  const { voteType, voteData, id, handleDeleteVote } = props;
  const navigate = useNavigate();

  const isFlower = voteType === 2 ? true : false;
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const createdAtStr = voteData.createdAt.toString();
  const createdMonth = createdAtStr.slice(5, 6) === '0' ? createdAtStr.slice(6, 7) : createdAtStr.slice(5, 7);
  const createdDate = createdAtStr.slice(8, 9) === '0' ? createdAtStr.slice(9, 10) : createdAtStr.slice(8, 10);

  const handleConfirmModal = (id: string) => {
    handleDeleteVote(id);
    setIsShowing((prev) => !prev);
  };

  const handleModal = (prev: boolean) => {
    setIsShowing((prev) => !prev);
  };

  const handleGoToResult = () => {
    isFlower ? navigate(`/result/flower/${id}`) : navigate(`/result/${id}`);
  };

  return (
    <>
      <StVotingWrapper>
        <StImgWrapper>
          <StVotingPic src={voteData.url} onClick={handleGoToResult} alt="종료된 투표의 선택된 사진" />
          {isFlower ? <IcLibraryFlower /> : null}
          <StDeleteBtnWrapper type="button" onClick={() => handleModal(isShowing)}>
            <IcDelete />
          </StDeleteBtnWrapper>
        </StImgWrapper>
        <StVotingDesc onClick={handleGoToResult} isFlower={isFlower}>
          <StVotingTitle>{isFlower ? '나를 닮은 꽃은?' : voteData.title}</StVotingTitle>
          <StVotingDate isFlower={isFlower}>
            {createdMonth}월 {createdDate}일
          </StVotingDate>
          {isFlower ? null : <StVotingPeopleNum>{voteData.count}명 투표 완</StVotingPeopleNum>}
        </StVotingDesc>
      </StVotingWrapper>
      <Modal
        isShowing={isShowing}
        message={'해당 투표를 삭제하시겠습니까?'}
        handleConfirm={() => handleConfirmModal(id)}
        handleHide={() => handleModal(isShowing)}
      />
    </>
  );
};

const StVotingWrapper = styled.section`
  display: flex;
  flex-direction: column;

  position: relative;

  margin-bottom: 4.906rem;

  :last-child {
    margin-right: 2rem;
  }
  cursor: pointer;
`;

const StImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 0;
  padding: 0;

  > svg {
    position: absolute;
    z-index: 4;

    margin-top: 1.045rem;
    margin-left: 1.097rem;
  }
`;

const StVotingPic = styled.img`
  display: float;

  width: 17.8rem;
  height: 12.8rem;

  object-fit: cover;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  border-radius: 1.141rem 1.141rem 0rem 0rem;
`;

const StDeleteBtnWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: absolute;
  top: 0.285rem;
  right: -0.7rem;

  border: none;
  background-color: transparent;
`;

const StVotingDesc = styled.div<{ isFlower: boolean }>`
  width: 17.8rem;
  height: 8.6rem;
  position: relative;

  ${({ isFlower }) =>
    isFlower
      ? css`
          background-color: #ff5e67;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
        `};

  border-radius: 0rem 0rem 1.141rem 1.141rem;
`;

const StVotingTitle = styled.h2`
  width: 12.687rem;
  height: 3.814rem;

  margin-top: 1.1rem;
  margin-left: 1.4rem;

  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_6}
`;

const StVotingDate = styled.p<{ isFlower: boolean }>`
  margin-left: 1.4rem;
  position: absolute;
  bottom: 0.9rem;

  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_4}
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;

const StVotingPeopleNum = styled.p`
  position: absolute;
  right: 1.136rem;
  bottom: 0.9rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}

  opacity: 0.5;
`;

export default EndedVoting;
