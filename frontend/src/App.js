// src/App.js
import './App.css';
import LoginPage from './components/LoginPage';
import Indexpage from './components/Indexpage';
import Layout from './components/Layout';
import RegisterPage from './components/RegisterPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout loggedInUser={loggedInUser} onLogout={handleLogout} />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route index element={<Indexpage />} />
          <Route 
            path="/login" 
            element={<LoginPage setLoggedInUser={setLoggedInUser} />} 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
