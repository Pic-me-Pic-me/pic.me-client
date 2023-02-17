import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <>
    <StFooterWrapper></StFooterWrapper>
  </>
);

export default Footer;

const StFooterWrapper = styled.footer`
  width: 100%;
  height: 21.3rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;
