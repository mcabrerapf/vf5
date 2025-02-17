import './App.scss';
import { Amplify } from 'aws-amplify';
import { ErrorBoundary } from "react-error-boundary";
import Main from './Components/Main';
import { MainContextWrapper } from './Contexts/MainContext'
import initLocal from './helpers/initLocal';
import ErrorBoundry from './Components/ErrorBoundry';
console.log('AAAAAA', process.env)
console.log('AAAAAA', process.env.REACT_APP_AK)
Amplify.configure({
  "aws_project_region": process.env.REACT_APP_REGION,
  "aws_appsync_graphqlEndpoint": process.env.REACT_APP_EP,
  "aws_appsync_region": process.env.REACT_APP_REGION_SYNC,
  "aws_appsync_authenticationType": process.env.REACT_APP_AT,
  "aws_appsync_apiKey": process.env.REACT_APP_AK
});

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
