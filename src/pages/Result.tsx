import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import resultSample from '../asset/image/resultSample.png';
import { HeaderLayout } from '../components/Layout';
import ResultPicture from '../components/Result/ResultPicture';
import ResultReason from '../components/Result/ResultReason';
import SliderTitle from '../components/Result/SliderTitle';

export const Result = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderLayout HeaderTitle="최종 투표 결과" handleGoback={() => navigate(-1)}></HeaderLayout>
      <SliderTitle isChosenPic={false}></SliderTitle>
      <ResultReason></ResultReason>
      {/* <ResultPicture src={resultSample}></ResultPicture> */}
    </>
  );
};
