import React, { lazy, Suspense } from "react";
import { Loader } from "components";

interface Opts {
  fallback: React.ReactNode;
}

type Unpromisify<T> = T extends Promise<infer P> ? P : never;

export const lazyLoad = <T extends Promise<any>, U extends React.ComponentType<any>>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = { fallback: <Loader /> },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  const LazyLoader = (props: React.ComponentProps<U>): JSX.Element => {
    return (
      <Suspense fallback={opts.fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return LazyLoader;
};
