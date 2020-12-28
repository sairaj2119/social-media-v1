import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import usePost from '../hooks/usePost';

dayjs.extend(relativeTime);

const PostDetail = () => {
  const { pid } = useParams();
  const { isLoading, isError, data: post, error } = usePost(pid);

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card key={post.id} className='mt-3'>
      <Card.Header>
        <div className='d-flex flex-column'>
          <div as='h5'>{post.user.username}</div>
          <div className='text-muted'>{dayjs(post.createdAt).fromNow()}</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title as='h3'>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <Card.Link>
          <Button variant='primary'>
            <span className='mr-1'>{post.likesCount}</span>{' '}
            <i className='fas fa-thumbs-up'></i>
          </Button>
        </Card.Link>
        <Card.Link as={Link} to={`/posts/${post.id}`}>
          <Button variant='primary'>
            <span className='mr-1'>{post.commentsCount}</span>{' '}
            <i className='fas fa-comment'></i>
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default PostDetail;
