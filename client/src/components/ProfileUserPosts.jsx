import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ProfileUserPosts = ({ posts }) => {
  const history = useHistory();

  return (
    <Row className='mt-5'>
      {posts.map((post) => (
        <Col sm={12} md={6}>
          <Card key={post.id} className='mt-3'>
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
                <strong className='mr-1'>{post.likesCount}</strong>
                likes
              </Card.Link>
              <Card.Link>
                <strong className='mr-1'>{post.commentsCount}</strong>
                comments
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProfileUserPosts;
