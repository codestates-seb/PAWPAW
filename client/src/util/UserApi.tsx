import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const url = '';

interface FetchHook {
  responseData: object | null;
  loading: boolean;
  error: string | null;
}

export const getUserInfo = (id: string): FetchHook => {
  const [responseData, setResponseData] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/pets/${id}`);
        setResponseData(response.data);
      } catch (error) {
        setError(error as never);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { responseData, loading, error };
};

export const petUpdate = async (
  petId: string,
  petname: string,
  age: number,
  gender: string,
  species: string,
  code: number,
  formData: { profileImage: string | Blob },
) => {
  const navigate = useNavigate();
  if (!formData.profileImage) return;
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: jwtToken,
    Refresh: refreshToken,
  };
  const data = new FormData();
  data.append('petName', petname);
  data.append('age', age.toString());
  data.append('species', species);
  data.append('gender', gender);
  data.append('code', code.toString());
  data.append('profileImage', formData.profileImage);
  console.log(data);
  console.log(formData);
  console.log(formData.profileImage);
  for (const key of data.keys()) {
    console.log(key);
  }
  for (const value of data.values()) {
    console.log(value);
  }
  try {
    await axios.post(`${url}/patch/${petId}`, data, { headers });
    navigate('/login');
    // 비동기 에러 날 것 같으면 .then 사용
  } catch (error) {
    console.error('Error', error);
    alert(error);
  }
};

export const petLogout = async () => {
  const headers = {
    Authorization: jwtToken,
    Refresh: refreshToken,
  };
  try {
    await axios.post(`${url}/logout`, { headers });
  } catch (error) {
    console.error('Error', error);
  } finally {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh');
  }
};

export const petDelete = async (id: string) => {
  const navigate = useNavigate();
  const headers = {
    Authorization: jwtToken,
    Refresh: refreshToken,
  };
  try {
    await axios.delete(`${url}/pets/${id}`, { headers });
  } catch (error) {
    console.error('Error', error);
  } finally {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh');
    navigate('/login');
  }
};
