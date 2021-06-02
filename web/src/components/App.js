import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditProfile from './EditProfile';
import Login from './Login';
import CreateBook from './CreateBook';
import DetailBook from './DetailBook';
import EditBook from './EditBook';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import ListBooks from './ListBooks';
import ListBorrowedBooks from './ListBorrowedBooks';
import ListOwnedBooks from './ListOwnedBooks';
import TopNavbar from './TopNavbar';

/*
    Componente App que roteia a aplicação utilizando lib react-router-dom
    PrivateRoute para views de privadas e Route para views públicas
*/

function App() {
  return (
    <>
      <AuthProvider>
        <TopNavbar />
        <Container
          className='d-flex align-items-center justify-content-center'
          style={{ minHeight: '100vh' }}
        >
          <div className='w-100' style={{ maxWidth: '400px' }}>
            <Router>
              <Switch>
                <PrivateRoute exact path='/' component={ListBooks} />
                <PrivateRoute
                  path='/update-profile'
                  component={UpdateProfile}
                />
                <PrivateRoute
                  path='/borrowed-books'
                  component={ListBorrowedBooks}
                />
                <PrivateRoute path='/owned-books' component={ListOwnedBooks} />
                <PrivateRoute path='/book/create' component={CreateBook} />
                <PrivateRoute path='/book/:id/edit' component={EditBook} />
                <PrivateRoute path='/edit-profile' component={EditProfile} />
                <Route path='/book/:id' component={DetailBook} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/forgot-password' component={ForgotPassword} />
              </Switch>
            </Router>
          </div>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
