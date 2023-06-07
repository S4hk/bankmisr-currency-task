import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { MoreDetailsBtnProps } from "./Types/Converter.type";



const MoreDetailsBtn: React.FC<MoreDetailsBtnProps> = ({
  conversionData,
  isConvertDisabled,
}) => {
  const query = queryString.stringify(conversionData);

  return (
    <Link
      to={`/?${query}`}
      className={`btn btn-primary w-100 ${isConvertDisabled ? "disabled" : ""}`}
    >
      More Details
    </Link>
  );
};

export default MoreDetailsBtn;
