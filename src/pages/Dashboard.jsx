
import React, { useEffect, useState } from 'react'
import {  Col, Row } from 'react-bootstrap'

import View from '../components/View';
import Profile from '../components/Profile';



function Dashboard() {

  // login user name display dashboard logic..................................................................................
  
  const [dashboardName,setDashboardName]=useState('')
  console.log(dashboardName);
  
  useEffect(() => {
    // To checkdata in sessionstorage 
    if(sessionStorage.getItem("users")){
      setDashboardName(JSON.parse(sessionStorage.getItem("users")).username)
    }else{
      setDashboardName('')
    }
    
  }, [])
  
  // ..................................................................................................................
  return (
    <>
      {/* First Section: Welcome User and Profile */}
      <div>
        <Row>
          <Col style={{marginLeft:30}}><h2>Welcome {dashboardName.split(" ")[0]},
            
            </h2></Col>
         
         

         
          <div>

            <View/>
          </div>
          
          {/* <Col style={{marginLeft:990,marginTop:-230}} ><Profile/></Col> */}
        </Row>
      </div>


    </>
  )
}

export default Dashboard;
