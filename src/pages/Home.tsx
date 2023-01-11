import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcPlus } from '../asset/icon';
import { Header, Nav, VoteList } from '../components/Home';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <StHomeWrapper>
        <Nav />
        <Header />
        <StMakerVoting
          type="button"
          onClick={() => {
            navigate('/makervoting');
          }}>
          <IcPlus />
          <p>투표 만들기</p>
        </StMakerVoting>
      </StHomeWrapper>
      <VoteList />
    </>
  );
};

export default Home;

const StHomeWrapper = styled.div`
  padding: 2.7rem 2rem 0rem 2rem;
`;

const StMakerVoting = styled.button`
  width: 100%;
  height: 12.4rem;
  padding: 0;
  margin-top: 1.5rem;

  border: none;
  border-radius: 1.2rem;
  background: inherit;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  > p {
    padding-top: 1.6rem;

    color: #5c5c5c;
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
`;
