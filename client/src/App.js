import { Route } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';
import Loading from './Components/Loading/Loading';

function App() {

  return (
    <div className="App">
        <Route exact path='/' component={Loading} />
      <header className="App-header">
        <Route path="/home" component={Home}/>  
      </header>
    </div>
  );
}

export default App;
