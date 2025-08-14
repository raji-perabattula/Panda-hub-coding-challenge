import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', //using this jsonplaceholder API for demonstration
  timeout: 5000,
});

export default api;
