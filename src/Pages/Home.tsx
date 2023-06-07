import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { fetchRates, fetchSymbols } from "../components/Api/DataProvider";
import exchangeIcon from "../assets/images/exchange-13.svg";
import { Link, useLocation } from "react-router-dom";
import {
  Currency,
  FormControlElement,
  converter,
} from "../components/Types/Converter.type";
import PopularExchangeCards from "../components/ExchangeCard/PopularExchangeCards";
import HistoricalChart from "../components/HistoricalChart/HistoricalChart";
import MoreDetailsBtn from "../components/MoreDetailsBtn";
import SymbolSelect from "../components/SymbolSelect";

const BankMisrCurrencyExchanger: React.FC = () => {
  const location = useLocation();
  const [conversionData, setConversionData] = useState<converter>({
    amount: 0,
    from: "",
    to: "",
  });
  const [result, setResult] = useState(0);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const isConvertDisabled = !conversionData.from || !conversionData.to;



  // fetching  the currencies symbols

  const fetchCurrencies = async () => {
    try {
      const symbols = await fetchSymbols();

      const currencies = Object.entries(symbols).map(([symbol, name]) => ({
        symbol,
        name,
      })) as Currency[];
      setCurrencies(currencies);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);


  // collecting data from input and add it to state
  const handleChange = (event: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = event.target;
    setConversionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // calling the thirdparty api to get the currncy rate
  const getRates = async () => {
    try {
      const rate = await fetchRates(conversionData?.from, conversionData?.to);

      setResult(rate[conversionData?.to]);
    } catch (error) {
      console.error("Error fetching rate:", error);
    }
  };


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ) => {
    event.preventDefault();
    setResult(0);
    getRates();
  };


  // swap function that change the symbols and re reuqest the rates
  const handleSwap = () => {
    setConversionData({
      amount: conversionData.amount,
      from: conversionData.to,
      to: conversionData.from,
    });
    setResult(0);
    getRates();
  };


  // The currencyOptions variable is created using the useMemo hook to optimize rendering performance.
  const currencyOptions = useMemo(() => {
    return currencies.map((currency) => (
      <option key={currency.symbol} value={currency.symbol}>
        {currency.symbol} - {currency.name}
      </option>
    ))
  }, [currencies])
  return (
    <>
    
      <Container>
        <h1 className="text-center mb-4 mt-5">Bank Misr Currency Exchanger</h1>
        {!!location.search && (
          <div className="d-flex justify-content-between">
            <h3>
              {
                currencies?.find(
                  (currency) => currency?.symbol === conversionData?.from
                )?.name
              }
            </h3>

            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          </div>
        )}

        <Form
          onSubmit={handleSubmit}
          className="shadow-md border border-2  border-primary rounded p-5 my-3"
        >
          <Row>
            <Col sm={6} className="d-flex flex-column justify-content-between">
              <Form.Group as={Row} className="mb-3" controlId="amount">
                <Form.Label column sm={2}>
                  Amount
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    name="amount"
                    value={conversionData?.amount}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="amount">
                <Form.Label column sm={2}>
                  Rate
                </Form.Label>
                <Col sm={10}>
                  {result ? (
                    <div className="bg-light p-2 rounded">
                      1 {conversionData?.from} x {result.toFixed(2)}{" "}
                      {conversionData?.to}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <div className="d-flex mb-4 align-items-center">
                <SymbolSelect
                  label="From"
                  value={conversionData.from}
                  onChange={handleChange}
                  name="from"
                  currencyOptions={currencyOptions}
                />
                <Button variant="transparent" onClick={handleSwap}>
                  <img
                    className="mx-2"
                    src={exchangeIcon}
                    width={30}
                    height={30}
                    alt="exchange Icon"
                  />
                </Button>
                <SymbolSelect
                  label="To"
                  value={conversionData.to}
                  onChange={handleChange}
                  name="to"
                  currencyOptions={currencyOptions}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-100 btn-lg mb-3"
                disabled={isConvertDisabled}
              >
                Convert
              </Button>

              <Row>
                <Col className="fs-9">
                  {result ? (
                    <div className="bg-light p-2 rounded d-inline-block p-2 w-100 text-center">
                      {(result * conversionData?.amount).toFixed(2)}
                      {conversionData?.to}
                    </div>
                  ) : null}
                </Col>

                {!!location.search || (
                  <Col>
                    <MoreDetailsBtn
                      conversionData={conversionData}
                      isConvertDisabled={isConvertDisabled}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
      {!!location.search ? (
        <HistoricalChart
          symbols={conversionData?.to}
          base={conversionData?.from}
        />
      ) : (
        conversionData?.from &&
        !!result && (
          <PopularExchangeCards
          result={result}
            baseSymbol={conversionData?.from}
            amount={conversionData?.amount}
          />
        )
      )}
    </>
  );
};

export default BankMisrCurrencyExchanger;
