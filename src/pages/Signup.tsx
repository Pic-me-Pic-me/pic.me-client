import React from 'react';
import styled, { css } from 'styled-components';

import logo from '../asset/icon/picme_logo.svg';
import AddAccount from '../components/Signup/AddAccount';

const Signup = () => (
  <>
    <StLogo src={logo} />
    <AddAccount></AddAccount>
  </>
);
const StLogo = styled.img`
  padding: 5.203rem 0rem 0.097rem 2rem;
`;
export default Signup;
