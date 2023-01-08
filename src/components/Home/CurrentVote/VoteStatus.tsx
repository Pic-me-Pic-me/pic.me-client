import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { PictureProps, StickerProps, VoteInfoProps } from '../../../types/voting';

const VoteInfo = (voteInfo: VoteInfoProps) => {
  const { voteId, voteStatus, voteTitle, currentVote, createDate, Picture } = voteInfo;
  const [pictureInfo, setPictureInfo] = useState<PictureProps[]>();

  useEffect(() => {
    setPictureInfo(Picture);
    console.log(Picture);
  }, []);

  // function timeForToday() {
  //   const today = new Date();
  //   const timeValue = createDate;

  //   const betweenTime = Math.floor((today.getTime() - createDate) / 1000 / 60);
  //   if (betweenTime < 1) {
  //     const uploadTime = '방금 전';
  //   } else if (betweenTime < 60) {
  //     const uploadTime = `${betweenTime}분전`;
  //   }

  //   const betweenTimeHour = Math.floor(betweenTime / 60);
  //   if (betweenTimeHour < 24) {
  //     const uploadTime = `${betweenTimeHour}시간전`;
  //   }

  //   const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  //   if (betweenTimeDay < 365) {
  //     const uploadTime = `${betweenTimeDay}일전`;
  //   }

  // }

  return (
    <StVoteInfo>
      <span>42분 전</span>
      {/* <h1>{voteTitle}</h1> */}
      <h1>사진 골라주라주라주라주라주라주라주라주라주라주라주라주라주</h1>
      <StVoteStatus>
        {/* <span>{currentVote}명 투표 중</span>
        {currentIdx === 0 ? <span>{pictureInfo[0].count}표</span> : <span>{pictureInfo[0].count}표</span>} */}
        <span>18명 투표 중</span>
        <span>12표</span>
      </StVoteStatus>
    </StVoteInfo>
  );
};

export default VoteInfo;

const StVoteInfo = styled.article`
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

    ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22}
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
