import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

dayjs.extend(relativeTime);

const Home = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:5000/posts');
      console.log(data);
      setPosts(data);
    })();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id}>
          <Card.Header>
            <div className='d-flex flex-column'>
              <div as='h5'>{post.user.username}</div>
              <div className='text-muted'>
                {dayjs(post.createdAt).fromNow()}
              </div>
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
      ))}
    </div>
  );
};

export default Home;
