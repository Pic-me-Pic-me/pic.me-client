import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { IcAngle, IcFace, IcJust, IcMood, IcReasonBtnAfter, IcReasonBtnBefore } from '../../asset/icon';
import { stickerResultState } from '../../recoil/maker/atom';
import { stickerCountSelector, stickerMaxCountSelctor } from '../../recoil/maker/selector';

interface ResultReasonProps {
  isOpenResultReason: boolean;
  handleIsOpenResultReason: () => void;
}

const ResultReason = (props: ResultReasonProps) => {
  const { isOpenResultReason, handleIsOpenResultReason } = props;
  const stickerCount = useRecoilValue(stickerCountSelector);
  const stickerResult = useRecoilValue(stickerResultState);
  const stickerMaxIdx = useRecoilValue(stickerMaxCountSelctor);

  const REASON_TITLE = ['얼굴이 좋아요', '구도가 좋아요', '분위기가 좋아요', '그냥 끌려요!'];
  const reasons = [<IcAngle key="angle" />, <IcFace key="face" />, <IcJust key="just" />, <IcMood key="mood" />];

  return (
    <>
      <StBackgroundWrapper isOpenResultReason={isOpenResultReason} onClick={handleIsOpenResultReason}>
        {isOpenResultReason ? (
          <>
            <IcReasonBtnAfter />
            <StBackground>
              <StTotalVote>
                <p> 전체 {stickerCount}표 중</p>
                <StFirstReason>{stickerResult.length ? stickerResult[stickerMaxIdx].count : 0}표</StFirstReason>
              </StTotalVote>
              <StTitle>
                이 사진이 Pic된 가장 큰 이유는
                <br /> “{REASON_TITLE[stickerMaxIdx]}” 입니다!
              </StTitle>

              {reasons.map((reason, idx) => (
                <>
                  <StReasonWrapper key={REASON_TITLE[idx]}>
                    {reason}
                    <StPercentBarWrppaer>
                      {stickerResult[idx] ? <p>{(stickerResult[idx].count / stickerCount) * 100}%</p> : <p>0%</p>}
                      <StPercentBar>
                        {stickerResult[idx] ? (
                          <StDealtPercentBar
                            percent={(stickerResult[idx].count / stickerCount) * 100}></StDealtPercentBar>
                        ) : (
                          <StDealtPercentBar percent={0}></StDealtPercentBar>
                        )}
                      </StPercentBar>
                    </StPercentBarWrppaer>
                  </StReasonWrapper>
                </>
              ))}
            </StBackground>
          </>
        ) : (
          <IcReasonBtnBefore />
        )}
      </StBackgroundWrapper>
    </>
  );
};
export default ResultReason;

const StBackgroundWrapper = styled.main<{ isOpenResultReason: boolean }>`
  display: flex;
  justify-content: center;

  width: 100%;

  ${({ isOpenResultReason }) =>
    isOpenResultReason
      ? css`
          position: absolute;
          top: 12rem;
        `
      : css`
          position: relative;
        `};

  > svg {
    position: absolute;
    top: -3rem;
    z-index: 5;
  }
  z-index: 4;
`;

const StBackground = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;

  width: 100%;
  height: 83.5rem;

  border: 0.1rem solid red;
  border-radius: 3.4rem 3.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StTotalVote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 14.6rem;
  height: 2.7rem;
  margin-top: 6rem;

  border-radius: 3.2644rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  > p {
    width: 6.3rem;
    height: 1.4rem;
    margin-left: 1.8rem;

    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
  }
`;

const StFirstReason = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 5.6rem;
  height: 100%;

  border-radius: 3.2644rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
`;

const StTitle = styled.h1`
  margin-top: 2.9rem;
  margin-bottom: 5rem;
  text-align: center;

  font-size: 1.8rem;
  font-family: 'PretendardSemiBold';
  font-weight: 600;
  font-style: normal;
  line-height: 2.148rem;
`;

const StReasonWrapper = styled.article`
  margin-bottom: 2.4rem;
`;

const StPercentBarWrppaer = styled.section`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  > p {
    margin-right: 1.7rem;
    margin-left: 0.7rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16};
  }
`;

const StPercentBar = styled.div`
  width: 27.3rem;
  height: 0.4rem;

  border-radius: 3.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;

const StDealtPercentBar = styled.div<{ percent: number }>`
  width: ${(props) => props.percent + `%`};
  height: 100%;

  border-radius: 3.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
`;
