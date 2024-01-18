import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProject from '../assets/uploadProject.png'
function Edit() {
  const [show,setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row d-flex align-items-center">
          <div className="col-lg-5">
            <label>
              <input type="file" style={{display:'none'}} />
              <img className='img-fluid' style={{height:'300px'}} src={uploadProject} alt="" />
            </label>
          </div>
          <div className="col-lg-7">
            <div className="mb-3 text-black">
              <input type="text" className=" border rounded p-2 w-100" placeholder='Project Title' />
            </div>
            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Language Used' />

            </div>
            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Github link' />
            </div>

            <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Website link' />
            </div>
             <div className="mb-3">
            <input type="text" className="border rounded p-2 w-100" placeholder='Project Overview' />
            </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="white" onClick={handleClose}>
          Cancel
          </Button>
          <Button variant="success">UPDATE</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Edit