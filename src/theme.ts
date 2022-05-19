import * as _ from 'lodash/fp';
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { colors } from './theme/colors';

const fonts = {
  mono: `'Fira Code', ui-monospace, SFMono-Regular`,
  sans: `'Fira code', ui-sans-serif, system-ui`,
  serif: `'Fira Code', ui-serfi, Georgia`,
  body: `'Fira Code', ui-serif, SFMono-Regular`,
};

const breakpoints = createBreakpoints({
  sm: '22em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

export const theme: ThemeConfig = extendTheme({
  components: {},
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
  colors,
  semanticTokens: {
    colors: _.flow(
      _.toPairs,
      _.filter(([, val]) => !_.isString(val) && val.main),
      _.map(([key]) => [key, `${key}.main`]),
      _.fromPairs,
    )(colors),
  },
  fonts,
  breakpoints,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
