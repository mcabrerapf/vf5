import './App.scss';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import { ErrorBoundary } from "react-error-boundary";
import Main from './Components/Main';
import { MainContextWrapper } from './Contexts/MainContext'
import initLocal from './helpers/initLocal';
import ErrorBoundry from './Components/ErrorBoundry';
Amplify.configure({ ...awsExports});

function App() {
  initLocal();

  return (
    <div className="app">
      <ErrorBoundary
        FallbackComponent={ErrorBoundry}
      >
        <MainContextWrapper>
          <Main />
        </MainContextWrapper>
      </ErrorBoundary>
    </div>
  );
}

export default App;
