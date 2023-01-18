import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const url = '';
const headers = {
  Authorization: jwtToken,
  Refresh: refreshToken,
};

export const mapReviewDelete = async (reviewid: any) => {
  try {
    await axios.delete(`${url}/maps/review/${reviewid}`, { headers });
  } catch (error) {
    console.error('Error', error);
  } finally {
    window.location.reload();
  }
};
