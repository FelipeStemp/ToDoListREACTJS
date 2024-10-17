
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import LoginPage from './pages/login/login';

;

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Tarefas' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
