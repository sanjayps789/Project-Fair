import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'
import { toast } from 'react-toastify'

function MyProjects() {
  const {editResponse,setEditResponse} = useContext(updateResponseContext)
 const {addResponse,setAddResponse}=  useContext(addResponseContext)
  const [allProjects,setallProjects] = useState([])
  
  const getallProjects = async() =>{
   try{
     const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
 const result = await getUserProjectAPI(reqHeader)
 if(result.status === 200){
  setallProjects(result.data)
 }
  }
}catch(err){
    console.log(err);
  }
};
console.log(allProjects);
  useEffect(()=>{
getallProjects()
  },[addResponse,editResponse])

// handle delete project
const handleDeleteProject = async (projectId) =>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
  }
  try{
    const result = await deleteProjectAPI(projectId,reqHeader)
    if(result.status==200){
      getallProjects()

    }else{
      console.log(result);
    }
  }
  catch(err){
    console.log(err);
  }
  }
}
  return (
    <div className='border rounded p-2'>
      <div className="d-flex justify-content-between">
        <h2>My Projects</h2>
        <Add/>
      </div>
      <div className="mt-4">
        {
        allProjects?.length>0?
        allProjects.map((project,index)=>(
          <div key={index} className="border rounded d-flex justify-content-between align-items-center mb-3 p-2">
          <h5>{project?.title}</h5>
          <div className="icons d-flex align-items-center">
            <Edit project={project}/>
            <a href={project?.github} target='_blank' className='btn btn-link ms-2 text-black'><i style={{height:'34px'}} className="fa-brands fa-github fa-2x"></i></a>
            {/* delete project btn */}
            <button onClick={()=>handleDeleteProject(project._id)} className='btn btn-link text-danger ms-2'><i className="fa-solid fa-trash fa-2x"></i></button>
          </div>

        </div>
        )):<div>No Projects added yet</div>
      }
      </div>
    </div>
  )
}

export default MyProjects