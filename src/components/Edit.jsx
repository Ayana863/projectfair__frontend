
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import SERVER_URL from '../../Serveices/server_url';
import { UpdateProjectAPI } from '../../Serveices/allAPI';
import { editResponseContext } from '../Context/ContexApi';

function Edit({ project }) {
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  const [editDetails, setEditDetails] = useState({
    id: project?._id,
    projectImg: "",
    title: project?.title,
    language: project?.language,
    github: project?.github,
    website: project?.website,
    overview: project?.overview
  });

  const [updatImg, setUpdateImg] = useState("");
  const [isstatus, setIsStatus] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      editDetails.projectImg &&
      (editDetails.projectImg.type === "image/png" ||
        editDetails.projectImg.type === "image/jpg" ||
        editDetails.projectImg.type === "image/jpeg")
    ) {
      setUpdateImg(URL.createObjectURL(editDetails.projectImg));
      setIsStatus(true);
    } else {
      setIsStatus(false);
    }
  }, [editDetails.projectImg]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUpdate = async () => {
    const { id, projectImg, title, language, github, website, overview } = editDetails;

    if (title && language && github && website && overview) {
      const reqBody = new FormData();
      updatImg
        ? reqBody.append("projectImg", projectImg)
        : reqBody.append("projectImg", project.projectImg);

      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);

      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "content-type": updatImg ? "multipart/form-data" : "application/json",
        authorization: `Bearer ${token}`
      };

      try {
        const result = await UpdateProjectAPI(id, reqBody, reqHeader);

        if (result.status === 200) {
          toast.success("Project updated successfully ");
          setEditResponse(result.data);
          handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("Please complete all required fields!");
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn p-0 border-0 bg-transparent">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="gy-4">
            
            {/* Image Section */}
            <Col xs={12} md={5} className="text-center">
              <label>
                <img
                  src={updatImg ? updatImg : `${SERVER_URL}/Uploads/${project.projectImg}`}
                  className="img-fluid rounded"
                  style={{ maxHeight: "220px", objectFit: "cover" }}
                  alt="project"
                />
                <input
                  type="file"
                  className="d-none"
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, projectImg: e.target.files[0] })
                  }
                />
              </label>
              {!isstatus && editDetails.projectImg && (
                <small className="text-danger fw-bold">
                  Only .jpg, .jpeg, .png allowed
                </small>
              )}
            </Col>

            {/* Input Fields */}
            <Col xs={12} md={7}>
              <FloatingLabel className="mb-3" label="Project Title">
                <Form.Control
                  value={editDetails.title}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, title: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel className="mb-3" label="Language Used">
                <Form.Control
                  value={editDetails.language}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, language: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel className="mb-3" label="GitHub Link">
                <Form.Control
                  value={editDetails.github}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, github: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel className="mb-3" label="Website Link">
                <Form.Control
                  value={editDetails.website}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, website: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel label="Project Overview" className="mt-3">
            <Form.Control
              as="textarea"
              style={{ height: "90px" }}
              value={editDetails.overview}
              onChange={(e) =>
                setEditDetails({ ...editDetails, overview: e.target.value })
              }
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default Edit;
