import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
// axios.defaults.headers.common['Authorization'] = `${jwtToken}`;
// axios.defaults.headers.common['Refresh'] = `${refreshToken}`;
const url = '';

export const petUpdate = async (
  petId: string,
  petname: string,
  age: number,
  gender: string,
  species: string,
  address: string,
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
  data.append('address', address);
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

export const petDelete = async (id: string) => {
  const headers = {
    Authorization: jwtToken,
    Refresh: refreshToken,
  };
  try {
    await axios.delete(`${url}/pets/${id}`, { headers });
  } catch (error) {
    console.error('Error', error);
  }
};
