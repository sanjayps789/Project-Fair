import React from 'react'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header({insideDashboard}) {
  return (
    <div className='position-fixed w-100' style={{zIndex:'5'}}>
      <Navbar className="bg-success">
      <Container>
        <Navbar.Brand>
       
         <Link className='text-white' style={{textDecoration:'none',fontSize:'24px'}} to={'/'}>
           <i style={{height:'25px'}} className='fa-solid fa-hands-holding-circle me-2'></i>Project Fair</Link>
        
        </Navbar.Brand>
        {
          insideDashboard&&
          <div className="ms-auto">
            <button className="btn btn-link text-light fw-bolder">
              <i className="fa-solid fa-gear me-2">Logout</i>
            </button>
          </div>
        }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header