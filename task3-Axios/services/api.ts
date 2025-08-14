import axios from 'axios';

// All requests share the same baseURL and timeout
// Updating headers, interceptors, or timeouts happens in one place
// Other services can reuse this

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', //using this jsonplaceholder API for demonstration
    timeout: 5000,
});

export default api;
