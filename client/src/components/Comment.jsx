import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Comment = () => {
  return (
    <ListGroup.Item>
      <div className='d-flex align-items-center'>
        <h5 className='text-success mb-0 mr-2'>username</h5>
        <p className='m-0 text-muted'>
          <small>
            <i>1 min ago</i>
          </small>
        </p>
      </div>
      <p className='m-0'>comment text</p>
    </ListGroup.Item>
  );
};

export default Comment;
