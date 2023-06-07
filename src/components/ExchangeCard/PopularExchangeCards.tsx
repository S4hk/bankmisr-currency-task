import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PopularExchangeCardsProps, Rates } from "../Types/Rates.type";
import { fetchPopularRates } from "../Api/DataProvider";
import exchangeIcon from "../../assets/images/exchange-13.svg";
import "./popularExchangeCard.scss"
const PopularExchangeCards: React.FC<PopularExchangeCardsProps> = ({
  baseSymbol,
  amount,
  result
}) => {
  const [rates, setRates] = useState<Rates>(); 
  const getPopularRates = async (base: string) => {
    try {
      const rates: Rates = (await fetchPopularRates(base)) as Rates;
      setRates(rates);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (baseSymbol){
    getPopularRates(baseSymbol)
  }
  }, [result]);
  return (
    <>
      <Container>
        <Row>
          {rates ?
            Object.entries(rates).map(([symbol, rate]) => (
              <Col key={symbol} md={4}>
                <div className="popular-card p-3 my-3 ">
                  <h4 className="text-primary">{symbol}</h4>
                  <div>
                    1 {baseSymbol}
                    <img
                      className="mx-2"
                      src={exchangeIcon}
                      width={10}
                      height={10}
                      alt="exchange Icon"
                    />
                    {rate} {symbol}
                  </div>
                  <div className="rate-highlight p-3">
                    <div>
                      Rate: {rate} {symbol} x Amount: {amount} =
                    </div>
                    <div className="fw-bold ms-1 text-warning">
                      {(amount * rate).toFixed(2)}
                    </div>
                  </div>
                </div>
              </Col>
            )) : <div>Loading...</div>}
        </Row>
      </Container>
    </>
  );
};

export default PopularExchangeCards;
