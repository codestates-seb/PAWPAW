const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');

const headers = {
  'Content-Type': 'application/json',
  Authorization: jwtToken,
  Refresh: refreshToken,
};

export default headers;
