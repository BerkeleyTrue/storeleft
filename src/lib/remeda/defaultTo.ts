import * as R from 'remeda';

export const defaultTo =
  <T>(d: T) =>
  (v: T | undefined | null) =>
    R.isDefined(v) ? v : d;
