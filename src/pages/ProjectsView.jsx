import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getAllprojectAPI } from '../../Serveices/allAPI';
import { Container, Row, Col } from 'react-bootstrap';

function ProjectsView() {
  const [getAllProjectsData, setGetAllProjectData] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      try {
        const result = await getAllprojectAPI(reqHeader);
        if (result.status === 200) {
          setGetAllProjectData(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">All Projects</h2>
      <Row className="g-4">
        {getAllProjectsData?.length > 0 ? (
          getAllProjectsData.map((project) => (
            <Col key={project._id} xs={12} sm={6} md={4} lg={3}>
              <ProjectCard Displaydata={project} />
            </Col>
          ))
        ) : (
          <p className="text-center">No projects found.</p>
        )}
      </Row>
    </Container>
  );
}

export default ProjectsView;
