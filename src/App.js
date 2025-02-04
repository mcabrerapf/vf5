import './App.scss';
import Main from './Components/Main';
import { MainContextWrapper } from './Contexts/MainContext'
import initLocal from './helpers/initLocal';


function App() {
  initLocal();
  return (
    <div className="app">
      <MainContextWrapper>
        <Main />
      </MainContextWrapper>
    </div>
  );
}

export default App;
