import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useForm } from '../hooks/useForm';
import { URL } from '../utils/constants';

const Login = () => {
  const history = useHistory();
  const [values, handleChange] = useForm({ email: '', password: '' });
  const [error, setError] = useState('');

  const { mutate, isLoading } = useMutation(
    (values) => {
      return axios.post(`${URL}/auth/login`, values, { withCredentials: true });
    },
    {
      onSuccess: (data) => {
        setError('');
        history.push('/');
        console.log(data);
      },
      onError: (err) => {
        setError(err.response.data.error);
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(values);
  };

  if (isLoading) {
    return <h1>This is the puppy song eeee</h1>;
  }

  return (
    <Form validated={false} className='mt-3' noValidate onSubmit={handleLogin}>
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
          {error && <Form.Text className='text-danger'>{error}</Form.Text>}
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
          {error && <Form.Text className='text-danger'>{error}</Form.Text>}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default Login;
