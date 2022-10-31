import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Weather from "./components/weather";

function App() {
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
    >
      <Weather />
    </ErrorBoundary>
  );
}

export default App;
