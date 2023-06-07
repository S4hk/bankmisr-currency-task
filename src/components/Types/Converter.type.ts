export interface converter {
  amount: number;
  from: string;
  to: string;
}

export interface Currency {
  symbol: string;
  name: string;
}

export interface FormControlElement {
  value: string | number;
  name: string;
}

