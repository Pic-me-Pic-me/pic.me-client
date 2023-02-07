import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IcVoteShareBtn } from '../../asset/icon';
import { patchCurrentVoteData } from '../../lib/api/voting';
import Modal from '../common/Modal';

const CurrentVoteBtn = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const handleGoResultPage = () => {
    patchCurrentVoteData(voteId);
    navigate(`/result/${voteId}`);
  };

  return (
    <>
      <CurrentVoteBtnWrapper>
        <IcVoteShareBtn onClick={() => navigate('/share', { state: voteId })} />
        <StCompleteVoteBtn onClick={() => setIsModalShowing(true)}>투표 마감</StCompleteVoteBtn>
      </CurrentVoteBtnWrapper>
      <Modal
        isShowing={isModalShowing}
        message="투표를 마감하시겠습니까?"
        handleHide={() => setIsModalShowing(false)}
        handleConfirm={handleGoResultPage}
        isFinishing={true}
      />
    </>
  );
};

export default CurrentVoteBtn;

const CurrentVoteBtnWrapper = styled.section`
  position: relative;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  & > svg {
    position: absolute;

    bottom: 13rem;
    right: 3em;

    cursor: pointer;
  }
`;

const StCompleteVoteBtn = styled.button`
  width: 100%;
  height: 6rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
  border-radius: 0.9rem;
`;
