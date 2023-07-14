import axios from 'axios';
import { getToken } from './token';

const API_URL = 'https://sf-final-project-be.herokuapp.com/api/';

export const client = axios.create({
//   withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = () => {
    return axios.create({
    // withCredentials: true,
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
  });
};
