import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectAdd from './ProjectAdd';
import Edit from './Edit';
import { deleteProjectAPI, getUserprojectAPI } from '../../Serveices/allAPI';
import { addResponseContext, editResponseContext } from '../Context/ContexApi';

function View() {
  const { addResponse } = useContext(addResponseContext);
  const { editResponse } = useContext(editResponseContext);
  const [getUserProject, setGetUserProject] = useState([]);

  useEffect(() => {
    userProject();

  }, [addResponse, editResponse]);

  const userProject = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      };

      try {
        const result = await getUserprojectAPI(reqHeader);
        if (result.status === 200) {
          setGetUserProject(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (pid) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      };
      try {
        await deleteProjectAPI(pid, reqHeader);
        userProject();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container className="mt-5">

    
      <Row className="align-items-center mb-4">
        <Col xs={12} md={6}>
          <h3 className="text-primary fw-bold">All Projects</h3>
        </Col>
        <Col xs={12} md={6} className="text-md-end text-center mt-3 mt-md-0">
          <ProjectAdd />
        </Col>
      </Row>

  
      <Row className="gy-3 justify-content-center">
        {getUserProject?.length > 0 ? (
          getUserProject.map((project, index) => (
            <Col xs={12} md={10} lg={8} key={index}>
              <div className="border rounded shadow-sm p-3 d-flex justify-content-between align-items-center gap-3 flex-wrap">
             
                <h5 className="mb-0 text-break">{project.title}</h5>

              
                <div className="d-flex align-items-center gap-3">
                  <Edit project={project} />

                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn p-0">
                    <i className="fa-brands fa-github fs-5"></i>
                  </a>

                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn p-0">
                    <i className="fa-solid fa-globe fs-5"></i>
                  </a>

                  <button onClick={() => handleDelete(project?._id)} className="btn p-0">
                    <i className="fa-solid fa-trash text-danger fs-5"></i>
                  </button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center text-secondary">
            <p>No projects found. Add your first project!</p>
          </Col>
        )}
      </Row>

    </Container>
  );
}

export default View;
