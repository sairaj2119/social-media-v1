import React from 'react';
import { Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useUserContext } from '../context/userContext';
import Axios from '../utils/axios';

dayjs.extend(relativeTime);

const Comment = ({ comment: { commentor, body, createdAt, id }, postId }) => {
  const queryClient = useQueryClient();
  const {
    userState: { user },
  } = useUserContext();

  const { mutate } = useMutation(
    ({ pid, cid }) => {
      return Axios.delete(`/comments/${pid}/${cid}`);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['comments', postId]);
        const { data } = response;
        console.log(data);
      },
    }
  );
  const handleCommentDelete = () => {
    mutate({ pid: postId, cid: id });
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col sm={10}>
          <div className='d-flex align-items-center'>
            <h5 className='text-success mb-0 mr-2'>{commentor}</h5>
            <p className='m-0 text-muted'>
              <small>
                <i>{dayjs(createdAt).fromNow()}</i>
              </small>
            </p>
          </div>
          <p className='m-0'>{body}</p>
        </Col>
        {user.username === commentor && (
          <Col sm={2}>
            <Button variant='outline-info' size='sm' className='mr-2'>
              <i className='far fa-edit'></i>
            </Button>
            <Button
              variant='outline-danger'
              size='sm'
              onClick={handleCommentDelete}
            >
              <i className='far fa-trash-alt'></i>
            </Button>
          </Col>
        )}
      </Row>
    </ListGroup.Item>
  );
};

export default Comment;
