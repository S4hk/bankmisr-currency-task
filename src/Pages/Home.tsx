import React, { useState, useEffect } from "react";
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
import queryString from "query-string";
import HistoricalChart from "../components/HistoricalChart/HistoricalChart";

const BankMisrCurrencyExchanger: React.FC = () => {
  const [conversionData, setConversionData] = useState<converter>({
    amount: 0,
    from: "",
    to: "",
  });
  const [result, setResult] = useState(0);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

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

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    fetchCurrencies();
    if (location.search) {
      const parsedQuery = {
        amount: Number(parsed.amount),
        from: String(parsed.from),
        to: String(parsed.to),
      };

      setConversionData(parsedQuery);
    }
  }, [location.search]);

  const handleChange = (event: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = event.target;
    setConversionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  const isConvertDisabled = !conversionData.from || !conversionData.to;

  const handleSwap = () => {
    setConversionData({
      amount: conversionData.amount,
      from: conversionData.to,
      to: conversionData.from,
    });
    setResult(0);
    getRates();
  };
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
                <Form.Group
                  className="d-flex flex-grow-1"
                  controlId="fromCurrency"
                >
                  <Form.Label className="me-2">From</Form.Label>
                  <select
                    className="form-control"
                    value={conversionData?.from}
                    onChange={handleChange}
                    name="from"
                    disabled={!!location.search}
                  >
                    <option value="">Select Currency</option>
                    {currencies.map((currency) => (
                      <option key={currency.symbol} value={currency.symbol}>
                        {currency.symbol} - {currency.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <Button variant="transparent" onClick={handleSwap}>
                  <img
                    className="mx-2"
                    src={exchangeIcon}
                    width={30}
                    height={30}
                    alt="exchange Icon"
                  />
                </Button>
                <Form.Group
                  className="d-flex flex-grow-1"
                  controlId="toCurrency"
                >
                  <Form.Label className="me-2">To</Form.Label>
                  <select
                    className="form-control"
                    value={conversionData?.to}
                    onChange={handleChange}
                    name="to"
                  >
                    <option value="">Select Currency</option>
                    {currencies.map((currency) => (
                      <option key={currency.symbol} value={currency.symbol}>
                        {currency.symbol} - {currency.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
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
                    <Link
                      to={`/?${queryString.stringify(conversionData)}`}
                      className={
                        "btn btn-primary w-100 " +
                        (isConvertDisabled ? "disabled" : "")
                      }
                    >
                      More Details
                    </Link>
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
            baseSymbol={conversionData?.from}
            amount={conversionData?.amount}
          />
        )
      )}
    </>
  );
};

export default BankMisrCurrencyExchanger;
