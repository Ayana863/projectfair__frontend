
import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import home from '../assets/homeImg.png';
import ProjectCard from '../components/ProjectCard';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import face1 from '../assets/face1.png';
import face2 from '../assets/face2.png';
import face3 from '../assets/face3.png';
import { ToastContainer, toast } from 'react-toastify';
import { getHomeprojectAPI } from '../../Serveices/allAPI';

function Home() {
  const [getHomeProjectData, setGetHomeProjectData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHomeproject();
  }, []);

  const getHomeproject = async () => {
    try {
      const result = await getHomeprojectAPI();
      if (result.status === 200) {
        setGetHomeProjectData(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAllProjects = () => {
    if (sessionStorage.getItem('token')) {
      navigate('/projects');
    } else {
      toast.warning('Please login');
    }
  };

  return (
    <>
      <Container className="mt-5">
        {/* Hero Section */}
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h1 className="mb-3">PROJECT FAIR</h1>
            <p className="text-muted">
              Turn your ideas into impact! ProjectFair is a smart project showcase platform
              where students, freelancers, and professionals can display their best work 
             and attract real opportunities from companies and clients.
            </p>

            {sessionStorage.getItem('token') ? (
              <Link to="/dashboard" className="text-decoration-none">
                <Button variant="danger" className="fw-bold mt-3">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register" className="text-decoration-none">
                <Button variant="danger" className="fw-bold mt-3">
                  Manage your projects
                </Button>
              </Link>
            )}
          </Col>

          <Col md={6} className="text-center mt-4 mt-md-0">
            <img src={home} alt="Home" className="img-fluid" style={{ maxHeight: 400 }} />
          </Col>
        </Row>

        {/* Projects Section */}
        <h3 className="text-center text-primary mt-5 mb-4">EXPLORE OUR PROJECTS</h3>
        <Row className="g-3 justify-content-center mb-4">
          {getHomeProjectData.length > 0 &&
            getHomeProjectData.map((project) => (
              <Col key={project._id} xs={12} sm={6} md={4} lg={3}>
                <ProjectCard Displaydata={project} />
              </Col>
            ))}
        </Row>

        <div className="text-center mb-5">
          <Button variant="outline-primary" onClick={handleAllProjects}>
            Click here to view more projects
          </Button>
        </div>

        {/* Testimonial Section */}
        <h3 className="text-center text-primary mb-4">Our Testimonial</h3>
      <Row className="g-4 justify-content-center">
  {[face3, face2, face1].map((face, idx) => (
    <Col key={idx} xs={12} sm={6} md={4}>
      <Card className="shadow rounded-5 h-100 text-center">
        <Card.Img variant="top" src={face} />
        <Card.Body>
          <Card.Title>
            {idx === 0 ? 'Nita Marry' : idx === 1 ? 'Max Miller' : 'Devid Surya'}
          </Card.Title>
          <div className="mb-3">
            {[...Array(4)].map((_, i) => (
              <i key={i} className="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
            ))}
          </div>
          <Card.Text>
            {idx === 0
              ? "ProjectFair helped me easily showcase my work and boost my visibility."
              : idx === 1
              ? "A smooth experience! Managing and updating my projects is super simple."
              : "Loved it! A great platform to present skills and attract opportunities."}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

      </Container>

      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </>
  );
}

export default Home;
