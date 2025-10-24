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
  // Context to store edit response globally
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  // State to hold editable project data
  const [editDetails, setEditDetails] = useState({
    id: project?._id,
    projectImg: "",
    title: project?.title,
    language: project?.language,
    github: project?.github,
    website: project?.website,
    overview: project?.overview
  });

  // Image preview URL for showing updated image
  const [updatImg, setUpdateImg] = useState("");

  // State to control whether image preview is valid
  const [isstatus, setIsStatus] = useState(false);

  // Modal visibility control
  const [show, setShow] = useState(false);

  // Watch for image selection to validate & preview it
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
      setEditDetails({ ...editDetails, projectImg: "" });
      setUpdateImg("");
      setIsStatus(false);
    }
  }, [editDetails.projectImg]);

  // Open the modal and reset inputs to original project data
  const handleShow = () => {
    setShow(true);
    setEditDetails({
      id: project?._id,
      projectImg: "",
      title: project?.title,
      language: project?.language,
      github: project?.github,
      website: project?.website,
      overview: project?.overview
    });
  };

  // Close modal and reset changes
  const handleClose = () => {
    setEditDetails({
      id: project?._id,
      projectImg: "",
      title: project?.title,
      language: project?.language,
      github: project?.github,
      website: project?.website,
      overview: project?.overview
    });
    setShow(false);
  };

  // Handle update API call
  const handleUpdate = async () => {
    const { id, projectImg, title, language, github, website, overview } = editDetails;

    if (title && language && github && website && overview) {
      const reqBody = new FormData();

      // Append updated image if present, otherwise keep existing
      updatImg
        ? reqBody.append("projectImg", projectImg)
        : reqBody.append("projectImg", project.projectImg);

      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);

      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "content-type": updatImg ? "multipart/form-data" : "application/json",
          authorization: `Bearer ${token}`
        };

        try {
          const result = await UpdateProjectAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            toast.success("Edited your project");
            setEditResponse(result.data); // update context
            handleClose(); // close modal
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.warning("Please complete all required fields");
    }
  };

  return (
    <>
      {/* Edit Icon Button */}
      <div>
        <button onClick={handleShow}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>

      {/* Edit Project Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Image Upload and Preview */}
            <Col>
              <label>
                <img
                  style={{ marginLeft: 50 }}
                  src={
                    updatImg
                      ? updatImg
                      : `${SERVER_URL}/Uploads/${project.projectImg}`
                  }
                  alt=""
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, projectImg: e.target.files[0] })
                  }
                  style={{ display: 'none' }}
                />
              </label>

              {!isstatus && (
                <div className="text-primary fw-bolder my-2">
                  * Upload only .jpg, .jpeg, or .png files
                </div>
              )}
            </Col>

            {/* Editable Text Fields */}
            <Col style={{ marginLeft: 300, marginTop: -100 }}>
              <FloatingLabel className="mb-2" style={{ width: 450 }} controlId="editTitle" label="Project Title">
                <Form.Control
                  type="text"
                  placeholder="Project Title"
                  value={editDetails.title}
                  onChange={(e) => setEditDetails({ ...editDetails, title: e.target.value })}
                />
              </FloatingLabel>

              <FloatingLabel className="mb-2" controlId="editLanguage" label="Language used">
                <Form.Control
                  type="text"
                  placeholder="Language used"
                  value={editDetails.language}
                  onChange={(e) => setEditDetails({ ...editDetails, language: e.target.value })}
                />
              </FloatingLabel>

              <FloatingLabel className="mb-2" controlId="editGithub" label="Project GitHub link">
                <Form.Control
                  type="text"
                  placeholder="GitHub URL"
                  value={editDetails.github}
                  onChange={(e) => setEditDetails({ ...editDetails, github: e.target.value })}
                />
              </FloatingLabel>

              <FloatingLabel className="mb-2" controlId="editWebsite" label="Project website link">
                <Form.Control
                  type="text"
                  placeholder="Website URL"
                  value={editDetails.website}
                  onChange={(e) => setEditDetails({ ...editDetails, website: e.target.value })}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Overview Input */}
          <FloatingLabel className="mb-2" controlId="floatingOverview" label="Project Overview">
            <Form.Control
              type="text"
              placeholder="Overview"
              value={editDetails.overview}
              onChange={(e) => setEditDetails({ ...editDetails, overview: e.target.value })}
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast for notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default Edit;
