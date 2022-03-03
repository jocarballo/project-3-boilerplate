import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Plants from './pages/Plants';
import Plant from './pages/Plant';
import Garden from './pages/Garden';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/plants' element={<Plants />} />
          <Route path='/plants/:plantId' element={<Plant />} />
          <Route path='/garden' element={<Garden />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
