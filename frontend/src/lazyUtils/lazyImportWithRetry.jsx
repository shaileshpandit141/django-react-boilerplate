import React, { Suspense } from 'react';
import ErrorBoundary from 'errors/errorBoundary/ErrorBoundary';

export function lazyImportWithRetry(importFunction, retries = 3, delay = 1000) {
  return React.lazy(() =>
    new Promise((resolve, reject) => {
      const tryImport = (attempt) => {
        importFunction()
          .then(resolve)
          .catch((error) => {
            if (attempt < retries) {
              console.warn(`Retrying import: attempt ${attempt + 1} of ${retries}`);
              setTimeout(() => tryImport(attempt + 1), delay);
            } else {
              reject(error);
            }
          });
      };
      tryImport(0);
    })
  );
}

export function LazyLoader({ element, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        {element}
      </Suspense>
    </ErrorBoundary>
  );
}
