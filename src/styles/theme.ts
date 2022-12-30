import { css, DefaultTheme } from 'styled-components';

const colors = {
  picme_blue: '#2456f7',
  picme_black: '#000000',
  picme_white: '#ffffff',
};

const fonts = {
  picme_acumin_pro_black_80: css`
    font-size: 5rem;
    font-weight: 900;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
};

const theme: DefaultTheme = {
  colors,
  fonts,
};
export default theme;
