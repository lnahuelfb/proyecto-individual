
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home'
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='home' element={<Home />} />
    </Routes>
  );
}

export default App;
