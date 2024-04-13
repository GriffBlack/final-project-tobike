import { authClient } from './client';

const getToken = () => {
    const get = localStorage.getItem('auth-token');
    console.log(get);
  return localStorage.getItem('auth-token');
};

const setToken = (token) => {
    authClient();
    console.log(token);
  return localStorage.setItem('auth-token', token);
};

const removeToken = () => {
  return localStorage.removeItem('auth-token');
};

export { getToken, setToken, removeToken };