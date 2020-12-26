import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/Home';
import Header from './components/Header';
import PostDetail from './pages/PostDetail';

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className='row py-3'>
          <div className='col-lg-9'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/posts/:pid' exact component={PostDetail} />
            </Switch>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;
