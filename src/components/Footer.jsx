
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white py-4" style={{ backgroundColor: 'purple' }}>
      <Container>
        <Row className='text-center text-md-start'>
          <Col md={4} className="mb-3">
            <h5 className="fw-bold fs-3">ProjectFair</h5>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Quick Links</h6>
            <p>
              <Link to="/" className='text-warning text-decoration-none'>Home</Link> |{' '}
              <Link to="/login" className='text-warning text-decoration-none'>Login</Link> |{' '}
              <Link to="/register" className='text-warning text-decoration-none'>Signup</Link>
            </p>
          </Col>

          <Col md={4}>
            <h6>Contact Us</h6>
            <p>Email: support@projectFair.com</p>
            <p>Phone: +91 9567219352</p>
          </Col>
        </Row>

        <hr className='border-light' />
        <p className="text-center m-0">
          &copy; {new Date().getFullYear()} ProjectFair. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
