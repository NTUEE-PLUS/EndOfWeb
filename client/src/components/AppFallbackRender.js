import React from 'react'

const AppFallbackRender = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <div>Oh no</div>
    <pre>{error.message}</pre>
    <button
      onClick={() => {
        // this next line is why the fallbackRender is useful
        // resetComponentState()
        // though you could accomplish this with a combination
        // of the FallbackCallback and onReset props as well.
        resetErrorBoundary()
      }}
    >
      Try again
    </button>
  </div>
)

export { AppFallbackRender }
