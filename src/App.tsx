import React from 'react';
import './App.scss';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from './components/Layout/Nav';
import { fetchRates, fetchSymbols } from './components/Api/DataProvider';

function App() {
  return (<>
     {/* {console.log("fetchSymbols",fetchSymbols())}
     {console.log("fetchRates",fetchRates("USD","EUR"))} */}
    <Router>
      <NavBar/>
    <Routes>
     
      {/* <Route path="*" element={} /> */}
    </Routes>
  </Router>
  </>
  );
}

export default App;
