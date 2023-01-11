import { createGlobalStyle, css } from 'styled-components';

import PretendardBlack from '../fonts/Pretendard-Black.woff';
import PretendardBold from '../fonts/Pretendard-Bold.woff';
import PretendardExtraBold from '../fonts/Pretendard-ExtraBold.woff';
import PretendardExtraLight from '../fonts/Pretendard-ExtraLight.woff';
import PretendardLight from '../fonts/Pretendard-Light.woff';
import PretendardMedium from '../fonts/Pretendard-Medium.woff';
import PretendardRegular from '../fonts/Pretendard-Regular.woff';
import PretendardSemiBold from '../fonts/Pretendard-SemiBold.woff';
import PretendardThin from '../fonts/Pretendard-Thin.woff';

export const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 62.5%;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
  }
`;

export const GlobalStyle = createGlobalStyle`
${reset}

#root, body, html {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
}
#root::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
* {
    box-sizing: border-box;
}

@font-face{
  font-family: "PretendardBlack";
  src: url(${PretendardBlack}) format("font-woff");
}
@font-face{
  font-family: "PretendardBold";
  src: url(${PretendardBold}) format("font-woff");
}
@font-face{
  font-family: "PretendardExtraBold";
  src: url(${PretendardExtraBold}) format("font-woff");
}
@font-face{
  font-family: "PretendardExtraLight";
  src: url(${PretendardExtraLight}) format("font-woff");
}
@font-face{
  font-family: "PretendardLight";
  src: url(${PretendardLight}) format("font-woff");
}
@font-face{
  font-family: "PretendardMedium";
  src: url(${PretendardMedium}) format("font-woff");
}
@font-face{
  font-family: "PretendardRegular";
  src: url(${PretendardRegular}) format("font-woff");
}

@font-face{
  font-family: "PretendardSemiBold";
  src: url(${PretendardSemiBold}) format("font-woff");
}

@font-face{
  font-family: "PretendardThin";
  src: url(${PretendardThin}) format("font-woff");
}

`;

export default GlobalStyle;
