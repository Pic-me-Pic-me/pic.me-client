import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcEmptyLibrary } from '../asset/icon';
import LandingLibrary from '../components/Landing/maker/LandingLibrary';
import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { useGetAllVoteInfo } from '../lib/hooks/useGetAllVoteInfo';
import Error404 from './Error404';

const Library = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const { allVoteInfoList, isLoading, isError, size, setSize, mutate } = useGetAllVoteInfo();

  const getMoreItem = useCallback(async () => {
    if (allVoteInfoList) {
      setSize((prev) => prev + 1);
      return mutate();
    }
    return;
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
      {allVoteInfoList.dateList.length ? (
        <StMonthVotingInfo>
          {allVoteInfoList.dateList.map((votingDate: number, idx: number) =>
            idx === allVoteInfoList.dateList.length - 1 ? (
              <div key={idx} ref={ref}>
                <MonthVoting date={votingDate} key={idx}></MonthVoting>
              </div>
            ) : (
              <MonthVoting date={votingDate} key={idx}></MonthVoting>
            ),
          )}
        </StMonthVotingInfo>
      ) : (
        <StEmptyView>
          <IcEmptyLibrary />
          <p>아직 마감된 투표가 없어요!</p>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 22.4rem;

  > p {
    margin-top: 3.429rem;
    margin-bottom: 43.7rem;
    ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }
`;

export default Library;
