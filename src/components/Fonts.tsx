import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/fira/FiraCode-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/fira/FiraCode-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/fira/FiraCode-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/fira/FiraCode-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/fira/FiraCode-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fira Code VF';
  src: url('/fonts/fira/FiraCode-VF.woff2') format('woff2-variations');
  /* font-weight requires a range: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#Using_a_variable_font_font-face_changes */
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
      `}
  />
)

export { Fonts }
