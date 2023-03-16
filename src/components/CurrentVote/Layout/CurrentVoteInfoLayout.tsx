import styled from 'styled-components';

interface CurrentVoteInfoLayoutProps {
  voteTitle: string;
  createdAt: string;
  totalVoteCount: number;
  currentVoteCount: number;
}

const CurrentVoteInfoLayout = (props: CurrentVoteInfoLayoutProps) => {
  const { voteTitle, createdAt, totalVoteCount, currentVoteCount } = props;

  return (
    <>
      <StVoteTitle>
        <h1>{voteTitle}</h1>
        <span>{createdAt}분 전</span>
      </StVoteTitle>
      <StVoteStatus>
        <span>총 {totalVoteCount}명 중</span>
        <span>{currentVoteCount}명 참가</span>
      </StVoteStatus>
    </>
  );
};

export default CurrentVoteInfoLayout;

const StVoteTitle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }

  & > h1 {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0.6rem 0 0.285rem 0;

    width: 34.6rem;
    // height: 5.6rem;

    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
  }
`;

const StVoteStatus = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 15.1rem;
  height: 2.7rem;

  margin: 0.8rem 0 1.677rem 0;
  padding-left: 2.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_6};
  border-radius: 3.3rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};

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
