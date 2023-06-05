import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/fixer/',
  headers: {
    // apiKey: 'UGkOR4sJrZgsaCT4rZZM9u6SidK7Ftmh',
    apiKey: 'CVuffhwQpqQiR4sCgKBcwDFtQWhjoaJi',
  },
});

export default instance;
