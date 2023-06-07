export interface converter {
  amount: number;
  from: string;
  to: string;
}

export interface Currency {
  symbol: string;
  name: string;
}
export interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  currencyOptions: JSX.Element[];
}
export interface FormControlElement {
  value: string | number;
  name: string;
}

export interface MoreDetailsBtnProps {
  conversionData: converter;
  isConvertDisabled: boolean;
}

