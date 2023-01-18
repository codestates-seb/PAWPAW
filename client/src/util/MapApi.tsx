import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const petId = localStorage.getItem('petId') as string;
const url = '';
const headers = {
  Authorization: jwtToken,
  Refresh: refreshToken,
};

export const mapReviewDELETE = async (reviewid: any) => {
  try {
    await axios.delete(`${url}/maps/review/${reviewid}`, { headers });
    window.location.reload();
  } catch (error) {
    console.error('Error', error);
  }
};

export const mapReviewUPDATE = async (reviewid: any, contents: string) => {
  try {
    await axios.patch(
      `${url}/maps/review/${reviewid}`,
      {
        petId: petId,
        contents: contents,
      },
      { headers },
    );
    window.location.reload();
  } catch (error) {
    console.error('Error', error);
  }
};
