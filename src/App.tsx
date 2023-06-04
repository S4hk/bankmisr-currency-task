import React from 'react';
import './App.scss';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from './components/Layout/Nav';

function App() {
  return (
    <Router>
      <NavBar/>
    <Routes>
     
      {/* <Route path="*" element={} /> */}
    </Routes>
  </Router>
  );
}

export default App;
