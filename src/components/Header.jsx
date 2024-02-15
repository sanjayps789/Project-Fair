import React, { useContext } from 'react'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../Context/TokenAuth'

function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  const navigate = useNavigate()
  const handleLogout = () =>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
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
            <button onClick={handleLogout} className="btn btn-link text-light fw-bolder">
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