import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';

const Header = () => {

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/", { replace: true })
    console.log(auth);
  }


  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Fake Mail</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {auth.isLoggedIn && <Navbar.Text>
              Signed in as: <a href="/Profile">{auth.email.split('@')[0]}</a>
            </Navbar.Text>}
          </Navbar.Collapse>
        </Container>
        {auth.isLoggedIn && <Button variant="warning" style={{marginLeft: '1rem'}} onClick={logoutHandler}>Logout</Button>}
      </Navbar>
    </div>
  )
}

export default Header
