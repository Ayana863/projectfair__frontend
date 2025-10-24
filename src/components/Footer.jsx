

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (

    <>
    
    
    
   
    <br />
    <footer
      style={{
        backgroundColor: 'purple',
        padding: '20px 0',
        marginTop: 'auto',
        color:'white'
      }}
    >
      <Container>
        <Row>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5 style={{fontSize:30, fontWeight: 'bold' }}>ProjectFair</h5>
          
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h6>Quick Links</h6>
            <p>
              <a href="/" style={linkStyle}>Home</a> |{' '}
              <a href="/login" style={linkStyle}>Login</a> |{' '}
              <a href="/register" style={linkStyle}>Signup</a>
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h6>Contact Us</h6>
            <p>Email: support@projectFair.com</p>
            <p>Phone: +91 9567219352</p>
          </Col>
        </Row>
        <hr />
        <p className="text-center" style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} ProjectFair. All rights reserved.
        </p>
      </Container>
    </footer>
    </>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: 'Red',
  fontWeight: '500',
};

export default Footer;



