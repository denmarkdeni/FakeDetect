import axios from 'axios';

const token = localStorage.getItem('token');

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Authorization: token ? `Token ${token}` : '',
  },
});

export default API;

