import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import './ErrorBoundary.scss'

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div className='errorboundary' role="alert">
        <h4>Something went wrong</h4>
        <p>
            <span>Message: </span>
            {error.message}
        </p>
        <button
            className='button'
            onClick={resetErrorBoundary}
        >
            <span className='icon'>
                <span class="material-symbols-outlined">
                    refresh
                </span>
            </span>
            <span className='label'>
                Try again
            </span>
        </button>
    </div>
);

const ErrorBoundary = ({ children, page }) => (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
    </ReactErrorBoundary>
);

export default ErrorBoundary;