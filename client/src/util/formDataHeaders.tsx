const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: jwtToken,
  Refresh: refreshToken,
};

export default headers;
