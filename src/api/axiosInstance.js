import axios from 'axios';
import isExpiredToken from '../helpers/isExpiredToken';

let token = localStorage.getItem('user');

function setToken() {
  if (localStorage.getItem('user')) {
    token = localStorage.getItem('user');
  }
}

const instance = axios.create({
  headers: {
    device: 'IPhone',
  },
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

export default instance;
