import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { converter } from "../../Types/Counverter.type";

const ExchangeCard: React.FC = () => {
  const convertDetails: converter = {
    amount: 1,
    from: "EUR",
    to: "USD",
    title: "United States Dollar",
  };
  return <></>;
};

export default ExchangeCard;
