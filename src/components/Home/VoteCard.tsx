import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import TimeAgo from 'timeago-react';

import { IcLibraryFlower } from '../../asset/icon';
import { VoteCardInfo } from '../../types/vote';

interface VoteCardProps {
  voteData: VoteCardInfo;
}

const TITLE_LETTER_LIMIT = 10;

const VoteCard = (props: VoteCardProps) => {
  const { voteData } = props;
  const isFlower = voteData.type === 2 ? true : false;
  const navigate = useNavigate();

  const time1 = voteData.createdAt.toString().slice(0, 10);
  const time2 = voteData.createdAt.toString().slice(11, 19);
  const formatedTime = time1 + ' ' + time2;

  timeago.register('ko', ko);

  const truncate = (str: string) =>
    str?.length > TITLE_LETTER_LIMIT ? str.substring(0, TITLE_LETTER_LIMIT - 1) + ' ...' : str;

  const handleClick = (e: React.MouseEvent, isFlower: boolean) => {
    isFlower ? navigate(`/current/flower/${voteData.voteId}`) : navigate(`/current/vote/${voteData.voteId}`);
  };

  return (
    <StVoteItem onClick={(e) => handleClick(e, isFlower)} isFlower={isFlower}>
      <StVoteData isFlower={isFlower}>
        <StTitleWrapper>
          <h1>{truncate(voteData.title)}</h1>
          <h2>{voteData.totalVoteCount}명 투표 중</h2>
        </StTitleWrapper>
        <h3>
          <TimeAgo datetime={formatedTime} locale="ko" />
        </h3>
      </StVoteData>
      <StPreviewImg src={voteData.voteThumbnail} alt="투표 썸네일" />
      {isFlower ? <IcLibraryFlower /> : null}
    </StVoteItem>
  );
};

export default VoteCard;

const StVoteItem = styled.section<{ isFlower: boolean }>`
  display: flex;
  position: relative;

  width: 22.413rem;
  height: 14.43rem;
  margin-right: 1.6rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  ${({ isFlower }) =>
    isFlower
      ? css`
          background-color: #ff5e67;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
        `};

  & > svg {
    position: absolute;
    top: 0.806rem;
    right: 0.844rem;
  }

  :first-child {
    margin-left: 2rem;
  }
  :last-child {
    margin-right: 2rem;
  }
`;

const StVoteData = styled.article<{ isFlower: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 8.983rem;
  padding: 1.134rem 1.262rem 0.706rem 1.221rem;

  border-radius: 1.047rem 0rem 0rem 1.047rem;

  & > h3 {
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};
    ${({ isFlower }) =>
      isFlower
        ? css`
            color: ${({ theme }) => theme.colors.Pic_Color_White};
          `
        : css`
            color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
          `};
  }
`;

const StTitleWrapper = styled.div`
  & > h1 {
    padding-bottom: 0.7rem;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_6};
  }
  & > h2 {
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_1};
    opacity: 0.5;
  }
`;

const StPreviewImg = styled.img`
  width: 13.43rem;

  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
`;
