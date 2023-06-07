import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/fixer/',
  headers: {
    // apiKey: '4TwxRkNqwq5N6w6ZgKbgEn1pBrxUd75p',
    // apiKey: 'CVuffhwQpqQiR4sCgKBcwDFtQWhjoaJi',
  },
});

export default instance;
