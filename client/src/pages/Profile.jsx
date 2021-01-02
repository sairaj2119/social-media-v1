import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileUserInfo from '../components/ProfileUserInfo';
import ProfileUserPosts from '../components/ProfileUserPosts';

import useUserQuery from '../hooks/useUserQuery';

const Profile = () => {
  const { username } = useParams();
  const { data: user, isLoading, isError, error } = useUserQuery(username);

  if (isError) return <h1>{error.message}...</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className='mt-4'>
      <ProfileUserInfo user={user} />
      <ProfileUserPosts user={user} />
    </div>
  );
};

export default Profile;
