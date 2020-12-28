import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  const history = useHistory();
  return (
    <Card key={post.id} className='mt-3'>
      <Card.Header>
        <div className='d-flex flex-column'>
          <div as='h5'>{post.user.username}</div>
          <div className='text-muted'>{dayjs(post.createdAt).fromNow()}</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title
          style={{ cursor: 'pointer' }}
          onClick={() => history.push(`/posts/${post.id}`)}
          as='h3'
        >
          {post.title}
        </Card.Title>
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

export default Post;
