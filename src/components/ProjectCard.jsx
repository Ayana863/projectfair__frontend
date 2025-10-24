// // import React from 'react'
// // import Card from 'react-bootstrap/Card';


// // import Button from 'react-bootstrap/Button';
// // import Modal from 'react-bootstrap/Modal';
// // import { useState } from 'react';
// // import { Col, Row } from 'react-bootstrap';
// // import folderimg from '../assets/folderimg.png'


// // function ProjectCard({ Displaydata }) {
// //   const handleShow = () => setShow(true);
// //   const [show, setShow] = useState(false);

// //   const handleClose = () => setShow(false);
// //   return (
// //     <>


// //       <Card onClick={handleShow} style={{ width: '18rem', marginTop: '50px' }} className="shadow-sm" >
// //         <Card.Img
// //           variant="top"
// //           src={folderimg}
// //           alt="Card image"
// //         />
// //         <Card.Body >
// //           <Card.Title className="fw-bold">{Displaydata?.title}</Card.Title>

// //         </Card.Body>
// //       </Card>

// //       <Modal show={show} onHide={handleClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title style={{ marginLeft: 130 }}>Project Details</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>

// //           <div className='d-flext justify-content-center ms-5'>
// //             <Row>
// //               <Col> <div><img style={{ marginLeft: -50 }} src={folderimg} alt="" width={200} /></div></Col>
// //               <Col>
// //                 <div>
// //                   <h1 style={{ fontSize: 30 }}>{Displaydata?.title}</h1>
// //                   <h3 style={{ fontSize: 20 }}>{Displaydata?.language}</h3>
// //                   <p style={{ fontSize: 10 }}>{Displaydata?.overview}</p>

// //                 </div>
// //               </Col>
// //             </Row>
// //           </div>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button href={Displaydata?.github} variant="secondary" onClick={handleClose}>
// //             <i class="fa-brands fa-github"></i>
// //           </Button>
// //           <Button href={Displaydata} variant="primary" onClick={handleClose}>
// //             <i class="fa-solid fa-link"></i>
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </>
// //   )
// // }

// // export default ProjectCard



import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import folderimg from '../assets/folderimg.png';
import SERVER_URL from '../../Serveices/server_url';


function ProjectCard({ Displaydata }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Card onClick={handleShow} style={{ width: '18rem', marginTop: '50px', cursor: 'pointer' }} className="shadow-sm">
        <Card.Img variant="top" src={`${SERVER_URL}/Uploads/${Displaydata?.projectImg}`} alt="Card image" />
        <Card.Body>
          <Card.Title className="fw-bold text-center">{Displaydata?.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col md={5} className="text-center mb-3 mb-md-0">
              <img src={`${SERVER_URL}/Uploads/${Displaydata?.projectImg}`} alt="Project" width={200} className="img-fluid" />
            </Col>
            <Col md={7}>
              <h3 className="fw-bold">Project Name : {Displaydata?.title}</h3>
              <h4 className="text-white">Project language : {Displaydata?.language}</h4>
              <h4 className="mt-2" style={{ fontSize: '18px' }}>Project Overview : {Displaydata?.overview}</h4>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button href={Displaydata?.github} target="_blank" variant="secondary">
            <i className="fa-brands fa-github"></i> GitHub
          </Button>
          <Button href={Displaydata?.website} target="_blank" variant="primary">
            <i className="fa-solid fa-link"></i> Live Site
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;

