import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Weather from "./components/weather";
import { useState } from "react";

function App() {
  const [shouldRender, setShouldRender] = useState(true);

  function MyFallbackComponent({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  return (
    <ErrorBoundary
      FallbackComponent={MyFallbackComponent}
      onError={(error, errorInfo) => console.log({ error, errorInfo })}
      resetKeys={[shouldRender]}
      onReset={() => {
        setShouldRender(false);
      }}
    >
      {shouldRender ? <Weather /> : null}
    </ErrorBoundary>
  );
}

export default App;
