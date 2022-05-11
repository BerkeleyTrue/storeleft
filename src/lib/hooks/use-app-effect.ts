import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useAppEffect = (effect: EffectCallback, deps: DependencyList) => {
  const destructorRef = useRef<ReturnType<EffectCallback>>();
  const calledRef = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledRef.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (calledRef.current) {
      return;
    }

    calledRef.current = true;
    destructorRef.current = effect();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destructorRef.current) {
        destructorRef.current();
      }
    };
  }, deps);
};
