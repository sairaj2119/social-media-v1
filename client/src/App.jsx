import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './pages/Home';
import Header from './components/Header';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();

const App = () => {
  const history = useHistory();
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Header />
        <Container>
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
          <div className='row'>
            <div className='col-lg-9'>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/posts/:pid' exact component={PostDetail} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
              </Switch>
            </div>
          </div>
        </Container>
      </>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
