import { css, DefaultTheme } from 'styled-components';

const colors = {
  Pic_Color_Coral: '#FF5D5D',
  Pic_Color_Yellow: '#FFFDC2',
  Pic_Color_Blue: '#3973CB',
  Pic_Color_Sky: '#C6DDFF',
  Pic_Color_Gray_Black: '#1E1F21',
  Pic_Color_Gray_2: '#525C67',
  Pic_Color_Gray_3: '#8A949E',
  Pic_Color_Gray_4: '#C3CDD5',
  Pic_Color_Gray_5: '#E8EBEF',
  Pic_Color_Gray_6: '#F4F5F7',
  Pic_Color_White: '#FFFFFF',
};

const fonts = {
  Pic_Title1_Pretendard_Bold_24: css`
    font-family: 'PretendardBold';
    font-size: 2.4rem;
    font-weight: 700;
    font-style: normal;
    line-height: 2.9rem;
  `,
  Pic_Title2_Pretendard_Bold_20: css`
    font-family: 'PretendardBold';
    font-size: 2rem;
    font-weight: 700;
    font-style: normal;
    line-height: 2.4rem;
  `,
  Pic_Title3_Pretendard_Bold_22: css`
    font-family: 'PretendardBold';
    font-size: 2.2rem;
    font-weight: 700;
    font-style: normal;
    line-height: 2.625rem;
  `,
  Pic_Subtitle1_Pretendard_Semibold_20: css`
    font-family: 'PretendardSemiBold';
    font-size: 2rem;
    font-weight: 600;
    font-style: normal;
    line-height: 2.4rem;
  `,
  Pic_Body1_Pretendard_Medium_16: css`
    font-family: 'PretendardMedium';
    font-size: 1.6rem;
    font-weight: 500;
    font-style: normal;
    line-height: 1.9rem;
  `,
  Pic_Body2_Pretendard_Bold_16: css`
    font-family: 'PretendardSemiBold';
    font-size: 1.6rem;
    font-weight: 700;
    font-style: normal;
    line-height: 1.9rem;
  `,

  Pic_Caption1_Pretendard_Semibold_12: css`
    font-family: 'PretendardSemiBold';
    font-size: 1.2rem;
    font-weight: 600;
    font-style: normal;
    line-height: 1.4rem;
  `,
};

const theme: DefaultTheme = {
  colors,
  fonts,
};
export default theme;
