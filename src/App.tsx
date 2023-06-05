import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/Layout/Nav";
import {
  fetchRates,
  fetchSymbols,
  fetchPopularRates,
} from "./components/Api/DataProvider";
import { Rates } from "./components/Types/Rates.type";
import PopularExchangeCards from "./components/Common/ExchangeCard/PopularExchangeCards";

function App() {
  return (
    <>
      {/* {console.log("fetchSymbols",fetchSymbols())}
     {console.log("fetchRates",fetchRates("USD","EUR"))} */}
      <Router>
        <NavBar />
      <PopularExchangeCards baseSymbol={"USD"} amount={5} />
        <Routes>{/* <Route path="/" element={} /> */}</Routes>
      </Router>
    </>
  );
}

export default App;
