import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      picme_blue: string;
      picme_black: string;

      picme_white: string;
    };
    fonts: {
      picme_acumin_pro_black_80: SerializedStyles;
    };
  }
}
