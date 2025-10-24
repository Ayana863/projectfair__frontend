import React, { useState } from 'react'
import { Col, Row, } from 'react-bootstrap'
import login from '../assets/login.png'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { registerAPI, userLoginAPI } from '../../Serveices/allAPI';
import Spinner from 'react-bootstrap/Spinner';









function Auth({ insideregister }) {

  // user Input Details store

  const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "" })

  // spinner state
  const [isLogin,setIsLogin]=useState(false)

 
  // console.log(userDetails);
  const navigate = useNavigate()


  // ....................................................
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    if (userDetails.username && userDetails.email && userDetails.password) {
      // do api
      try {
        const result = await registerAPI(userDetails)
        console.log(result);

        //  responds login succesful 
        if (result.status == 200) {
          toast.success(`Welcom ${result.data.username} please login to exlore our website`)
          // empty  of input field
          setUserDetails({ username: "", email: "", password: "" })
          // to navigate another page
          navigate('/login')
        } else {
          if (result.status == 406) {
            toast.warn(`${result.response.data}`);
            setUserDetails({ username: "", email: "", password: "" })

          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Please complete all the field")
    }

  }
  // ...........................................................................

const handleSignIn=async(e)=>{
  e.preventDefault()
      if(userDetails.email && userDetails.password){
        // do api call
      try{
            const result=await userLoginAPI(userDetails)
            console.log(result);
            if(result.status==200){
              // to hold token
                    sessionStorage.setItem("token",result.data.token)
                    // to hold email,userid and token
                    sessionStorage.setItem("users",JSON.stringify(result.data.users))
                    setIsLogin(true)
                    setTimeout(()=>{
                      setIsLogin(false)
                      setUserDetails({username:"",email:"",password:""})
                    navigate('/')
                    },2000)
            }
            else{
              if(result.status==404){
                toast.error(result.response.data)
              }
            }
             
        }catch(err){
          toast.error("Invalid email or Password")
        
          
        }
      }else{
        toast.warning("Please enter Email and Password")
      }
    
}



  return (
    <>
      <div style={{ width: '100%', height: '100vh' }}>
        <div className='container w-75 '>
          <div style={{ marginTop: 100 }} className="card shadow p-5">
            <Row className='text-center'>
              <Col>
                <div><img src={login} alt="" /></div>
              </Col>
              <Col>
                <div><h2 className='text-warning'>Project Fair</h2>

               <h4 className='mt-3'><span style={{ color: 'lightblue' }}>Sign {insideregister ? 'Up' : 'In'}</span> to your Account</h4>


                  <div className='mt-5'>
                    {
                      insideregister &&

                      <Form.Floating className="mb-3">
                        <Form.Control
                          id="floatingInputname"
                          type="text"
                          placeholder="Username"

                          value={userDetails.username}
                          onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
                        />
                        <Form.Label htmlFor="floatingInputName">Enter Username</Form.Label>

                      </Form.Floating>
                    }



                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputemail"
                        type="email"
                        placeholder="name@example.com"
                        value={userDetails.email}
                        onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                      />
                      <Form.Label htmlFor="floatingInputEmail">Enter valid Email</Form.Label>

                    </Form.Floating>




                    <Form.Floating>
                      <Form.Control
                        id="floatingPasswordpassword"
                        type="password"
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
                      />
                      <Form.Label htmlFor="floatingInputPassword">Enter Password</Form.Label>

                    </Form.Floating>

                  </div>


                      
                      {/*  SignUp or SignIn  */}

                  {
                    insideregister ?
                      <div>
                        <button onClick={handleSignUp} className='btn btn-warning w-100 mt-5'>SignUp</button>
                        <h1 style={{ fontSize: 20 }}>Already have an account ? <Link to={'/login'}>Login </Link></h1>

                      </div>
                      :

                      <div>
                        <button onClick={handleSignIn} className='btn btn-warning w-100 mt-5'>SignIn
                          { isLogin &&
                             <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                                </Spinner>
                          }
                        </button>
                        <h1 style={{ fontSize: 20 }}>Don't have an account yet ? <Link to={'/register'}>Register </Link></h1>

                      </div>
                  }



                </div>
              </Col>
            </Row>
           </div>
          </div>
         </div>
  <ToastContainer position="top-right" autoClose={5000} theme="colored" />


    </>
  )
}

export default Auth