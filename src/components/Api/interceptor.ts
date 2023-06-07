import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/fixer/',
  headers: {
    apiKey: 'LJu485HTyl7FinIA9pd2FAYLixp4xmgv',
    // apiKey: '4TwxRkNqwq5N6w6ZgKbgEn1pBrxUd75p',
  },
});

export default instance;
