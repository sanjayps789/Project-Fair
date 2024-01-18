import React from 'react'
import Header from '../components/Header'
import { Col, Container, Form, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'

function Projects() {
  return (

    <>
      <Header />
      <div style={{ marginTop: '100px' }} className='mb-4'>
        <h1 className='text-center' style={{}}>All Projects</h1>
        <Form>
          <div className="container w-100 d-flex justify-content-center">
            <div className="row w-75 ">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2 my-5"
              />
            </div>
          </div>
        </Form>
        <Container>
          <Row>
            <Col sm={12} md={6} lg={4}>
            <ProjectCard/>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Projects