import Axios from '../utils/axios';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/userContext';

const Header = () => {
  const {
    userState: { isAuthenticated },
    dispatch,
  } = useUserContext();
  console.log('isAuthenticated is', isAuthenticated);
  const handleLogout = async () => {
    dispatch('UNSET_USER');
    try {
      await Axios.get(`/auth/logout`);
    } catch (error) {
      console.log('error in logout');
    }
  };
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Social Media V1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to='/register'>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to='/login'>
                  Log In
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/profile'>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
