import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/fixer/',
  headers: {
    // apiKey: 'UGkOR4sJrZgsaCT4rZZM9u6SidK7Ftmh',
    apiKey: '1nJd0ubZ3wO1CMkpYa1b2trGgGLziS9n',
  },
});

export default instance;
