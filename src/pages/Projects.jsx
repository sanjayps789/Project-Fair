import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Form, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectAPI } from '../services/allAPI'

function Projects() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])

  const getAllProjects =async () =>{
    try{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await getAllProjectAPI(searchKey,reqHeader) 
        if(result.status===200){
          setAllProjects(result.data)

        }
      }
    }
    catch(err){
      console.log(err);
    }
  }
  console.log(allProjects);
  useEffect(()=>{
getAllProjects()
  },[searchKey])
  return (

    <>
      <Header />
      <div style={{ marginTop: '100px' }} className='mb-4'>
        <h1 className='text-center' style={{}}>All Projects</h1>
        <Form>
          <div className="container w-100 d-flex justify-content-center">
            <div className="row w-75 ">
              <Form.Control
              onChange={e=>setSearchKey(e.target.value)}
                type="text"
                placeholder="Search"
                className=" mr-sm-2 my-5"
              />
            </div>
          </div>
        </Form>
        <Container>
          <Row>
           {allProjects.length>0 ? 
           allProjects.map((project,index)=>(
            <Col className='mb-3' key={index} sm={12} md={6} lg={4}>
            <ProjectCard project={project}/>
            </Col>
           )):
           <div className='text-danger'>Nothing to display</div>
           }
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Projects