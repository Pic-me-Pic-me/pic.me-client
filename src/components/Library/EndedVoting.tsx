import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcDelete } from '../../asset/icon';
import { VoteInfo } from '../../types/library';
import Modal from '../common/Modal';

interface votingProps {
  voteData: VoteInfo;
  id: string;
  handleDeleteVote: (id: string) => void;
}

const EndedVoting = (props: votingProps) => {
  const { voteData, id, handleDeleteVote } = props;
  const navigate = useNavigate();

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
    navigate(`/result/${id}`);
  };

  return (
    <>
      <StVotingWrapper>
        <StImgWrapper>
          <StVotingPic src={voteData.url} onClick={handleGoToResult} />
          <StDeleteBtnWrapper type="button" onClick={() => handleModal(isShowing)}>
            <IcDelete />
          </StDeleteBtnWrapper>
        </StImgWrapper>
        <StVotingDesc onClick={handleGoToResult}>
          <StVotingTitle>{voteData.title}</StVotingTitle>
          <StVotingDate>
            {createdMonth}월 {createdDate}일
          </StVotingDate>
          <StVotingPeopleNum>{voteData.count}명 투표 완</StVotingPeopleNum>
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

  :last-child {
    margin-right: 2rem;
  }
`;

const StImgWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;
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

const StVotingDesc = styled.div`
  width: 17.8rem;
  height: 8.6rem;

  position: relative;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  border-radius: 0rem 0rem 1.141rem 1.141rem;
`;

const StVotingTitle = styled.h2`
  margin-top: 1.3rem;
  margin-left: 1.4rem;

  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16}
`;

const StVotingDate = styled.p`
  margin-top: 0.6rem;
  margin-left: 1.426rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
`;

const StVotingPeopleNum = styled.p`
  position: absolute;
  right: 1.136rem;
  bottom: 1.083rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}

  opacity: 0.5;
`;

export default EndedVoting;
