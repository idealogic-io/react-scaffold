import React, { lazy, Suspense } from "react";

import { Loader } from "components";

export const lazyLoad = (importFunc, selectorFunc, opts = { fallback: <Loader /> }) => {
  let lazyFactory = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  const LazyLoader = props => {
    return (
      <Suspense fallback={opts.fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return LazyLoader;
};
