import { getToken } from '../services/token';

export const checkAuth = (userData, userStatus) => {
  if (userStatus === 'resolved') return true;

  if (userStatus === 'pending' && getToken() && !userData) return true;

  if (userStatus === 'rejected') return false;

  return false;
};
