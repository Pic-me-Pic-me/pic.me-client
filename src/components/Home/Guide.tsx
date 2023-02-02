import React from 'react';
import styled from 'styled-components';

import { IcClose, IcGuide } from '../../asset/icon';

export interface GuideProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const Guide = (props: GuideProps) => {
  const { isShowing, handleHide } = props;
  return (
    <div>
      {isShowing && (
        <StGuideModalWrapper>
          <StGuideModal>
            <StModalHeader>
              <StCloseBtn type="button" onClick={handleHide}>
                <IcClose />
              </StCloseBtn>
            </StModalHeader>
            <StContent>
              <IcGuide />
            </StContent>
          </StGuideModal>
        </StGuideModalWrapper>
      )}
    </div>
  );
};

export default Guide;

const StGuideModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100000;

  width: 100%;
  height: 100%;
  padding: 0rem 3.5rem;

  background: rgba(0, 0, 0, 0.7);
`;

const StGuideModal = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 65.1rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

  > img {
    top: 0;

    width: 100%;
    padding: 0rem 1.4rem;
    object-fit: cover;
    overflow-y: scroll;
  }
`;

const StModalHeader = styled.header`
  position: sticky;

  width: 100%;
  height: 5.8rem;

  > svg {
    width: 1.3rem;
  }
`;

const StCloseBtn = styled.button`
  float: right;

  width: 6.2rem;
  height: 5.8rem;
  padding: 0;

  background: inherit;
  border: none;
`;

const StContent = styled.article`
  width: 100%;
  overflow-y: scroll;

  > svg {
    top: 0;

    width: 100%;
    padding: 0rem 1.4rem 5.922rem 1.4rem;

    object-fit: fill;
  }
`;
