import './Style/App.css';
import './Style/fonts.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './View/Main';
import RegistrationPage from './View/RegistrationPage';
import LoginPage from './View/LoginPage';
import Dashboard from './View/Dashboard';
import Services from './View/Services';
import Products from './View/Products';
import Contact from './View/Contact';
import Login from './View/Login';
import SignUp from './View/SignUp';

function App() {
  return (
      
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
