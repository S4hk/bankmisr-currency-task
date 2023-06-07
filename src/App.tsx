import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/Layout/Nav";

import BankMisrCurrencyExchanger from "./Pages/Home";

function App() {
  return (
    <>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<BankMisrCurrencyExchanger/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
