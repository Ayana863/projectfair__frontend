import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../assets/navlogo.png'


function Header() {
  return (
   
    <>
     <Navbar style={{backgroundColor:'purple'}}>
        <Container>
        <Link style={{textDecoration:'none'}} to={'/'}> <Navbar.Brand >
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{'  '}
         <span style={{marginLeft:20,fontWeight:'bold'}}>  PROJECT FAIR</span>
          </Navbar.Brand></Link>
        </Container>
      </Navbar>
    
    </>
  )
}

export default Header