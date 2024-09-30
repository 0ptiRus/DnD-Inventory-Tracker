import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Characters from './components/Characters';
import Inventory from './components/Inventory';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/inventory/:characterId" element={<Inventory />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
