import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { fetchSymbols } from "../Api/DataProvider";
import exchangeIcon from "../../assets/images/exchange-13.svg";
import { Link } from "react-router-dom";
import {
  Currency,
  FormControlElement,
  converter,
} from "../Types/Converter.type";

const BankMisrCurrencyExchanger: React.FC = () => {
  const [conversionData, setConversionData] = useState<converter>({
    amount: 1,
    from: "",
    to: "",
  });
  const [results, setResults] = useState();
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const fetchCurrencies = async () => {
    try {
      // const symbols = await fetchSymbols();
      const symbols = {
        AED: "United Arab Emirates Dirham",
        AFN: "Afghan Afghani",
        ALL: "Albanian Lek",
        AMD: "Armenian Dram",
        ANG: "Netherlands Antillean Guilder",
        AOA: "Angolan Kwanza",
        ARS: "Argentine Peso",
        AUD: "Australian Dollar",
        AWG: "Aruban Florin",
        AZN: "Azerbaijani Manat",
        BAM: "Bosnia-Herzegovina Convertible Mark",
        BBD: "Barbadian Dollar",
        BDT: "Bangladeshi Taka",
        BGN: "Bulgarian Lev",
        BHD: "Bahraini Dinar",
        BIF: "Burundian Franc",
        BMD: "Bermudan Dollar",
        BND: "Brunei Dollar",
        BOB: "Bolivian Boliviano",
        BRL: "Brazilian Real",
        BSD: "Bahamian Dollar",
        BTC: "Bitcoin",
        BTN: "Bhutanese Ngultrum",
        BWP: "Botswanan Pula",
        BYN: "New Belarusian Ruble",
        BYR: "Belarusian Ruble",
        BZD: "Belize Dollar",
        CAD: "Canadian Dollar",
        CDF: "Congolese Franc",
        CHF: "Swiss Franc",
        CLF: "Chilean Unit of Account (UF)",
        CLP: "Chilean Peso",
        CNY: "Chinese Yuan",
        COP: "Colombian Peso",
        CRC: "Costa Rican Colón",
        CUC: "Cuban Convertible Peso",
        CUP: "Cuban Peso",
        CVE: "Cape Verdean Escudo",
        CZK: "Czech Republic Koruna",
        DJF: "Djiboutian Franc",
        DKK: "Danish Krone",
        DOP: "Dominican Peso",
        DZD: "Algerian Dinar",
        EGP: "Egyptian Pound",
        ERN: "Eritrean Nakfa",
        ETB: "Ethiopian Birr",
        EUR: "Euro",
        FJD: "Fijian Dollar",
        FKP: "Falkland Islands Pound",
        GBP: "British Pound Sterling",
        GEL: "Georgian Lari",
        GGP: "Guernsey Pound",
        GHS: "Ghanaian Cedi",
        GIP: "Gibraltar Pound",
        GMD: "Gambian Dalasi",
        GNF: "Guinean Franc",
        GTQ: "Guatemalan Quetzal",
        GYD: "Guyanaese Dollar",
        HKD: "Hong Kong Dollar",
        HNL: "Honduran Lempira",
        HRK: "Croatian Kuna",
        HTG: "Haitian Gourde",
        HUF: "Hungarian Forint",
        IDR: "Indonesian Rupiah",
        ILS: "Israeli New Sheqel",
        IMP: "Manx pound",
        INR: "Indian Rupee",
        IQD: "Iraqi Dinar",
        IRR: "Iranian Rial",
        ISK: "Icelandic Króna",
        JEP: "Jersey Pound",
        JMD: "Jamaican Dollar",
        JOD: "Jordanian Dinar",
        JPY: "Japanese Yen",
        KES: "Kenyan Shilling",
        KGS: "Kyrgystani Som",
        KHR: "Cambodian Riel",
        KMF: "Comorian Franc",
        KPW: "North Korean Won",
        KRW: "South Korean Won",
        KWD: "Kuwaiti Dinar",
        KYD: "Cayman Islands Dollar",
        KZT: "Kazakhstani Tenge",
        LAK: "Laotian Kip",
        LBP: "Lebanese Pound",
        LKR: "Sri Lankan Rupee",
        LRD: "Liberian Dollar",
        LSL: "Lesotho Loti",
        LTL: "Lithuanian Litas",
        LVL: "Latvian Lats",
        LYD: "Libyan Dinar",
        MAD: "Moroccan Dirham",
        MDL: "Moldovan Leu",
        MGA: "Malagasy Ariary",
        MKD: "Macedonian Denar",
        MMK: "Myanma Kyat",
        MNT: "Mongolian Tugrik",
        MOP: "Macanese Pataca",
        MRO: "Mauritanian Ouguiya",
        MUR: "Mauritian Rupee",
        MVR: "Maldivian Rufiyaa",
        MWK: "Malawian Kwacha",
        MXN: "Mexican Peso",
        MYR: "Malaysian Ringgit",
        MZN: "Mozambican Metical",
        NAD: "Namibian Dollar",
        NGN: "Nigerian Naira",
        NIO: "Nicaraguan Córdoba",
        NOK: "Norwegian Krone",
        NPR: "Nepalese Rupee",
        NZD: "New Zealand Dollar",
        OMR: "Omani Rial",
        PAB: "Panamanian Balboa",
        PEN: "Peruvian Nuevo Sol",
        PGK: "Papua New Guinean Kina",
        PHP: "Philippine Peso",
        PKR: "Pakistani Rupee",
        PLN: "Polish Zloty",
        PYG: "Paraguayan Guarani",
        QAR: "Qatari Rial",
        RON: "Romanian Leu",
        RSD: "Serbian Dinar",
        RUB: "Russian Ruble",
        RWF: "Rwandan Franc",
        SAR: "Saudi Riyal",
        SBD: "Solomon Islands Dollar",
        SCR: "Seychellois Rupee",
        SDG: "Sudanese Pound",
        SEK: "Swedish Krona",
        SGD: "Singapore Dollar",
        SHP: "Saint Helena Pound",
        SLE: "Sierra Leonean Leone",
        SLL: "Sierra Leonean Leone",
        SOS: "Somali Shilling",
        SRD: "Surinamese Dollar",
        STD: "São Tomé and Príncipe Dobra",
        SVC: "Salvadoran Colón",
        SYP: "Syrian Pound",
        SZL: "Swazi Lilangeni",
        THB: "Thai Baht",
        TJS: "Tajikistani Somoni",
        TMT: "Turkmenistani Manat",
        TND: "Tunisian Dinar",
        TOP: "Tongan Paʻanga",
        TRY: "Turkish Lira",
        TTD: "Trinidad and Tobago Dollar",
        TWD: "New Taiwan Dollar",
        TZS: "Tanzanian Shilling",
        UAH: "Ukrainian Hryvnia",
        UGX: "Ugandan Shilling",
        USD: "United States Dollar",
        UYU: "Uruguayan Peso",
        UZS: "Uzbekistan Som",
        VEF: "Venezuelan Bolívar Fuerte",
        VES: "Sovereign Bolivar",
        VND: "Vietnamese Dong",
        VUV: "Vanuatu Vatu",
        WST: "Samoan Tala",
        XAF: "CFA Franc BEAC",
        XAG: "Silver (troy ounce)",
        XAU: "Gold (troy ounce)",
        XCD: "East Caribbean Dollar",
        XDR: "Special Drawing Rights",
        XOF: "CFA Franc BCEAO",
        XPF: "CFP Franc",
        YER: "Yemeni Rial",
        ZAR: "South African Rand",
        ZMK: "Zambian Kwacha (pre-2013)",
        ZMW: "Zambian Kwacha",
        ZWL: "Zimbabwean Dollar",
      }; //TODO Remove this
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

  const handleChange = (event: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = event.target;
    setConversionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ) => {
    event.preventDefault();
    // Perform the conversion logic here
    console.log(conversionData);

    
  };

  return (
    <>
      {console.log(conversionData)}
      <Container>
        <h1 className="text-center mb-4">Bank Misr Currency Exchanger</h1>
        <Form
          onSubmit={handleSubmit}
          className="shadow-md border border-2 row border-primary rounded p-5 my-3"
        >
          <Col sm={6}>
            <Form.Group as={Row} className="mb-3" controlId="amount">
              <Form.Label column sm={2}>
                Amount
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  name="amount"
                  defaultValue={conversionData?.amount}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="amount">
              <Form.Label column sm={2}>
                Rate
              </Form.Label>
              <Col sm={10}>
                <div className="bg-light p-2 rounded">sdfgsdfg</div>
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
                  defaultValue={conversionData?.from}
                  onChange={handleChange}
                  name="from"
                >
                  <option value="">Select Currency</option>
                  {currencies.map((currency) => (
                    <option key={currency.symbol} value={currency.symbol}>
                      {currency.symbol} - {currency.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <img
                className="mx-2"
                src={exchangeIcon}
                width={30}
                height={30}
                alt="exchange Icon"
              />
              <Form.Group className="d-flex flex-grow-1" controlId="toCurrency">
                <Form.Label className="me-2">To</Form.Label>
                <select
                  className="form-control"
                  defaultValue={conversionData?.to}
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
            >
              Convert
            </Button>
            <Row>
              <Col>
                <div>
                  Result:
                  <div className="bg-light p-2 rounded d-inline-block p-2">
                    {" "}
                    {conversionData.amount}
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <Link to="/" className="btn btn-primary w-100">
                    {" "}
                    More Details
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Form>
      </Container>
    </>
  );
};

export default BankMisrCurrencyExchanger;
