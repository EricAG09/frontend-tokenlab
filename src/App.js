import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import { UserProvider } from './context/useContext';
import Logout from './pages/logout';

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      </ UserProvider>
    </Router>
  );
}


export default App;
