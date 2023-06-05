import instance from "./interceptor";
import { format , subYears } from "date-fns";

export const fetchSymbols = async () => {
  try {
    const response = await instance.get("/symbols");
    const symbols = response.data.symbols;
    // console.log(symbols)
    return symbols;
  } catch (error) {
    console.error("Error fetching symbols:", error);
    throw error;
  }
};

export const fetchRates = async (
  baseCurrency: string,
  targetCurrency: string
) => {
  try {
    const response = await instance.get("/latest", {
      params: {
        base: baseCurrency,
        symbols: targetCurrency,
      },
    });
    const rates = response.data.rates;
    return rates;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};

export const fetchPopularRates = (base: string) => {
  const symbols = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "NZD",
  ];

  return new Promise((resolve, reject) => {
    instance
      .get("/latest", {
        params: {
          base,
          symbols: symbols.join(","),
        },
      })
      .then((response) => {
        const rates = response.data.rates;
        resolve(rates);
      })
      .catch((error) => {
        console.error("Error fetching rates:", error);
        reject(error);
      });
  });
};
export const fetchHistoricalData = async (
  baseCurrency: string,
  selectedCurrency: string
) => {
  const endDate = format(new Date(), "yyyy-MM-dd");
  const startDate = format(subYears(new Date(), 1), "yyyy-MM-dd");

  try {
    const response = await instance.get("/timeseries", {
      params: {
        start_date: startDate,
        end_date: endDate,
        base: baseCurrency,
        symbols: selectedCurrency,
      },
    });

    const rates = response.data.rates;
    const labels = Object.keys(rates);
    const data = labels.map((date) => rates[date]);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: selectedCurrency.toUpperCase(),
          // data: Array(7).fill(0).map((_, i) => Math.floor(Math.random() * 100)),
          data:data,
          borderColor: 'rgb(135,30,53)',
          backgroundColor: 'rgba(135,30,53, 0.5)',
        },
      ],
    };

    return chartData;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};

