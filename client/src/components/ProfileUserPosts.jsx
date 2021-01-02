import React from 'react';
import { Row, Col } from 'react-bootstrap';

import useUserPostsQuery from '../hooks/useUserPostsQuery';
import Post from '../components/Post';

const ProfileUserPosts = ({ user }) => {
  const { data: posts, isLoading, isError, error } = useUserPostsQuery(
    user.username
  );

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <Row className='mt-5'>
      {posts.map((post) => (
        <Col sm={12} md={6}>
          <Post post={post} />
        </Col>
      ))}
    </Row>
  );
};

export default ProfileUserPosts;
