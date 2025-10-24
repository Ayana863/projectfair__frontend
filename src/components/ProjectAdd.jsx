
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import upload from '../assets/images.png'
import { ToastContainer, toast } from 'react-toastify';
import { AddProjectAPI } from '../../Serveices/allAPI';
import { addResponseContext } from '../Context/ContexApi';

function ProjectAdd() {

  const { addResponse, setAddResponse } = useContext(addResponseContext)

  const [AddprojectDetails, setAddProjectDetails] = useState({
    projectImg: "",
    title: "",
    language: "",
    github: "",
    website: "",
    overview: ""
  });

  const [show, setShow] = useState(false);
  const [isstatus, setisStatus] = useState(false);
  const [fileimg, setFileImg] = useState(upload);

  const handleClose = () => {
    setShow(false);
    setAddProjectDetails({ projectImg: "", title: "", language: "", github: "", website: "", overview: "" })
    setFileImg(upload);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (AddprojectDetails.projectImg &&
      (AddprojectDetails.projectImg.type === "image/png" ||
        AddprojectDetails.projectImg.type === "image/jpg" ||
        AddprojectDetails.projectImg.type === "image/jpeg")) {
      setisStatus(true);
      setFileImg(URL.createObjectURL(AddprojectDetails.projectImg));
    } else {
      setisStatus(false);
      setFileImg(upload);
    }
  }, [AddprojectDetails.projectImg]);

  const handleAddProject = async () => {
    const { projectImg, title, language, github, website, overview } = AddprojectDetails;

    if (projectImg && title && language && github && website && overview) {

      const reqBody = new FormData();
      reqBody.append("projectImg", projectImg);
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);

      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "content-type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        };

        try {
          const result = await AddProjectAPI(reqBody, reqHeader);
          if (result.status === 200) {
            toast.success(" Project Added Successfully!");
            setAddResponse(result.data);
            handleClose();
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }

    } else {
      toast.warning(" Please complete all fields");
    }
  };

  return (
    <>
      <div onClick={handleShow} className="btn btn-warning fw-bold">
        + Add Project
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">

            {/* LEFT: IMAGE UPLOAD */}
            <Col xs={12} md={5} className="text-center">
              <label style={{ cursor: "pointer" }}>
                <img
                  src={fileimg}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <input type="file"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    setAddProjectDetails({
                      ...AddprojectDetails,
                      projectImg: e.target.files[0],
                    })
                  }
                />
              </label>

              {!isstatus && (
                <span className="text-danger small d-block mt-2">
                  * Only .jpg, .jpeg & .png files allowed
                </span>
              )}
            </Col>

            {/* RIGHT: FORM FEILDS */}
            <Col xs={12} md={7}>
              <FloatingLabel label="Project Title" className="mb-3">
                <Form.Control type="text"
                  onChange={(e) =>
                    setAddProjectDetails({ ...AddprojectDetails, title: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel label="Language Used" className="mb-3">
                <Form.Control type="text"
                  onChange={(e) =>
                    setAddProjectDetails({ ...AddprojectDetails, language: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel label="GitHub Link" className="mb-3">
                <Form.Control type="text"
                  onChange={(e) =>
                    setAddProjectDetails({ ...AddprojectDetails, github: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel label="Website Link" className="mb-3">
                <Form.Control type="text"
                  onChange={(e) =>
                    setAddProjectDetails({ ...AddprojectDetails, website: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>

          </Row>

          {/* BOTTOM: OVERVIEW FIELD */}
          <FloatingLabel label="Project Overview" className="mt-3">
            <Form.Control
              as="textarea" rows={3}
              onChange={(e) =>
                setAddProjectDetails({ ...AddprojectDetails, overview: e.target.value })
              }
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  )
}

export default ProjectAdd;
