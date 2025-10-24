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

  // create contextapi hooks
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  



  // to store Add project details
  const [AddprojectDetails, setAddProjectDetails] = useState({ projectImg: "", title: "", language: "", github: "", website: "", overview: "" })
  console.log(AddprojectDetails);

  
 
  


const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // To close modal at a time remove file img
    setAddProjectDetails({ projectImg: "", title: "", language: "", github: "", website: "", overview: "" })
  }
  const handleShow = () => setShow(true);



// ....................................................................................................................
  const [isstatus, setisStatus] = useState(false)
   //to crate state for choosed img to store the url  and show img 
  const [fileimg, setFileImg] = useState(upload)
  useEffect(() => {
    if (AddprojectDetails.projectImg.type == "image/png" || AddprojectDetails.projectImg.type == "image/jpg" || AddprojectDetails.projectImg.type == "image/jpeg") {
      setisStatus(true)
      setFileImg(URL.createObjectURL(AddprojectDetails.projectImg))
    } else {
      setisStatus(false)
      setAddProjectDetails({ ...AddprojectDetails, projectImg: "" })
      setFileImg(upload)
    }
  }, [AddprojectDetails.projectImg])

// ....................................................................................................................



  //  ..............................................................................................................  
  // ADD API CALL 
  // Add sumbit button
  const handleAddProject = async () => {
    const { projectImg, title, language, github, website, overview } = AddprojectDetails
    if (projectImg && title && language && github && website && overview) {
      // do api call

      // data send to backend through react class formData()
      const reqBody = new FormData()

      reqBody.append("projectImg", projectImg)
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)

      // create reqHeader
      // first of all get token from sessionstorage with store variable

      const token = sessionStorage.getItem("token")
      // To check if a token exists
      if (token) {
        const reqHeader = {
          // to hold content type and token
          "content-type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        }

        try {
          const result = await AddProjectAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Project Added Successfully")
            handleClose()
            setAddResponse(result.data)

          } else {
            toast.warning(result.response.data)
          }

        } catch (err) {
          console.log(err);

        }

      }

    } else {
      toast.warning("Please complete all input field")
    }
  }
  // .............................................................................................................


  return (
    <>
      <div onClick={handleShow} className='btn btn-warning'>
        +  New Project
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row>
              <Col >
                <div>
                  <label  ><img style={{ marginLeft: 50 }} src={fileimg} alt="" /> <input type="file" onChange={(e) => setAddProjectDetails({ ...AddprojectDetails, projectImg: e.target.files[0] })} style={{ display: 'none' }} /></label>
                  {!isstatus &&
                    <div className='text-primary fw-bolder my-2'>
                      * Upload Only the allow following  <br /> files type (.jpg,.jpeg,.png)
                    </div>
                  }
                </div>
              </Col>


              <Col style={{ marginLeft: 300, marginTop: -250 }}>
                <div >

                  <FloatingLabel className='mb-2' style={{ width: 450, background: 'transparent' }} controlId="floatingPassword" label="Project Title">
                    <Form.Control onChange={(e) => setAddProjectDetails({ ...AddprojectDetails, title: e.target.value })} type="text" placeholder="text" />
                  </FloatingLabel>


                  <FloatingLabel className='mb-2' controlId="floatingPassword" label="Language used">
                    <Form.Control onChange={(e) => setAddProjectDetails({ ...AddprojectDetails, language: e.target.value })} type="text" placeholder="text" />
                  </FloatingLabel>


                  <FloatingLabel className='mb-2' controlId="floatingPassword" label="project github link">
                    <Form.Control onChange={(e) => setAddProjectDetails({ ...AddprojectDetails, github: e.target.value })} type="text" placeholder="text" />
                  </FloatingLabel>


                  <FloatingLabel className='mb-2' controlId="floatingPassword" label="project website link">
                    <Form.Control onChange={(e) => setAddProjectDetails({ ...AddprojectDetails, website: e.target.value })} type="text" placeholder="text" />
                  </FloatingLabel>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <FloatingLabel className='mb-2' controlId="floatingPassword" label="Project Overview">
              <Form.Control onChange={(e) => setAddProjectDetails({ ...AddprojectDetails, overview: e.target.value })} type="text" placeholder="text" />
            </FloatingLabel>

          </div>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />



    </>
  )
}

export default ProjectAdd