import axios from 'axios';
import headers from './headers';

const petId = localStorage.getItem('petId') as string;
const url = process.env.REACT_APP_API_ROOT;

export const CommunityCommentEdit = async (postId: number, contents: string) => {
  try {
    await axios.post(
      `${url}/posts/comment`,
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

export const CommunityCommentUPDATE = async (postId: number, contents: string) => {
  try {
    await axios.patch(
      `${url}/posts/comment/${postId}`,
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

export const CommunityCommentDELETE = async (postId: number) => {
  try {
    await axios.delete(`${url}/posts/comment/${postId}`, { headers });
  } catch (error) {
    console.error('Error', error);
  }
};

export const PostDELETE = async (postId: number) => {
  try {
    await axios.delete(`${url}/posts/${postId}`, { headers });
  } catch (error) {
    console.error('Error', error);
  }
};
