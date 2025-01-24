import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={<Login />} />
        <Route path="/register" component={<Register />} />
        <Route path="/events" component={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
