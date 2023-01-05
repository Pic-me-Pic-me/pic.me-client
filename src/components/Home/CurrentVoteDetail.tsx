import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ImgSiru } from '../../asset/image';
import { HeaderLayout } from '../Layout';

const CurrentVoteDetail = () => {
  const navigate = useNavigate();
  const handlePrevpage = () => {
    navigate('/');
  };
  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={handlePrevpage} />
      <CurrentVoteDetailWrapper>
        <span>42분 전</span>
        <h1>어제 연남동 가서 찍은 사진 골라주ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</h1>
        <StVoteStatus>
          <span>15명 투표 중</span>
          <span>12표</span>
        </StVoteStatus>
        <img src={ImgSiru} alt="투표현황 사진" />
        <StCompleteVoteBtn>투표 마감</StCompleteVoteBtn>
      </CurrentVoteDetailWrapper>
    </>
  );
};

export default CurrentVoteDetail;

const CurrentVoteDetailWrapper = styled.section`
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

  & > img {
    margin-top: 1.9rem;

    width: 32.5rem;
    height: 43.4rem;

    border-radius: 1.2rem;
  }
`;

const StVoteStatus = styled.div`
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

const StCompleteVoteBtn = styled.button`
  width: 39rem;
  height: 6rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
`;
