import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IcVoteShareBtn } from '../../../asset/icon';
import { patchCurrentVoteData } from '../../../lib/api/voting';
import { Modal } from '../../common';

const OriginVoteBtn = () => {
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
        <StCompleteVoteBtn onClick={() => setIsModalShowing(true)}>투표 마감</StCompleteVoteBtn>
        <div>
          <IcVoteShareBtn onClick={() => navigate('/share', { state: { voteId, isFlowerVote: false } })} />
        </div>
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

export default OriginVoteBtn;

const CurrentVoteBtnWrapper = styled.section`
  position: relative;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;

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
`;

const StCompleteVoteBtn = styled.button`
  width: 100%;
  height: 5.2rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
  border-radius: 0.9rem;
`;
