import React, { useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import placeholderImage from '../assets/placeholderImage.jpg'
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateUserProfileAPI } from '../services/allAPI';

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profileImage: ""
  })

  // state to hold existingUser image
  const [existingImage, setExistingImage] = useState("")
  // state to hold uploading images url
  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData, username: userDetails.username, email: userDetails.email, password: userDetails.password, github: userDetails.github,
        linkedin: userDetails.linkedin})
        setExistingImage(userDetails.profile)
    }
  }, [open])

  useEffect(() => {
    if (userData.profileImage) {
      setPreview(URL.createObjectURL(userData.profileImage))
    }
    else {
      setPreview("")
    }
  }, [userData.profileImage])
  console.log(userData);

  const handleProfileUpdate = async()=>{
    const {username,email,password,github,linkedin,profileImage} = userData
    if(!github || !linkedin){
      toast.info("please fill the form completely!!!")
    }
    else{
      // proceed to api call
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" :preview? "multipart/form-data":"application/json",
        "Authorization" : `Bearer ${token}`
}
// api call
  try{
    const result = await updateUserProfileAPI(reqBody,reqHeader)
    if(result.status==200){
     setOpen(!open)
     sessionStorage.setItem("userDetails",JSON.stringify(result.data))
    }
    else{
      console.log(result);
    }
  }
  catch(err){
    console.log(err);
  }
      }
    }
  }
  return (
    <div className='border rounded'>
      <div className="d-flex justify-content-between">
        <h2 className='p-2'>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'>
          <i className="fa-solid fa-caret-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div className='text-center' id="example-collapse-text">

          <label >
            <input style={{ display: 'none' }} type="file" onChange={e => setUserData({ ...userData, profileImage: e.target.files[0]})} />
            {existingImage == "" ?
              <img width={'200px'} height={'200px'} className='img-fluid rounded-circle'
                src={preview ? preview : placeholderImage} alt="Upload profile" />
              :
              <img width={'200px'} height={'200px'} className='img-fluid rounded-circle'
                src={preview ? preview : `${SERVER_URL}/uploads/${existingImage}`} alt="Upload Profile" />
            }
          </label>

          <form>
            <div className="mb-2">
              <input className='rounded p-1 w-75' type="text" placeholder='Enter your Github Link Here'
                value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })} />
            </div>
            <div className="mb-2">
              <input className='rounded p-1 w-75' type="text" placeholder='Enter your Linkedin Link Here'
                value={userData.linkedin} onChange={e => setUserData({ ...userData, linkedin: e.target.value })} />
            </div>
            <div className="mb-3 d-grid w-75 mx-auto">
              <button onClick={handleProfileUpdate} className='btn btn-warning'>UPDATE</button>
            </div>
          </form>
        </div>
      </Collapse>
      <ToastContainer autoClose={1500} theme='colored'/>

    </div>
  )
}

export default Profile