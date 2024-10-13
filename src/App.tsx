import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css'
import LoginSignUp from './pages/Login'
import Admin from './pages/AdminPanel/Admin'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} /> {/* Página de Login */}
        <Route path="/admin" element={<Admin />} /> {/* Página de Admin */}
      </Routes>
    </Router>
  );
}

export default App
