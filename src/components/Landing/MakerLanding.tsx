import Lottie from 'lottie-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  IcBackGround,
  IcLogoSmall,
  IcOBD1,
  IcOBD2,
  IcOBD3,
  IcOBD4,
  IcOnboardingLogo,
  IcSolution1,
  IcSolution2,
  IcSolution3,
} from '../../asset/icon';
import { lottie1, lottie2, lottie3 } from '../../asset/lottie';

const MakerLanding = () => {
  const navigate = useNavigate();
  return (
    <StOnboarding>
      <StFirstSection>
        <IcBackGround />
        <StTitle>
          <StContents>
            친구가
            <br />
            골라주는
            <br />
            나의 베스트 Pic!
          </StContents>
          <IcOnboardingLogo />
          <p>스크롤 해주세요</p>
          <StStartBtn
            type="button"
            onClick={() => {
              navigate('/login');
            }}>
            시작하기
          </StStartBtn>
        </StTitle>
      </StFirstSection>
      <StSecondSection>
        <StFirstContent>
          <p>
            <span>SNS</span>에 어떤 사진 올릴지
          </p>
          <p>고민한 적 있지 않나요?</p>
          <br />
          <IcOBD1 />
        </StFirstContent>
        <StSecondContent>
          <p>
            이럴 때 우리는<span> 친구들에게 연락해</span>
          </p>
          <p>도움을 요청하지만</p>
          <IcOBD2 />
          <p>
            <span>첫째,</span> 물어보는 과정의 <span>번거로움</span>
          </p>
          <IcOBD3 />
          <p>
            <span>둘째,</span>친구의 늦은 답장으로
          </p>
          <p>
            <span>지체되는 사진 선택</span>
          </p>
          <IcOBD4 />
          <p>
            <span>셋째,</span>친구들의 다양한 의견을
          </p>
          <p>
            <span>취합할 때의 어려움</span>
          </p>
          <br />
          <p>
            이러한<span> 불편함</span>을 겪습니다
          </p>
        </StSecondContent>
      </StSecondSection>
      <StThirdSection>
        <h1>
          이에&nbsp;
          <IcLogoSmall /> 는
        </h1>
        <h1>이러한 솔루션을 제안합니다!</h1>
        <StFirstSolution>
          <Lottie className="lotte" animationData={lottie1} loop={true} />
          <IcSolution1 />
          <h1>빠른 투표 생성과 공유</h1>
          <p>제목과 사진만으로 빠르게 투표를 생성해요!</p>
          <p>단 한번의 공유로 투표를 진행할 수 있어요!</p>
        </StFirstSolution>
        <StSecondSolution>
          <Lottie className="lotte" animationData={lottie2} loop={true}></Lottie>
          <IcSolution2 />
          <h1>현재 활동하는 지인의 선택</h1>
          <p> SNS 스토리에 링크를 공유해</p>
          <p>친구의 선택을 빠르게 확인할 수 있어요!</p>
        </StSecondSolution>
        <StThirdSolution>
          <Lottie className="lotte" animationData={lottie3} loop={true}></Lottie>
          <IcSolution3 />
          <h1>한눈에 확인할 수 있는 투표 결과</h1>
          <p>원하는 시간에 마감하고 Pic.me만의 결과물로</p>
          <p>한눈에 친구들의 시선을 확인할 수 있어요!</p>
        </StThirdSolution>
        <StStart>
          <h1>친구의 시선으로 완성되는</h1>
          <h1>
            <span>나의 Pic</span>을 경험해보세요!
          </h1>
          <StStartBtn
            type="button"
            onClick={() => {
              navigate('/login');
            }}>
            시작하기
          </StStartBtn>
        </StStart>
      </StThirdSection>
      <StFooter>
        <p>Contact Us</p>
        <h1>with.picme@gmail.com</h1>
      </StFooter>
    </StOnboarding>
  );
};

export default MakerLanding;

const StOnboarding = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  max-width: 43rem;
  height: 556.1rem;

  & > svg {
    width: 100%;
    top: 0;
  }
`;

const StFirstSection = styled.section`
  width: 100%;
  height: 94.1rem;
  padding: 0rem 2.8rem;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const StTitle = styled.header`
  width: 100%;

  & > p {
    display: flex;
    justify-content: center;

    margin-top: 18.869rem;
    margin-bottom: 2.3rem;

    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16}
  }
  & > svg {
    margin-top: 2.6rem;
  }
`;

const StContents = styled.h1`
  padding-top: 13.9rem;
  margin-left: -0.245rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};

  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 2.88035rem;
  line-height: 3.4rem;

  white-space: pre-wrap;

  & > svg {
    margin-top: 2.6rem;
    padding-right: 4.617rem;
  }
`;

const StStartBtn = styled.button`
  width: 100%;
  max-width: 43rem;
  height: 5.763rem;
  padding: 0rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  border: none;
  border-radius: 0.8rem;
`;

const StSecondSection = styled.section`
  width: 100%;
  /* padding: 15.8rem 6.2rem 0rem 6.2rem; */
`;

const StFirstContent = styled.article`
  & > p {
    ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};
    text-align: center;
    & > span {
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
      ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};
    }
  }

  & > svg {
    align-items: center;
    justify-content: center;
    margin-top: 5.6rem;
    width: 100%;
  }
`;

const StSecondContent = styled.article`
  margin-top: 8.841rem;

  & > p {
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16};
    text-align: center;
    & > span {
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
      ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16};
    }
    :last-child {
      margin-top: 13.292rem;
      margin-bottom: 10.972rem;
    }
  }

  & > svg {
    width: 100%;

    :nth-child(3) {
      margin-top: 4.065rem;
      margin-bottom: 2.69rem;
    }
    :nth-child(5) {
      margin-top: 3.174rem;
      margin-bottom: 2.612rem;
    }
    :nth-child(8) {
      margin-top: 4.415rem;
      margin-bottom: 2.734rem;
    }
  }
`;

const StThirdSection = styled.section`
  align-items: center;

  padding: 8.3rem 1.5rem 0rem 1.5rem;
  height: 245.3rem;

  background: linear-gradient(180deg, #000000 0%, #000000 91.15%, rgba(30, 31, 33, 0) 100%);

  & > h1 {
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};
    text-align: center;
  }
`;

const StFirstSolution = styled.article`
  margin-top: 11.183rem;
  width: 100%;

  text-align: center;

  & > svg {
    margin-top: 2.043rem;
    margin-bottom: 1.821rem;
  }

  & > h1 {
    margin-bottom: 1.8rem;
    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20};
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }

  & > p {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;

const StSecondSolution = styled(StFirstSolution)`
  margin-top: 20.4rem;
`;

const StThirdSolution = styled(StFirstSolution)`
  margin-top: 24rem;
  margin-bottom: 40.1rem;
`;

const StStart = styled.div`
  width: 100%;
  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};
    text-align: center;
    & > span {
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
      ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};
    }
  }
  button:last-child {
    margin-top: 5.5rem;
    margin-bottom: 6.237rem;
  }
`;

const StFooter = styled.footer`
  margin-top: 22.6rem;
  margin-bottom: 4.409rem;
  width: 100%;
  height: 7.8rem;

  text-align: center;

  & > p {
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
    color:  ${({ theme }) => theme.colors.Pic_Color_Gray_3}
  }
  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16}
    color:  ${({ theme }) => theme.colors.Pic_Color_Coral}
  }
`;
