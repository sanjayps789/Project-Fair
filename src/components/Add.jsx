import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProject from '../assets/uploadProject.png'
import { ToastContainer, toast } from 'react-toastify'
import { addProjectAPI } from '../services/allAPI'
import { addResponseContext } from '../Context/ContextShare'

function Add() {
 const {addResponse,setAddResponse} = useContext(addResponseContext)
  // state to store project details
  const [projectData,setProjectData] = useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })
// state to handle image type 
  const [imageFileStatus,setImageFileStatus] = useState(false)

  const [preview,setPreview] = useState("")

  console.log(projectData);
  const [show,setShow] = useState(false)
  const handleShow = () => setShow(true)
  // handleclose button
  const handleClose = () => {
    setShow(false)
    setProjectData({title:"",languages:"",overview:"",github:"",website:"",projectImage:""})
    setPreview(uploadProject)
  }

  //  save button
  const handleSave = async(e) =>{
    e.preventDefault()
    const {title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages ||  !overview || !github || !website ||  !projectImage ){
      toast.info("Please fill the form completely")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages) 
      reqBody.append("overview",overview) 
      reqBody.append("github",github) 
      reqBody.append("website",website) 
      reqBody.append("projectImage",projectImage) 
      
      const token = sessionStorage.getItem("token")

      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`

      }
      console.log("proceed to api-call");
      try{
        const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status === 200){

          // console.log(result.data);
          // toast.success(`New Project "${result.data.title}" has added successfully!!!`)
          // share response to context
          setAddResponse(result.data)
         handleClose()
        }
        else{
          toast.warning(result.response.data)
        }
      }
      catch(err){
        console.log(err);
      }
      }
    }

  }

useEffect(()=>{
  if(projectData.projectImage?.type=="image/png" || projectData.projectImage?.type=="image/jpg" || projectData.projectImage?.type=="image/jpeg"){
    // console.log("generate image url");
    setImageFileStatus(true)
    setPreview(URL.createObjectURL(projectData.projectImage))
  }
  else{
    setPreview("")
    setImageFileStatus(false)
    console.log("Upload only the following file types (jpg,png,jpeg)");
  }
},[projectData.projectImage])
  return (
    <div>
      <button onClick={handleShow} style={{textDecoration:'none'}} className="btn btn-link text-warning d-flex align-items-center fw-bolder"><i style={{height:'34px'}} className="fa-solid fa-plus fa-2x me-2"></i>ADD PROJECT</button>
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
              <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
              <img className='img-fluid' style={{height:'300px'}} src={preview?preview:uploadProject} alt=""/>
            </label>
           {!imageFileStatus&& <div className='text-danger my-3'>*Upload only the following file types (jpg,jpeg,png)*</div>}
          </div>
          <div className="col-lg-7">
            <div className="mb-3 text-black">
              <input type="text" className=" border rounded p-2 w-100" placeholder='Project Title'
              value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
            </div>
            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Language Used'
            value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />

            </div>
            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Github link'
            value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} />
            </div>

            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Website link'
            value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />
            </div>
             <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Overview'
            value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
            </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="white" onClick={handleClose}>
          Cancel
          </Button>
          <Button variant="primary" onClick={(e)=>handleSave(e)}>Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={1500}/>
    </div>
  )
}

export default Add