import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import home from '../assets/home.png'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import face1 from '../assets/face1.png'
import face2 from '../assets/face2.png'
import face3 from '../assets/face3.png'
import { ToastContainer, toast } from 'react-toastify';
import { getHomeprojectAPI } from '../../Serveices/allAPI'







function Home() {
  // To Store get HomeProject from API
  const [getHomeProjectData, setGetHomeProjectData] = useState([])
  console.log(getHomeProjectData);
  const navigate = useNavigate()

  // api call define getHomeprojectApi

  useEffect(() => {
    getHomeproject()
  }, [])

  // .............................................................................................................
  // get project in home page 
  const getHomeproject = async () => {
    try {
      const result = await getHomeprojectAPI()
      console.log(result);
      if (result.status == 200) {
        setGetHomeProjectData(result.data)
      }


    } catch (err) {
      console.log(err);

    }
  }
  // ...............................................................................................................
  // button clicktime view all projects only authorized user
  const handleAllProjects = () => {
    // first check user login or not
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      toast.warning("please login")
    }
  }
  return (
    <>
      <div className='d-flex ms-5 justify-content-center'>
        <Row>
          <Col>
            < div className='ms-4' style={{ marginTop: 150 }} >
              <h1 className='mt-4'>PROJECT FAIR</h1>
              <p className="text-muted small mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error beatae pariatur,
                iure quibusdam laborum consectetur earum eveniet iste praesentium exercitationem
                impedit, reprehenderit quae adipisci inventore nostrum ea, voluptate nam! Aliquam.</p>


              {

                sessionStorage.getItem("token") ?
                  <div><Link to={'/dashboard'} style={{ textDecoration: 'none' }}><button className='btn btn-danger fw-bold p-2 mt-2'>Go to Dashboard</button></Link></div>

                  :

                  <div><Link to={'/register'} style={{ textDecoration: 'none' }}><button className='btn btn-danger fw-bold p-2 mt-2'>Manage your projects</button></Link></div>


              }



            </div>


          </Col>
          <Col>
            <div className='mt-5'>
              <img style={{ marginLeft: 40 }} src={home} alt="" width={400} />
            </div>
          </Col>
        </Row>
      </div>


      <div>
        <h3 className=' text-center text-primary'>EXPLORE OUR PROJECTS</h3>
        <marquee className="mt-5">
          <div className='d-flex'>
            {getHomeProjectData?.length > 0 &&
              getHomeProjectData?.map(project => (
                <marquee><ProjectCard Displaydata={project} /></marquee>
              ))


            }
          </div>


        </marquee>











        <button className='btn ' onClick={handleAllProjects}><Link style={{ marginLeft: 600, }}>Clickhere to view more projects </Link></button>

      </div>
      <div >
        <h3 style={{ marginLeft: 600, marginTop: 60 }}>Our Testimonial</h3>
      </div>

      <div className='ms-5 mt-5 '>
        <Row>
          <Col className='mb-4'>
            <Card style={{ width: '18rem' }} className="shadow rounded-5 ">
              <Card.Img variant="top" src={face3} />
              <Card.Body>
                <Card.Title className='text-center'>Nita Marry</Card.Title>
                <div className='text-center mb-4 '>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                </div>

                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>

              </Card.Body>
            </Card>


          </Col>
          <Col className='mb-4'>

            <Card style={{ width: '18rem' }} className="shadow rounded-5 ">
              <Card.Img variant="top" src={face2} />
              <Card.Body>
                <Card.Title className='text-center'>Max Miller</Card.Title>
                <div className='text-center mb-4 '>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                </div>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          <Col className='mb-4'>
            <Card style={{ width: '18rem' }} className="shadow rounded-5 ">
              <Card.Img variant="top" src={face1} />
              <Card.Body>
                <Card.Title className='text-center'>Devid Surya</Card.Title>
                <div className='text-center mb-4 '>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                  <i class="fa-solid fa-star" style={{ color: '#FFD43B' }}></i>
                </div>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <ToastContainer position="top-right" autoClose={5000} theme="colored"

      />

    </>
  )
}

export default Home