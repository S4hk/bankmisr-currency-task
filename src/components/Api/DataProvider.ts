import instance from "./interceptor";
import { format , subYears } from "date-fns";



/**
 * Fetches the symbols.
 * return The symbols list for athe converter dropdown .
 */
export const fetchSymbols = async () => {
  try {
    const response = await instance.get("/symbols");
    const symbols = response.data.symbols;
    return symbols;
  } catch (error) {
    console.error("Error fetching symbols:", error);
    throw error;
  }
};


/**
 * Fetches the  Rates.
 * return The the rate of the  two currencies passed to it.
 */
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
/**
 * Fetches the Popular Rates.
 * return The the rate of the  9  symbols for the rates grid .
 */


export const fetchPopularRates = async (base: string) => {
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

  try {
    const response = await instance.get("/latest", {
      params: {
        base,
        symbols: symbols.join(","),
      },
    });
    const rates = response.data.rates;
    return rates;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};


/**
 * Fetches the  Historical Data.
 * 
 * 
 */
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



    // return The the rate of the  two currancies for last 12 monthes 
    const rates = response.data.rates; 
    
    
  /**    reduce the response to return the lasst day 
    of every month return object of {month:last day}*/


    const monthsLastDay = Object.entries(rates).reduce((result: { [key: string]: string;}, [date, rate]) => {
        const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
        const key = `${year}-${month}`;
        
        if (!result[key] || day > result[key].split('-')[2]) {
          result[key] = date;
        }
        
        return result;
      }, {});
      
      // new object to push transfromed data in from the loop
      const new_obj: { [key: string]: number } = {};

      /** looping throught the months last days to change the day 
       with it's rate  then push to the new object  {month?:lastddayrate}*/
   
      for (const key in monthsLastDay) {
          if (monthsLastDay.hasOwnProperty(key)) {
              const value = monthsLastDay[key];
              if (value in rates) {
                  new_obj[key] = rates[value][selectedCurrency] ;
              }
          }
      }


// make the object of Chartjs Line chart
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

