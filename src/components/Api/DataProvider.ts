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
