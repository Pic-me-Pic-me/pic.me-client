import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  isChosenPic: boolean;
  voteTitle: string;
  voteTotalNumber: number;
}

const SliderTitle = (props: TitleProps) => {
  const { isChosenPic, voteTitle, voteTotalNumber } = props;

  return (
    <>
      <StTitleWrapper>
        <StTitle isChosenPic={isChosenPic}>
          {isChosenPic ? (
            <>
              <h1>친구들이 골라준 </h1>
              <h1>One Pic!</h1>
            </>
          ) : (
            <>
              <h1>아쉽게 떨어진 </h1>
              <h1>Second Pic!</h1>
            </>
          )}
          <p>{voteTitle}</p>
        </StTitle>

        <StVotedNumber>+{voteTotalNumber}</StVotedNumber>
      </StTitleWrapper>
    </>
  );
};

const StTitleWrapper = styled.div`
  width: 35.1rem;
  height: 11.4rem;

  display: flex;
`;

const StTitle = styled.div<{ isChosenPic: boolean }>`
  width: 22rem;
  height: 4.2rem;

  margin-top: 2.6rem;
  margin-left: 4.658rem;
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Title4_Pretendard_Bold_35};

  h1 {
    margin: 0;
    padding: 0;
    line-height: 120%;
  }

  p {
    margin-top: 1.3rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
  }
`;

const StVotedNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 6.6rem;
  height: 6.6rem;

  margin-top: 4rem;
  margin-left: 3.3rem;

  border-radius: 50%;
  /* background-color: rgba(244, 245, 247, 0.2); */
  background-color: red;
  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
`;
export default SliderTitle;
