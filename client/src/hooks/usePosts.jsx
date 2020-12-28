import { useQuery } from 'react-query';
import axios from 'axios';

import { URL } from '../utils/constants';

const getPosts = async () => {
  const { data } = await axios.get(`${URL}/posts`);
  return data;
};

export default function usePosts() {
  return useQuery('posts', getPosts);
}
