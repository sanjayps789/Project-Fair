import React, { useContext, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import authImage from '../assets/authImage.png'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginAPI, registerAPI } from '../services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../Context/TokenAuth';

function Auth({ insideRegister }) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
const navigate = useNavigate()
  const [userInputData,setUserInputData] = useState({
    username:"",email:"",password:""
  }) 
  const [loginStatus,setLoginStatus] = useState(false)

  // register button function
  const handleRegister = async (e) =>{
    e.preventDefault()
    // console.log(userInputData);
    const {username,email,password} = userInputData
    if(!username || !email || !password){
      toast.info("Please fill the form completely!!!")
    }
    else{
      try{
        const result = await registerAPI(userInputData)
        console.log(result);
        if(result.status===200){
          toast.success(`Welcome ${result.data.username}... Please login to explore our site!!! ` )
          // For setting  all input fields empty
          setUserInputData({ username:"",email:"",password:"" })
        // navigate to login page
       setTimeout(()=>{
        navigate("/login")
       },2000) 
        }else{
          toast.error(result.response.data)
        }
      }
      catch(err){
        console.log(err);
      }
    }
  }

  // login  button function
  const handleLogin = async (e) =>{
    e.preventDefault()
    // console.log(userInputData);
    const {email,password} = userInputData
    if( !email || !password){
      toast.info("Please fill the form completely!!!")
    }else{
      try{
        const result = await loginAPI({email,password})
        console.log(result);
        if(result.status===200){
          //store token , username
          sessionStorage.setItem("username",result.data.existingUser.username) 
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
          setLoginStatus(true)
          setIsAuthorised(true)
          setUserInputData({ email:"",password:"" })
        // navigate to landing page
        setTimeout(()=>{
          navigate("/")
        },2000)
        }else{
          toast.error(result.response.data)
        }
      }
      catch(err){
        console.log(err);
      }
    }
  }


  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center' >
      <div className='container w-75'>
        <Link to={'/'} style={{ textDecoration: 'none' }} >
          <i className='fa-solid fa-arrow-left'></i>
          Back to home
        </Link>
        <div className='card shadow p-5 bg-success'>
          <div className='row  align-items-center'>
            <div className="col-lg-6">
              <img className='w-100 img-fluid' src={authImage} alt="Authentication" />
            </div>
            <div className="col-lg-6">
              <h1 className='fw-bolder text-white mt-2'>
                <i style={{ height: '41px' }} className='fa-solid fa-hands-holding-circle'> </i>
                Project Fair
              </h1>
              <h5 className='fw-bolder text-light mt-2'> Sign {insideRegister ? 'Up' : 'In'} to your Account</h5>

              <Form>
                {
                  insideRegister &&
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control  type="text" placeholder="Enter Name" value={userInputData.username} onChange={e=>setUserInputData({...userInputData,username:e.target.value})}  />
                  </Form.Group>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email"  value={userInputData.email} onChange={e=>setUserInputData({...userInputData,email:e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPswd">
                  <Form.Control type="password" placeholder="Enter Password" value={userInputData.password} onChange={e=>setUserInputData({...userInputData,password:e.target.value})} />
                </Form.Group>

                {
                  insideRegister ?
                    <div>
                      <button onClick={handleRegister} className='btn btn-warning mb-2'>Register</button>
                      <p> Already have Account ? Click here to <Link to={'/login'} className='text-light' > Login </Link> </p>
                    </div> :
                    <div>
                      <button onClick={handleLogin} className='btn btn-warning mb-2'>Login</button>

                     {loginStatus&& <span> <Spinner animation="border" variant="info" /></span>}
                      <p> New User ? Click here to <Link to={'/register'} className='text-light'> Register </Link> </p>
                    </div>
                }

              </Form>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500} theme='colored'/>
    </div>
  )
}

export default Auth