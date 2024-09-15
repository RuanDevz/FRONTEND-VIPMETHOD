import React from 'react';
import Header from './components/Header';
import HeaderLogged from './components/HeaderLogged'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';   
import Register from './pages/Register';  

const App = () => {


  const token = localStorage.getItem("Token")


  return (
    <Router>
      <div>
        {token ? <HeaderLogged/> : <Header/>}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
