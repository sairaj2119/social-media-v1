import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useForm } from '../hooks/useForm';
import { URL } from '../utils/constants';
import { useUserContext } from '../context/userContext';

const Login = () => {
  const history = useHistory();
  const [userState, dispatch] = useUserContext();
  const [values, handleChange] = useForm({ email: '', password: '' });
  const [error, setError] = useState('');

  const { mutate, isLoading } = useMutation(
    (values) => {
      return axios.post(`${URL}/auth/login`, values, { withCredentials: true });
    },
    {
      onSuccess: (__response) => {
        const { data } = __response;
        setError('');
        dispatch({ type: 'SET_USER', payload: data });
        history.push('/');
        console.log(data);
      },
      onError: (err) => {
        setError(err.response.data.error);
      },
    }
  );

  console.log('userState is', userState);

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Form className='mt-3' noValidate onSubmit={handleLogin}>
      <h1 className='text-primary mb-4'>Log In</h1>
      <div style={{ maxWidth: '400px', marginRight: 'auto' }}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name='email'
            value={values.email}
            type='email'
            placeholder='Enter email'
            onChange={handleChange}
          />
          {error && (
            <Form.Text className='text-danger'>{`**${error}`}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            value={values.password}
            type='password'
            placeholder='Password'
            onChange={handleChange}
          />
          {error && (
            <Form.Text className='text-danger'>{`**${error}`}</Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' disabled={isLoading} type='submit'>
          {isLoading && (
            <Spinner
              as='span'
              animation='grow'
              size='sm'
              role='status'
              aria-hidden='true'
              className='mr-2'
            />
          )}
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default Login;
