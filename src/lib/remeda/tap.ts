export const tap = <T>(fn: (x: T) => any) => (x: T) => {
  fn(x);
  return x;
}
