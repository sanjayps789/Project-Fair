import React, { useEffect, useState } from 'react'
import landingImage from '../assets/landingImage.svg'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getHomeProjectAPI } from '../services/allAPI'
import ProjectCard from '../components/ProjectCard'

function Home() {
    // state to store result of getHomeProjectsAPI
    const [homeProjects,setHomeProjects] = useState([])
const [loginStatus,setLoginStatus] = useState(false)
const navigate = useNavigate()

const getHomeProject = async() =>{
    try{
        const result = await getHomeProjectAPI()
        if(result.status===200){
            setHomeProjects(result.data)
        }
    }
    catch(err){
        console.log(err);
    }
}
console.log(homeProjects);

useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
        setLoginStatus(true)
    }else{
        setLoginStatus(false)
    }
},[])
const handleNavigate = ()=>{
    if(loginStatus==true){
        navigate('/projects')
    }
    else{
        toast.warning("Please login to get full access to our projects!!!")
    }
   
}
return (
        <>
            <div style={{ height: '100vh' }} className='w-100 d-flex justify-content-center bg-success align-items-center'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className="col-lg-6">
                            <h1 style={{ fontSize: '80px' }} className='fw-bolder text-light mb-3'>

                                <i style={{ height: '85px' }} className='fa-solid fa-hands-holding-circle'> </i>
                                <span className='ms-2'>Project Fair</span>

                            </h1>
                            <p style={{ textAlign: 'justify' }} className='text-white'> One Stop Destination for all Software Development Projects. Where User can add and manage their projects. As well as access all projects available in our website... What are you waiting for!!!</p>
                           {loginStatus? <Link className='btn btn-warning mt-3 shadow-lg' to={'/dashboard'} >Manage your Projects <i className="fa-solid fa-arrow-right"></i></Link>:
                           <Link className='btn btn-warning mt-3 shadow-lg' to={'/login'} > Starts to Explore <i className="fa-solid fa-arrow-right"></i></Link>
                                //  navigate("/")
                                }
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">
                            <img src={landingImage} className='img-fluid' alt="landing" />
                        </div>
                    </div>

                </div>

            </div>
            {/* all projects part */}
            <div className='mt-5'>
                <h1 className='text-center mb-5' > Explore Our Projects</h1>
                <marquee>
                    <div className='d-flex'>
                        {
                            homeProjects.length>0 &&
                            homeProjects.map((project,index)=>(
                                <div key={index} className='project me-5'>
                            <ProjectCard project={project} />
                        </div>

                            ))
                        }
                        
                    </div>

                </marquee>
                <div className='text-center'>
                    <button onClick={handleNavigate} className='btn btn-link text-warning' > View More Projects</button>
                </div>

            </div>
            <ToastContainer/>
        </>


    )
}

export default Home
