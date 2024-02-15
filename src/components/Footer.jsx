import React from 'react'
import { Col, Container, Row, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='text-white bg-success'>
      <Container>
        <Row className='p-3'>
          <Col lg={3} className='p-2 '>
            <div className='d-flex '>
            <Link to={'/'}><i class="fa-solid fa-hands-holding-circle text-white fs-4 me-2"></i></Link>
            <h4 className='fw-bold'>Project-Fair</h4>
            </div>
            <p className='p-2 justify-content'>Designed and built with all the love in <br />
              the world by the bootstrap team <br />
              Possimus recusandae consequatur ipsa 
              veritatis expedita aspernatur.</p>
          </Col>
          <Col lg={3}>

            <h4 className=' mt-3 ms-4 text-white '>Links</h4>
            <ul className=' pt-2' style={{listStyle:'none'}}>
              <li><a >Landing Page</a></li>
              <li><a>Home</a></li>
              <li><a >Watch History</a></li>
            </ul>
          </Col>
          <Col lg={3}>
            <h4 className=' mt-3 ms-4 text-white '>Links</h4>
            <ul className='footerlinks pt-2' style={{listStyle:'none'}}>
              <li className='me-5'>react</li>
              <li>react bootstrap</li>
              <li className='me-5'>routing</li>
            </ul>
          </Col>
          <Col lg={3}>
            <div className='mt-3  container'>
              <form action="" className=' container'>
                <h5 className='text-white'>Contact Us</h5>

                <div className='d-flex justify-content-evenly'>
                  <input type="text" className='form-control rounded me-2' placeholder='enter email'/>
                  <button className='btn btn-danger'>send</button>
                </div>

                <div className='my-3 d-flex align-items-center justify-content-between'>
                  <i class="fa-brands fa-instagram fs-3"></i>
                  <i class="fa-brands fa-facebook fs-3"></i>
                  <i class="fa-brands fa-twitter fs-3"></i>
                  <i class="fa-brands fa-github fs-3"></i>
                </div>
              </form>
            </div> 
          </Col>
        </Row>
        <p className='text-center pb-5'>© 2024 Copyright- Project Fair</p>

      </Container>
    </div>
  )
}

export default Footer