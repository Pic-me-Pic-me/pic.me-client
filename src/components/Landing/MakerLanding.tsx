import Lottie from 'lottie-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcFlowerOnboarding, IcLogoSmall, IcOBD1 } from '../../asset/icon';
import { lottie1, lottie2, lottie3 } from '../../asset/lottie';
import useModal from '../../lib/hooks/useModal';
import MakerLandingModal from '../common/MakerLandingModal';

const MakerLanding = () => {
  const navigate = useNavigate();
  const { isShowing, toggle } = useModal();
  return (
    <>
      <MakerLandingModal isShowing={!isShowing} handleHide={toggle} />
      <StOnboarding>
        <StStartBtn
          type="button"
          onClick={() => {
            navigate('/login');
          }}>
          시작하기
        </StStartBtn>
        <StFirstSection>
          <IcFlowerOnboarding />
          <StContents>
            <h1>
              친구가 골라주는
              <br />
              나의 베스트
            </h1>
          </StContents>
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
        </StSecondSection>
        <StThirdSection>
          <h1>
            이에&nbsp;
            <IcLogoSmall /> 는
          </h1>
          <h1>이러한 솔루션을 제안합니다!</h1>
          <StFirstSolution>
            <Lottie className="lottie" animationData={lottie1} loop={true} />
            <span>solution 1</span>
            <h1>빠른 투표 생성과 공유</h1>
            <p>제목과 사진만으로 빠르게 투표를 생성해요!</p>
            <p>단 한번의 공유로 투표를 진행할 수 있어요!</p>
          </StFirstSolution>
          <StSecondSolution>
            <Lottie className="lottie" animationData={lottie2} loop={true}></Lottie>
            <span>solution 2</span>
            <h1>현재 활동하는 지인의 선택</h1>
            <p> SNS 스토리에 링크를 공유해</p>
            <p>친구의 선택을 빠르게 확인할 수 있어요!</p>
          </StSecondSolution>
          <StThirdSolution>
            <Lottie className="lottie" animationData={lottie3} loop={true}></Lottie>
            <span>solution 3</span>
            <h1>한눈에 확인할 수 있는 투표 결과</h1>
            <p>원하는 시간에 마감하고 Pic.me만의 결과물로</p>
            <p>한눈에 친구들의 시선을 확인할 수 있어요!</p>
          </StThirdSolution>
          <StStart>
            <h1>친구의 시선으로 완성되는</h1>
            <h1>
              <span>나의 Pic</span>을 경험해보세요!
            </h1>
          </StStart>
        </StThirdSection>
        <StFooter>
          <p>Contact Us</p>
          <h1>with.picme@gmail.com</h1>
        </StFooter>
      </StOnboarding>
    </>
  );
};

export default MakerLanding;

const StOnboarding = styled.div`
  position: absolute;

  width: 100%;
  max-width: 43rem;

  background-color: #1e1f21;
`;

const StStartBtn = styled.button`
  position: fixed;
  bottom: 9.6rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  width: 100%;
  max-width: 34rem;
  height: 5.2rem;
  padding: 0 1.7rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_6};
  border: none;
  border-radius: 0.8rem;
`;

const StFirstSection = styled.section`
  width: 100%;
  height: 98.4rem;

  & > svg {
    position: absolute;
    top: 21.6rem;

    width: 100%;
  }
`;

const StContents = styled.header`
  padding-top: 11rem;
  padding-left: 2.3rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};

  & > h1 {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 3.5rem;
    line-height: 131.2%;
    letter-spacing: -0.05em;

    padding-bottom: 1.4rem;
  }
`;

const StSecondSection = styled.section`
  width: 100%;
`;

const StFirstContent = styled.article`
  padding-top: 9.313rem;
  & > p {
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
    text-align: center;
    line-height: 2.724rem;
    & > span {
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
      ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
    }
  }

  & > svg {
    align-items: center;
    justify-content: center;

    padding-top: 4.787rem;
    padding: 0 5.4rem;
    width: 100%;
  }
`;

const StThirdSection = styled.section`
  align-items: center;

  padding: 24.552rem 1.5rem 0rem 1.5rem;
  height: 239.1rem;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 10.94%, #000000 91.15%, rgba(30, 31, 33, 0) 100%);

  & > h1 {
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
    text-align: center;
  }
`;

const StFirstSolution = styled.article`
  padding-top: 6.698rem;
  width: 100%;

  text-align: center;

  & > .lottie {
    padding-bottom: 2.621rem;
  }

  & > span {
    padding: 0.8rem 2.4rem 0.7rem 2.26rem;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};
    border-radius: 2rem;
  }

  & > h1 {
    padding-top: 2.28rem;
    padding-bottom: 1.8rem;
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }

  & > p {
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;

const StSecondSolution = styled(StFirstSolution)`
  padding-top: 17.305rem;
`;

const StThirdSolution = styled(StFirstSolution)`
  padding-top: 18.89rem;
  padding-bottom: 34.485rem;
`;

const StStart = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
    text-align: center;
    & > span {
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
      ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
    }
  }
  button:last-child {
    padding-top: 5.5rem;
    padding-bottom: 6.237rem;
  }
`;

const StFooter = styled.footer`
  padding-top: 13.701rem;
  padding-bottom: 4.409rem;
  width: 100%;

  text-align: center;

  & > p {
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_4};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_6};
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;
