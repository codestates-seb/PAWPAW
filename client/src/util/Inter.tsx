import axios from 'axios';
import { petLogout } from './UserApi';

const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const url = process.env.REACT_APP_API_ROOT;

const refresh = async () => {
  const headers = {
    Authorization: jwtToken,
  };
  try {
    const response = await axios.post(
      `${url}/reissue`,
      {
        accessToken: jwtToken,
        refreshToken: refreshToken,
      },
      { headers },
    );
    localStorage.setItem('Authorization', response.headers.authorization as string);
    localStorage.setItem('Refresh', response.headers.refresh as string);
  } catch (error) {
    console.error('Error', error);
  }
};

export const axiosRefresh = axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.message === 'Expired JWT Token' && !originalRequest._retry) {
      originalRequest._retry = true;
      await refresh();
      originalRequest;
      return window.location.reload();
    }
    if (error.response.data.message === 'Invalid refresh token' && 'Refresh token not found') {
      petLogout();
      return window.location.reload();
    }
    return Promise.reject(error);
  },
);
