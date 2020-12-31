import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './pages/Home';
import Header from './components/Header';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

const App = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const paths = ['/'];

  return (
    <>
      <Header />
      <Container>
        {!paths.includes(pathname) && (
          <div className='row py-3 mt-3'>
            <div className='col-lg-2'>
              <Button
                variant='outline-secondary'
                size='sm'
                onClick={() => history.goBack()}
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
        <div className='row'>
          <div className='col-lg-9'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/posts/:pid' exact component={PostDetail} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/new/post' exact component={CreatePost} />
              <Route path='/edit/posts/:pid' exact component={EditPost} />
            </Switch>
          </div>
        </div>
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
