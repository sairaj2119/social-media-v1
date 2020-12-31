import React, { useState, useRef } from 'react';
import {
  Button,
  ListGroup,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
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
  const [edit, setEdit] = useState(false);
  const editCommentRef = useRef();

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
  const { mutate: mutateEditComment } = useMutation(
    ({ pid, cid, body }) => {
      return Axios.put(`/comments/${pid}/${cid}`, { body });
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['comments', postId]);
        const { data } = response;
        setEdit(false);
        console.log(data);
      },
    }
  );
  const handleCommentDelete = () => {
    mutate({ pid: postId, cid: id });
  };
  const handleCommentEdit = () => {
    const value = editCommentRef.current.value;
    if (value.trim() === body) {
      setEdit(false);
      return;
    } else {
      mutateEditComment({ pid: postId, cid: id, body: value });
    }
  };
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      handleCommentEdit();
    }
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
          {!edit && <p className='m-0'>{body}</p>}
          {edit && (
            <InputGroup size='sm' className='mt-1'>
              <FormControl
                onKeyPress={handleEnterPress}
                placeholder='Edit comment'
                defaultValue={body}
                type='text'
                name='editComment'
                aria-label='Edit comment'
                aria-describedby='basic-addon2'
                ref={editCommentRef}
              />
              <InputGroup.Append>
                <Button variant='outline-success' onClick={handleCommentEdit}>
                  <i className='fas fa-check'></i>
                </Button>
                <Button
                  variant='outline-warning'
                  onClick={() => setEdit(false)}
                >
                  <i className='fas fa-times'></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          )}
        </Col>
        {user?.username === commentor && (
          <>
            <Col sm={1}>
              {!edit && (
                <Button
                  variant='outline-info'
                  size='sm'
                  className='mr-2'
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <i className='far fa-edit'></i>
                </Button>
              )}
            </Col>
            <Col sm={1}>
              <Button
                variant='outline-danger'
                size='sm'
                onClick={handleCommentDelete}
              >
                <i className='far fa-trash-alt'></i>
              </Button>
            </Col>
          </>
        )}
      </Row>
    </ListGroup.Item>
  );
};

export default Comment;
