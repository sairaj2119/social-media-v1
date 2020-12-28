import { useQuery } from 'react-query';
import axios from 'axios';

import { URL } from '../utils/constants';

const getPostById = async (postId) => {
  const { data } = await axios.get(`${URL}/posts/${postId}`);
  return data;
};

export default function usePost(postId) {
  return useQuery(['post', postId], () => getPostById(postId));
}
