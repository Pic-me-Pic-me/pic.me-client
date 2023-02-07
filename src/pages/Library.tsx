import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcEmptyLibrary } from '../asset/icon';
import LandingLibrary from '../components/Landing/maker/LandingLibrary';
import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { useGetAllVoteInfo } from '../lib/hooks/useGetAllVoteInfo';
import { EndedVoteInfo } from '../types/library';
import Error404 from './Error404';

const Library = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const { allVoteInfoList, isLoading, isError, size, setSize } = useGetAllVoteInfo();

  const getMoreItem = useCallback(async () => {
    if (allVoteInfoList) {
      setSize((prev) => prev + 1);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  if (isLoading) {
    return <LandingLibrary />;
  }
  if (isError) {
    return <Error404 />;
  }

  return (
    <>
      <HeaderLayout
        HeaderTitle="라이브러리"
        handleGoback={() => {
          navigate('/home');
        }}
      />
      {allVoteInfoList.list.length !== 0 ? (
        <StMonthVotingInfo>
          {allVoteInfoList.list.map((votingInfo: EndedVoteInfo, idx: number) =>
            idx === allVoteInfoList.list.length - 1 ? (
              <div key={idx} ref={ref}>
                <MonthVoting date={votingInfo.date} votes={votingInfo.votes} key={idx}></MonthVoting>
              </div>
            ) : (
              <MonthVoting date={votingInfo.date} votes={votingInfo.votes} key={idx}></MonthVoting>
            ),
          )}
        </StMonthVotingInfo>
      ) : (
        <StEmptyView>
          <div>
            <IcEmptyLibrary />
            <p>아직 마감된 투표가 없어요!</p>
          </div>
        </StEmptyView>
      )}
    </>
  );
};

const StMonthVotingInfo = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 3.3rem;

  overflow-y: scroll;
`;

const StEmptyView = styled.main`
  div {
    margin-top: 22.4rem;
    margin-bottom: 43.7rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div > p {
    margin-top: 3.429rem;
    ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;

export default Library;
