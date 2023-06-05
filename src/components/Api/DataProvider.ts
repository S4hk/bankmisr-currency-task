import instance from './interceptor';



export const fetchSymbols = async () => {
  try {
    const response = await instance.get('/symbols');
    const symbols = response.data.symbols;
    // console.log(symbols)
    return symbols;
  } catch (error) {
    console.error('Error fetching symbols:', error);
    throw error;
  }
};

export const fetchRates = async (baseCurrency: string, targetCurrency: string) => {
  try {
    const response = await instance.get('/latest', {
      params: {
        base: baseCurrency,
        symbols: targetCurrency,
      },
    });
    const rates = response.data.rates;
    return rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};


export const fetchPopularRates = (base: string) => {
    const symbols = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD'];
    
    return new Promise((resolve, reject) => {
      instance.get('/latest', {
        params: {
          base,
          symbols: symbols.join(','),
        },
      })
        .then(response => {
          const rates = response.data.rates;
          resolve(rates);
        })
        .catch(error => {
          console.error('Error fetching rates:', error);
          reject(error);
        });
    });
  };
  