import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Register = () => {
  return (
    <Form className='mt-3'>
      <h1 className='text-primary mb-4'>Sign Up</h1>
      <div style={{ maxWidth: '400px', marginRight: 'auto' }}>
        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter username' />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>

        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default Register;
