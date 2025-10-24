import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/navlogo.png';

function Header() {
  return (
    <Navbar expand="md" style={{ backgroundColor: 'purple' }}>
      <Container>
        <Link to="/" className='text-decoration-none'>
          <Navbar.Brand className="text-white fw-bold d-flex align-items-center">
            <img 
              alt=""
              src={logo}
              width="35"
              height="35"
              className="me-2"
            />
            PROJECT FAIR
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  )
}

export default Header
