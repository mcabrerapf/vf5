import './App.scss';
import Main from './Components/Main';
import { MainContextWrapper } from './Contexts/MainContext'


function App() {
  return (
    <div className="app">
      <MainContextWrapper>
        <Main />
      </MainContextWrapper>
    </div>
  );
}

export default App;
