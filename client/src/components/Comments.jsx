import React from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { useUserContext } from '../context/userContext';
import { useForm } from '../hooks/useForm';
import Axios from '../utils/axios';
import Comment from './Comment';
import LoadingButton from './LoadingButton';

const Comments = ({ postId }) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    userState: { isAuthenticated },
  } = useUserContext();
  const [values, handleChange, setValues] = useForm({ comment: '' });

  const fetchComments = async ({ pageParam = 0 }) => {
    const { data } = await Axios.get(`comments/${postId}?cursor=${pageParam}`);
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(['comments', postId], fetchComments, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  const { mutate, isLoading: mIsLoading } = useMutation(
    ({ body }) => {
      return Axios.post(`/comments/${postId}`, { body });
    },
    {
      onSuccess: () => {
        setValues({ comment: '' });
        queryClient.invalidateQueries(['comments', postId]);
      },
    }
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated)
      return history.push(`/login?redirect=posts/${postId}`);
    mutate({ body: values.comment });
  };

  const handleInputFocus = () => {
    if (!isAuthenticated)
      return history.push(`/login?redirect=posts/${postId}`);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;
  console.log(data);

  return (
    <>
      <Form inline className='pt-3' onSubmit={handleComment}>
        <Form.Label htmlFor='inlineFormInputName2' srOnly>
          comment
        </Form.Label>
        <Form.Control
          className='mb-2 mr-sm-2'
          id='inlineFormInputName2'
          placeholder='Comment'
          name='comment'
          value={values.comment}
          onChange={handleChange}
          onFocus={handleInputFocus}
        />
        <LoadingButton
          type='submit'
          className='mb-2'
          disabled={values.comment.trim() === ''}
          isLoading={mIsLoading}
        >
          Submit
        </LoadingButton>
      </Form>
      <ListGroup variant='flush'>
        {data.pages[0].data.map((comment) => (
          <Comment postId={postId} comment={comment} key={comment.id} />
        ))}
      </ListGroup>
      <Button onClick={() => fetchNextPage()}>Load More</Button>
    </>
  );
};

export default Comments;
