import './App.scss';
import { ErrorBoundary } from "react-error-boundary";
import Main from './Components/Main';
import { MainContextWrapper } from './Contexts/MainContext'
import initLocal from './helpers/initLocal';
import ErrorFallback from './Components/ErrorBoundry/ErrorBoundry';


function App() {
  initLocal();

  return (
    <div className="app">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()} // Optional reset action
      >
        <MainContextWrapper>
          <Main />
        </MainContextWrapper>
      </ErrorBoundary>
    </div>
  );
}

export default App;
