import React, { useState } from 'react';
import { Col, Row, Container, Form, Spinner } from 'react-bootstrap';
import login from '../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { registerAPI, userLoginAPI } from '../../Serveices/allAPI';

function Auth({ insideregister }) {
  const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.email && userDetails.password) {
      try {
        const result = await registerAPI(userDetails);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data.username}, please login to explore our website`);
          setUserDetails({ username: "", email: "", password: "" });
          navigate('/login');
        } else if (result.status === 406) {
          toast.warn(result.response.data);
          setUserDetails({ username: "", email: "", password: "" });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Please complete all fields");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (userDetails.email && userDetails.password) {
      try {
        const result = await userLoginAPI(userDetails);
        if (result.status === 200) {
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("users", JSON.stringify(result.data.users));
          setIsLogin(true);
          setTimeout(() => {
            setIsLogin(false);
            setUserDetails({ username: "", email: "", password: "" });
            navigate('/');
          }, 2000);
        } else if (result.status === 404) {
          toast.error(result.response.data);
        }
      } catch (err) {
        toast.error("Invalid email or password");
      }
    } else {
      toast.warning("Please enter Email and Password");
    }
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="card shadow p-4 p-md-5">
              <Row className="align-items-center">
                <Col xs={12} md={5} className="text-center mb-4 mb-md-0">
                  <img src={login} alt="Login" className="img-fluid" />
                </Col>
                <Col xs={12} md={7}>
                  <h2 className="text-warning text-center text-md-start">Project Fair</h2>
                  <h4 className="mt-3 text-center text-md-start">
                    <span style={{ color: 'lightblue' }}>Sign {insideregister ? 'Up' : 'In'}</span> to your Account
                  </h4>

                  <Form className="mt-4">
                    {insideregister && (
                      <Form.Floating className="mb-3">
                        <Form.Control
                          id="floatingInputName"
                          type="text"
                          placeholder="Username"
                          value={userDetails.username}
                          onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
                        />
                        <Form.Label htmlFor="floatingInputName">Enter Username</Form.Label>
                      </Form.Floating>
                    )}

                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputEmail"
                        type="email"
                        placeholder="name@example.com"
                        value={userDetails.email}
                        onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                      />
                      <Form.Label htmlFor="floatingInputEmail">Enter valid Email</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputPassword"
                        type="password"
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
                      />
                      <Form.Label htmlFor="floatingInputPassword">Enter Password</Form.Label>
                    </Form.Floating>

                    {insideregister ? (
                      <>
                        <button onClick={handleSignUp} className='btn btn-warning w-100 mt-3'>Sign Up</button>
                        <p className="mt-3 text-center">
                          Already have an account? <Link to={'/login'}>Login</Link>
                        </p>
                      </>
                    ) : (
                      <>
                        <button onClick={handleSignIn} className='btn btn-warning w-100 mt-3'>
                          Sign In {isLogin && <Spinner animation="border" size="sm" className="ms-2" />}
                        </button>
                        <p className="mt-3 text-center">
                          Don't have an account yet? <Link to={'/register'}>Register</Link>
                        </p>
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </>
  );
}

export default Auth;
