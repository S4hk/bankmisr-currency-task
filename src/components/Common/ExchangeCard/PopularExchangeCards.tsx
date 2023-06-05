import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PopularExchangeCardsProps, Rates } from "../../Types/Rates.type";
import { fetchPopularRates } from "../../Api/DataProvider";
import exchangeIcon from "../../../assets/images/exchange-13.svg";

const PopularExchangeCards: React.FC<PopularExchangeCardsProps> = ({
  baseSymbol,
  amount,
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
  }, [baseSymbol]);
  return (
    <>
      <Container>
        <Row>
          {rates &&
            Object.entries(rates).map(([symbol, rate]) => (
              <Col key={symbol} md={4}>
                <div className="shadow-md border border-2 border-primary rounded p-3 my-3 text-center">
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
                  <div className="bg-light p-3 d-flex justify-content-center">
                    <div>
                      Rate: {rate} {symbol} x Amount: {amount} =
                    </div>
                    <div className="fw-bold ms-1 text-warning">
                      {(amount * rate).toFixed(2)}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default PopularExchangeCards;
