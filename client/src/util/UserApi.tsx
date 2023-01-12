import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
axios.defaults.headers.common['Authorization'] = `${jwtToken}`;
axios.defaults.headers.common['Refresh'] = `${refreshToken}`;
const url = 'http://localhost:8080';

export const memberUpdate = async (
  id: string,
  petname: string,
  age: string,
  gender: string,
  address: string,
) => {
  try {
    await axios.patch(`${url}/pets/${id}`, {
      petname: petname,
      age: age,
      gender: gender,
      address: address,
      profileImage: '',
    });
    window.location.reload();
  } catch (error) {
    console.error('Error', error);
  }
};

export const memberDelete = async (id: string) => {
  try {
    await axios.delete(`${url}/pets/${id}`);
  } catch (error) {
    console.error('Error', error);
  }
};
