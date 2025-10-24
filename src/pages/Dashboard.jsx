
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import View from '../components/View';

function Dashboard() {
  const [dashboardName, setDashboardName] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem("users");
    if (user) {
      setDashboardName(JSON.parse(user).username);
    } else {
      setDashboardName('');
    }
  }, []);

  return (
    <Container className="mt-5">
      {/* Welcome Section */}
      <Row className="align-items-center mb-4">
        <Col xs={12} md={8}>
          <h2>Welcome {dashboardName.split(" ")[0]}</h2>
        </Col>
        
      </Row>

      {/* View Section */}
      <Row>
        <Col>
          <View />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
