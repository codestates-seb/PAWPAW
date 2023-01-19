import { useState, useEffect } from 'react';
import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const petId = localStorage.getItem('petId') as string;
const url = '';
const headers = {
  Authorization: jwtToken,
  Refresh: refreshToken,
};

export const mapReviewEdit = async (infoMapId: number, contents: string) => {
  try {
    await axios.post(
      `${url}/maps/review`,
      {
        petId: petId,
        infoMapId: infoMapId,
        contents: contents,
      },
      { headers },
    );
  } catch (error) {
    console.error('Error', error);
  }
};

export const mapReviewUPDATE = async (reviewid: number, contents: string) => {
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

export const mapReviewDELETE = async (commentId: number) => {
  try {
    await axios.delete(`${url}/maps/review/${commentId}`, { headers });
    window.location.reload();
  } catch (error) {
    console.error('Error', error);
  }
};

export const getMapReview = async (infoMapId: number) => {
  const [responseData, setResponseData] = useState<object | null>(null);
  useEffect(() => {
    getResponse;
  }, []);

  const getResponse = async () => {
    try {
      const response = await axios.get(`${url}/maps/details/${infoMapId}`, { headers });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };
  return { responseData };
};
