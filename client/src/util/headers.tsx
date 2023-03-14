const jwtToken = localStorage.getItem('Authorization');

const headers = {
  Authorization: jwtToken,
  'Content-Type': 'application/json',
};

export default headers;
