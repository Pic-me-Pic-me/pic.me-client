import React from 'react';
import styled from 'styled-components';

import { IcModalBG, IcPlayerTitle } from '../../../asset/icon';
import { loading } from '../../common/style/animation';

const LandingPlayer = () => (
  <StModalWrapper>
    <StModal>
      <IcPlayerTitle fill="#C3CDD5" />
      <StContent>
        <IcModalBG fill="#C3CDD5" />
        <StDescription>
          <p />
          <p />
        </StDescription>
      </StContent>
      <StButtonWrapper>
        <button type="button" />
        <button type="button" />
      </StButtonWrapper>
    </StModal>
  </StModalWrapper>
);
export default LandingPlayer;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;
  padding: 0rem 4.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2rem);
`;

const StModal = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 54.8rem;
  padding: 4.9rem 1.8rem 2.3rem 1.8rem;
  margin: auto;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

  & > svg {
    width: 20rem;
    height: 6.6rem;
    & > rect {
      animation: ${loading} 2s infinite linear;
    }
  }
`;
const StDescription = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 2.5rem;
  margin-bottom: 3.4rem;

  gap: 0.4rem;

  & > p {
    :first-child {
      width: 30%;
      height: 2rem;
    }
    :last-child {
      width: 50%;
      height: 2rem;
    }

    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    animation: ${loading} 2s infinite linear;
  }
`;

const StContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 1.95rem;
  & > svg {
    margin: 0 auto;
    width: 14.9rem;
    height: 15.8rem;

    object-fit: fill;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  width: 100%;

  & > button {
    width: 100%;
    height: 5.4rem;

    border: none;
    border-radius: 0.9rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

    animation: ${loading} 2s infinite linear;
  }
`;
