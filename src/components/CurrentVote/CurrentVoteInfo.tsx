import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import TimeAgo from 'timeago-react';

import { pictureCurrentIdx, pictureResultState, voteResultState } from '../../recoil/maker/atom';

const CurrentVoteInfo = () => {
  const voteInfoData = useRecoilValue(voteResultState);
  const pictureResult = useRecoilValue(pictureResultState);
  const currentIdx = useRecoilValue(pictureCurrentIdx);

  timeago.register('ko', ko);
  const strCreateDate = voteInfoData.createdDate.toString();
  const createdAt = strCreateDate.slice(0, 10) + ' ' + strCreateDate.slice(11, 19);

  return (
    <StCurrentVoteInfoWrapper>
      <StVoteTitle>
        <span>
          <TimeAgo datetime={createdAt} locale="ko" />
        </span>
        <h1>{voteInfoData.voteTitle}</h1>
      </StVoteTitle>
      <StVoteStatus>
        <span>{voteInfoData.currentVote}명 투표 중</span>
        <span>{pictureResult[currentIdx].count}표</span>
      </StVoteStatus>
    </StCurrentVoteInfoWrapper>
  );
};
export default CurrentVoteInfo;

const StCurrentVoteInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 1.9rem;
`;

const StVoteTitle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }

  & > h1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    margin-top: 0.8rem;

    width: 34.6rem;
    height: 5.6rem;

    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20}
  }
`;

const StVoteStatus = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 15.1rem;
  height: 2.7rem;

  margin-top: 0.8rem;
  padding-left: 2.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_6};
  border-radius: 3.3rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}

  & > span:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 5.6rem;
    height: 2.7rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    border-radius: 3.3rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;
