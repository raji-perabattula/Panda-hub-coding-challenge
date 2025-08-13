import axios from 'axios';
import Constants from 'expo-constants';
import { API_BASE_URL } from '../../constants/BaseUrls';

const API_KEY = Constants.expoConfig?.extra?.api_key;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = API_KEY;
  config.params['language'] = 'en-US';
  return config;
});

export default api;