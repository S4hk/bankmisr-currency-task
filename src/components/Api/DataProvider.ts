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
    
    // giving me the final day of the month
    const transformedData = Object.entries(rates).reduce((result: { [key: string]: any }, [date, rate]) => {
        const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
        const key = `${year}-${month}`;
        
        if (!result[key] || day > result[key].split('-')[2]) {
          result[key] = date;
        }
        
        return result;
      }, {});
      
      const new_obj: { [key: string]: number } = {};
    // replace the day of the month with it's rate
      for (const key in transformedData) {
          if (transformedData.hasOwnProperty(key)) {
              const value = transformedData[key];
              if (value in rates) {
                  new_obj[key] = rates[value]["USD"] ;
              }
          }
      }


    const labels = Object.keys(new_obj);
    const data = Object.values(new_obj);




    const chartData = {
      labels: labels,
      datasets: [
        {
          label: selectedCurrency.toUpperCase(),
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

