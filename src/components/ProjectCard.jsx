import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import counterAppImage from '../assets/counterAppImage.png'
import SERVER_URL from '../services/serverUrl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
            <Card class='shadow' style={{ width: '25rem' }} onClick={handleShow}>
                <Card.Img style={{height:'220px'}} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
                <Card.Body>
                    <Card.Title>{project?.title}</Card.Title>
                </Card.Body>
            </Card>
            {/* Modal */}
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{project?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <img style={{ height: '300px', width: '100%' }} className='img-fluid' src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            <h2 className='fw-bolder text-warning my-2'>{project?.title}</h2>
                            <p>Project Overview: <span className='fw-bolder'>{project?.overview}</span></p>
                            <p>Languages Used: <span className='text-danger fw-bold'>{project?.languages}</span></p>
                        </Col>
                    </Row>
                    <div className="mt-1">
                        <a href={project?.github} target='_blank' style={{color:'black',cursor:'pointer'}}>
                            <i style={{height:'34px'}} className=' fa-brands fa-github fa-2x'></i>
                        </a>
                        <a href={project?.website} target='_blank' style={{color:'black',cursor:'pointer'}}>
                            <i style={{height:'34px'}} className=' fa-solid fa-link fa-2x ms-5'></i>
                        </a>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProjectCard