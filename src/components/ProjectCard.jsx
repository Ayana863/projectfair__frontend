import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import SERVER_URL from '../../Serveices/server_url';

function ProjectCard({ Displaydata }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
 
      <Card
        onClick={handleShow}
        className="shadow-sm mx-auto"
        style={{ width: '100%', maxWidth: '280px', cursor: 'pointer' }}
      >
        <Card.Img
          variant="top"
          src={`${SERVER_URL}/Uploads/${Displaydata?.projectImg}`}
          className="img-fluid"
          alt="Project"
          style={{ height: '180px', objectFit: 'cover' }}
        />

        <Card.Body className="text-center">
          <Card.Title className="fw-bold text-primary text-wrap">
            {Displaydata?.title}
          </Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fw-bold">
            Project Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="align-items-center text-center text-md-start">

            {/* Project Image */}
            <Col xs={12} md={5} className="mb-3 mb-md-0">
              <img
                src={`${SERVER_URL}/Uploads/${Displaydata?.projectImg}`}
                alt="Project"
                className="img-fluid rounded"
                style={{ maxHeight: '250px', objectFit: 'cover' }}
              />
            </Col>

            {/* Project Details */}
            <Col xs={12} md={7}>
              <h5 className="fw-bold text-primary text-wrap">
                {Displaydata?.title}
              </h5>

              <p className="mb-2">
                <strong>Language:</strong> {Displaydata?.language}
              </p>

              <p
                className="text-secondary"
                style={{ fontSize: '15px', textAlign: 'justify' }}
              >
                <strong>Overview:</strong> {Displaydata?.overview}
              </p>
            </Col>
          </Row>
        </Modal.Body>

        {/* Action Buttons */}
        <Modal.Footer className="justify-content-center gap-3">
          <Button
            href={Displaydata?.github}
            target="_blank"
            className="d-flex align-items-center gap-2"
            variant="dark"
          >
            <i className="fa-brands fa-github"></i> Github
          </Button>

          <Button
            href={Displaydata?.website}
            target="_blank"
            className="d-flex align-items-center gap-2"
            variant="primary"
          >
            <i className="fa-solid fa-globe"></i> Live
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;
