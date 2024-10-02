
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Editar from './pages/editar/editar';
import Home from './pages/home/home';

;

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Editar' element={<Editar />} />
      </Routes>
    </Router>
  );
}

export default App;
