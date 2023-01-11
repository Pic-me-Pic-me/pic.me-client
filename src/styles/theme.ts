import { css, DefaultTheme } from 'styled-components';

const colors = {
  Pic_Color_Coral: '#FF5E67',
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
    font-style: normal;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 2.9rem;
  `,
  Pic_Title2_Pretendard_Bold_20: css`
    font-family: 'PretendardBold';
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  Pic_Title3_Pretendard_Bold_22: css`
    font-family: 'PretendardBold';
    font-style: normal;
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 2.6rem;
  `,
  Pic_Subtitle1_Pretendard_Semibold_20: css`
    font-family: 'PretendardSemiBold';
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  Pic_Subtitle2_Pretendard_Medium_18: css`
    font-family: 'PretendardMedium';
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.2rem;
  `,

  Pic_Subtitle3_Pretendard_Semibold_20: css`
    font-family: 'PretendardSemiBold';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  `,
  Pic_Body1_Pretendard_Medium_16: css`
    font-family: 'PretendardMedium';
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `,
  Pic_Body2_Pretendard_Bold_16: css`
    font-family: 'PretendardBold';
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
  `,
  Pic_Caption1_Pretendard_Semibold_12: css`
    font-family: 'PretendardSemiBold';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
  `,
  Pic_Caption2_Pretendard_Semibold_14: css`
    font-family: 'PretendardSemiBold';
    font-size: 1.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: 1.671rem;
  `,
};

const theme: DefaultTheme = {
  colors,
  fonts,
};
export default theme;
