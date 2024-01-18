import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import counterAppImage from '../assets/counterAppImage.png'

function ProjectCard() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
            <Card class='shadow' style={{ width: '25rem' }} onClick={handleShow}>
                <Card.Img variant="top" src={counterAppImage} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                </Card.Body>
            </Card>
            {/* Modal */}
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <img style={{ height: '300px', width: '100%' }} className='img-fluid' src={counterAppImage} alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            <h2 className='fw-bolder text-warning'>Title</h2>
                            <p>Project Overview: <span className='fw-bolder'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque animi facilis dolorem accusamus fugiat quo, maxime iusto ullam veniam architecto excepturi! Rem doloribus laborum inventore minima, non libero dolores ad.</span></p>
                            <p>Languages Used: <span className='text-danger fw-bold'>Html,Css,JS</span></p>
                        </Col>
                    </Row>
                    <div className="mt-1">
                        <a href="" target='_blank' style={{color:'black',cursor:'pointer'}}>
                            <i style={{height:'34px'}} className=' fa-brands fa-github fa-2x'></i>
                        </a>
                        <a href="" target='_blank' style={{color:'black',cursor:'pointer'}}>
                            <i style={{height:'34px'}} className=' fa-solid fa-link fa-2x ms-5'></i>
                        </a>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProjectCard