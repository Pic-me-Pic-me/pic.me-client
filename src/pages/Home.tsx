import React from 'react';
import styled from 'styled-components';

import { IcPlus } from '../asset/icon';
import { Header, Nav } from '../components/Home';
import VoteList from '../components/Home/VoteList';

const Home = () => (
  <>
    <Nav></Nav>
    <Header></Header>
    <StMakerVoting type="button">
      <IcPlus width="2.8rem" height="2.8rem" />
      <p>투표 만들기</p>
    </StMakerVoting>
    <VoteList />
  </>
);

export default Home;

const StMakerVoting = styled.button`
  width: 100%;
  height: 12.4rem;
  padding: 0;
  margin: 0rem 2rem;

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
