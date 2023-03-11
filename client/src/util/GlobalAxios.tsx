import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const url = process.env.REACT_APP_API_ROOT;

const Logout = async () => {
  localStorage.removeItem('Authorization');
  localStorage.removeItem('Refresh');
  localStorage.removeItem('petId');
  localStorage.removeItem('code');
  localStorage.removeItem('check');
  localStorage.removeItem('Admin');
};
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
      await Logout();
      window.location.reload();
    }
    if (status === 400 && error.response.data.message === 'Invalid token') {
      await Logout();
      window.location.reload();
    }
    if (status === 404 && error.response.data.message === 'Refresh token not found') {
      await Logout();
      window.location.reload();
    }
    if (status === 401 && error.response.data.message === 'Unauthorized') {
      await Logout();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
