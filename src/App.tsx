
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';/* 
import Criar from './pages/Criacao/criar';
import Editar from './pages/editar/editar'; */
import Home from './pages/home/home';

;

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />{/* 
        <Route path='/Editar' element={<Editar />} />
        <Route path='/Criar' element={<Criar />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
