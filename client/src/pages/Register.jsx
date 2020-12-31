import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import Axios from '../utils/axios';
import { useUserContext } from '../context/userContext';
import { useForm } from '../hooks/useForm';

const Register = () => {
  const history = useHistory();
  const {
    userState: { isAuthenticated },
  } = useUserContext();
  const [values, handleChange] = useForm({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmPassError, setConfirmPassError] = useState('');
  const { location } = history;
  const redirect = location.search.split('=')[1] || '';

  useEffect(() => {
    if (isAuthenticated) history.push(`/${redirect}`);
  }, [isAuthenticated, history, redirect]);

  console.log('errors are', errors);

  const { mutate, isLoading } = useMutation(
    (values) => {
      return Axios.post(`/auth/register`, values);
    },
    {
      onMutate: () => {
        if (values.password !== values.confirmPassword) {
          setConfirmPassError('passwords do not match');
        }
      },
      onSuccess: (response) => {
        setErrors({ username: '', email: '', password: '' });
        const { data } = response;
        console.log(data);
        history.push(`/login`);
      },
      onError: (err) => {
        console.log('before update', errors);
        setErrors({ ...errors, ...err.response.data });
        console.log('after update', errors);
      },
    }
  );

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(values);
    mutate(values);
  };

  return (
    <Form className='mt-3' onSubmit={handleSignup} noValidate>
      <h1 className='text-primary mb-4'>Sign Up</h1>
      <div style={{ maxWidth: '400px', marginRight: 'auto' }}>
        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={values.username}
            onChange={handleChange}
            placeholder='Enter username'
          />
          {errors.username && (
            <Form.Text className='text-danger'>{`**${errors.username}`}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            placeholder='Enter email'
          />
          {errors.email && (
            <Form.Text className='text-danger'>{`**${errors.email}`}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='Password'
          />
          {errors.password && (
            <Form.Text className='text-danger'>{`**${errors.password}`}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder='Password'
          />
          {confirmPassError && (
            <Form.Text className='text-danger'>{`**${confirmPassError}`}</Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
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

export default Register;
