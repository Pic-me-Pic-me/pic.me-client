import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HeaderLayout } from '../components/Layout';

const CurrentFlowerDetail = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/home')} />
      <StCurrentVoteInfoWrapper>
        <StVoteTitle>
          <h1>나를 닮은 꽃은?</h1>
          <span>42분 전</span>
        </StVoteTitle>
        <StVoteStatus>
          <span>총 10명 중</span>
          <span>3 명 참가</span>
        </StVoteStatus>
        <StFlowerTestImg
          src="https://user-images.githubusercontent.com/97586683/224237345-a6164178-7588-49de-9675-bf4b8a99d61d.jpg"
          alt="테스트 이미지"
        />
        <StFlowerTestStatus>
          <span>현재 진행 중 ( 3 / 10 )</span>
        </StFlowerTestStatus>
      </StCurrentVoteInfoWrapper>
    </>
  );
};
export default CurrentFlowerDetail;

const StCurrentVoteInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 1.8rem 0 1.8rem;
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
    align-items: center;

    margin: 0.6rem 0 0.285rem 0;

    width: 34.6rem;
    // height: 5.6rem;

    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20}
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

const StFlowerTestImg = styled.img`
  width: 100%;
  height: 45.3rem;

  border-radius: 1rem;
`;

const StFlowerTestStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: cetner;

  margin-top: 1.1rem;

  width: 100%;
  height: 5.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  border-radius: 0.75389rem;
  & > span {
    text-align: center;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Subtitle3_Pretendard_Semibold_20}
  }
`;
