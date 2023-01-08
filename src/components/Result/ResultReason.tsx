import React from 'react';
import styled from 'styled-components';

import { IcAngle, IcFace, IcJust, IcMood } from '../../asset/icon';

const ResultReason = () => {
  const reasons = [<IcAngle key="angle" />, <IcFace key="face" />, <IcJust key="just" />, <IcMood key="mood" />];

  return (
    <>
      <StBackground>
        <StTotalVote>
          <p> 전체 20표 중</p>
          <StFirstReason>12표</StFirstReason>
        </StTotalVote>
        <StTitle>
          이 사진이 Pic된 가장 큰 이유는
          <br /> “얼굴이 좋아요” 입니다!
        </StTitle>

        {reasons.map((reason, idx) => (
          <>
            <StReasonWrapper>
              {reason}
              <StPercentBarWrppaer key={idx}>
                <p>70%</p>
                <StPercentBar>
                  <StDealtPercentBar percent={70}></StDealtPercentBar>
                </StPercentBar>
              </StPercentBarWrppaer>
            </StReasonWrapper>
          </>
        ))}
      </StBackground>
    </>
  );
};
export default ResultReason;

const StBackground = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 83.5rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};

  border-radius: 3.4rem 3.4rem 0rem 0rem;

  position: absolute;
  bottom: 0;
`;

const StTotalVote = styled.div`
  width: 14.6rem;
  height: 2.7rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  border-radius: 3.2644rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
    margin-left: 1.8rem;
    width: 6.3rem;
    height: 1.4rem;
  }
`;
const StFirstReason = styled.div`
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  width: 5.6rem;
  height: 100%;
  border-radius: 3.2644rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StTitle = styled.h1`
  font-size: 1.8rem;
  font-family: 'PretendardSemiBold';
  font-weight: 600;
  font-style: normal;
  line-height: 2.148rem;

  margin-top: 2.9rem;
  margin-bottom: 5rem;
  text-align: center;
`;

const StReasonWrapper = styled.article`
  margin-bottom: 2.4rem;
`;

const StPercentBarWrppaer = styled.section`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  p {
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16};
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    margin-right: 1.7rem;
    margin-left: 0.7rem;
  }
`;

const StPercentBar = styled.div`
  width: 27.3rem;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
  border-radius: 3.2rem;
`;
const StDealtPercentBar = styled.div<{ percent: number }>`
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  width: ${(props) => props.percent + `%`};
  height: 100%;
  border-radius: 3.2rem;
`;
