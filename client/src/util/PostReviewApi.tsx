import axios from 'axios';
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const petId = localStorage.getItem('petId') as string;
const url = process.env.REACT_APP_API_ROOT;
const headers = {
  Authorization: jwtToken,
  Refresh: refreshToken,
};

export const PostReviewEdit = async (postId: number, contents: string) => {
  try {
    await axios.post(
      `${url}/post/comment`,
      {
        petId: petId,
        postId: postId,
        contents: contents,
      },
      { headers },
    );
  } catch (error) {
    console.error('Error', error);
  }
};

export const PostReviewUPDATE = async (postId: number, contents: string) => {
  try {
    await axios.patch(
      `${url}/post/comment/${postId}`,
      {
        petId: petId,
        contents: contents,
      },
      { headers },
    );
  } catch (error) {
    console.error('Error', error);
  }
};

export const PostReviewDELETE = async (postId: number) => {
  try {
    await axios.delete(`${url}/post/comment/${postId}`, { headers });
  } catch (error) {
    console.error('Error', error);
  }
};

export const PostDELETE = async (postId: number) => {
  try {
    await axios.delete(`${url}/post/${postId}`, { headers });
  } catch (error) {
    console.error('Error', error);
  }
};
