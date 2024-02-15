import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProject from '../assets/uploadProject.png'
import SERVER_URL from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateProjectApi } from '../services/allAPI';
import { updateResponseContext } from '../Context/ContextShare';

function Edit({project}) {
  const {editResponse,setEditResponse} = useContext(updateResponseContext)
  const [projectData,setProjectData] = useState({
   id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
  })
  // state to hold uploading image url
  const [preview,setPreview] = useState("")
  const [show,setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false)
    setProjectData({
      id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
     })
     setPreview("")
  }

  useEffect(()=>{
if(projectData.projectImage){
  setPreview(URL.createObjectURL(projectData.projectImage))
}
else{
  setPreview("")
}
  },[projectData.projectImage])

  const handleUpdateProject = async() =>{
    const {id,title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages || !overview || !github || !website){
toast.info("Please fill the form completely")
    }
    else{
      // proceed to api call
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" :preview?"multipart/form-data":"application/json",
        "Authorization" : `Bearer ${token}`
      }
      console.log("proceed to api call");
      try{
          const result = await updateProjectApi(id,reqBody,reqHeader)
          if(result.status==200){
            handleClose()
            // share response to my project component
            setEditResponse(result.data)
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
  console.log(projectData);
  return (
    <div>
      <button onClick={handleShow} style={{textDecoration:'none'}} className="btn btn-link text-success d-flex align-items-center fw-bolder"><i style={{height:'34px'}} className="fa-solid fa-edit fa-2x me-2"></i></button>
      {/* modal */}
      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Deatails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row d-flex align-items-center">
          <div className="col-lg-5">
            <label>
              <input type="file" style={{display:'none'}}
               onChange={(e)=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
              <img className='img-fluid' style={{height:'300px'}} src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="" />
            </label>
          </div>
          <div className="col-lg-7">
            <div className="mb-3 text-black">
              <input type="text" className=" border rounded p-2 w-100" placeholder='Project Title' value={projectData?.title}
              onChange={(e)=>setProjectData({...projectData,title:e.target.value})} />
            </div>
            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Language Used' value={projectData?.languages}
            onChange={(e)=>setProjectData({...projectData,languages:e.target.value})} />

            </div>
            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Github link' value={projectData?.github} 
            onChange={(e)=>setProjectData({...projectData,github:e.target.value})}/>
            </div>

            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Website link' value={projectData?.website} 
            onChange={(e)=>setProjectData({...projectData,website:e.target.value})}/>
            </div>
             <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Overview' value={projectData?.overview} 
            onChange={(e)=>setProjectData({...projectData,overview:e.target.value})}/>
            </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="white" onClick={handleClose}>
          Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="success">UPDATE</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={1500} theme='colored'/>

    </div>
  )
}

export default Edit