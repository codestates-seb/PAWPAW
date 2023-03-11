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
    const {
      config,
      response: { status },
    } = error;
    const originRequest = config;
    if (status === 401 && error.response.data.message === 'Expired JWT Token') {
      await refresh();
      return axios(originRequest);
    }
    if (status === 400 && error.response.data.message === 'Invalid refresh token') {
      petLogout();
      return window.location.reload();
    }
    if (status === 400 && error.response.data.message === 'Invalid token') {
      petLogout();
      return window.location.reload();
    }
    if (status === 404 && error.response.data.message === 'Refresh token not found') {
      petLogout();
      return window.location.reload();
    }
    return Promise.reject(error);
  },
);
