import { relative } from 'node:path/win32';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcDelete } from '../../asset/icon';
import { deleteVote } from '../../lib/api/library';
import { VoteInfo } from '../../types/library';
import Modal from '../common/Modal';

interface votingProps {
  voteData: VoteInfo;
  id: number;
  isStart?: boolean;
  isEnd?: boolean;
}

const EndedVoting = (props: votingProps) => {
  const { voteData, id } = props;
  const navigate = useNavigate();

  const [isShowing, setIsShowing] = useState<boolean>(false);

  const time1 = voteData.createdAt.toString().slice(6, 7);
  let time2 = voteData.createdAt.toString().slice(8, 10);

  if (time2[0] === '0') {
    time2 = time2.slice(1, 2);
  }

  const handleModal = (prev: boolean) => {
    setIsShowing((prev) => !prev);
  };

  const handleMoveResult = () => {
    navigate(`/result/${id}`);
  };

  const handleDelete = async () => {
    const res = await deleteVote(id);
    window.location.reload();
    return res;
  };

  return (
    <>
      <StVotingWrapper onClick={handleMoveResult}>
        <StImageWrapper>
          <StVotingPic src={voteData.url} />
          <StDeleteBtnWrapper type="button" onClick={() => handleModal(isShowing)}>
            <IcDelete />
          </StDeleteBtnWrapper>
        </StImageWrapper>
        <StVotingDesc>
          <StVotingTitle>{voteData.title}</StVotingTitle>
          <StVotingDate>
            {time1}월 {time2}일
          </StVotingDate>
          <StVotingPeopleNum>{voteData.count}명 투표 완</StVotingPeopleNum>
        </StVotingDesc>
      </StVotingWrapper>
      <Modal
        isShowing={isShowing}
        message={'해당 투표를 삭제하시겠습니까?'}
        handleConfirm={() => handleDelete()}
        handleHide={() => handleModal(isShowing)}></Modal>
    </>
  );
};

const StVotingWrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
const StImageWrapper = styled.div`
  /* width: 100%; */
  height: 12.8rem;
`;
const StVotingPic = styled.img`
  display: float;

  width: 30.52%;
  height: 17.638rem;

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

  & > svg {
    z-index: 5;
  }
`;

const StVotingDesc = styled.div`
  width: 17.6rem;
  height: 8.6rem;

  position: relative;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  border-radius: 0rem 0rem 1.141rem 1.141rem;
`;

const StVotingTitle = styled.h2`
  margin-top: 1.3rem;
  margin-left: 1.4rem;

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
