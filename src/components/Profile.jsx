import React,{useState} from 'react'
import Collapse from 'react-bootstrap/Collapse';
import placeholderImage from '../assets/placeholderImage.jpg'
function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <div className='border rounded'>
      <div className="d-flex justify-content-between">
        <h2 className='p-2'>Profile</h2>
        <button   onClick={() => setOpen(!open)} className='btn btn-outline-warning'>
          <i className="fa-solid fa-caret-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div className='text-center' id="example-collapse-text">
          <label >
            <input style={{display:'none'}} type="file"/>
            <img width={'200px'} height={'200px'} className='img-fluid rounded-circle' src={placeholderImage} alt="" />
          </label>
         <form>
          <div className="mb-2">
            <input className='rounded p-1 w-75' type="text" placeholder='Enter your Github Link Here'/>
          </div>
          <div className="mb-2">
            <input className='rounded p-1 w-75' type="text" placeholder='Enter your Link Link Here'/>
          </div>
          <div className="mb-3 d-grid w-75 mx-auto">
            <button className='btn btn-warning'>UPDATE</button>
          </div>
         </form>
        </div>
      </Collapse> 
    </div>
  )
}

export default Profile