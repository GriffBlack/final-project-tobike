import axios from 'axios';
import { getToken } from './token';

const APP_API_URL = 'https://sf-final-project-be.herokuapp.com/api/';

export const client = axios.create({
  baseURL: APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = () => {
  return axios.create({
    baseURL: APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
  });
};
