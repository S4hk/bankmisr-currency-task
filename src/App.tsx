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
import BankMisrCurrencyExchanger from "./components/Pages/Home";

function App() {
  return (
    <>
      {/* {console.log("fetchSymbols",fetchSymbols())}
     {console.log("fetchRates",fetchRates("USD","EUR"))} */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<BankMisrCurrencyExchanger/>} />
        </Routes>
      <PopularExchangeCards baseSymbol={"USD"} amount={5} />
      </Router>
    </>
  );
}

export default App;
