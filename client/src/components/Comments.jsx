import React from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Comment from './Comment';

const Comments = () => {
  return (
    <>
      <Form inline className='pt-3'>
        <Form.Label htmlFor='inlineFormInputName2' srOnly>
          comment
        </Form.Label>
        <Form.Control
          className='mb-2 mr-sm-2'
          id='inlineFormInputName2'
          placeholder='Comment'
        />
        <Button type='submit' className='mb-2'>
          Submit
        </Button>
      </Form>
      <ListGroup variant='flush'>
        <Comment />
        <Comment />
        <Comment />
      </ListGroup>
    </>
  );
};

export default Comments;
