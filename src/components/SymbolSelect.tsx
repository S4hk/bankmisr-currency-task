
import React from "react";
import { Form } from "react-bootstrap";
import { CurrencySelectProps } from "./Types/Converter.type";



const SymbolSelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  name,
  currencyOptions
}) => {
  return (
    <Form.Group className="d-flex flex-grow-1" controlId={name}>
      <Form.Label className="me-2">{label}</Form.Label>
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="">Select Currency</option>
      {currencyOptions}
      </select>
    </Form.Group>
  );
};

export default SymbolSelect;
