import React from 'react'
import Header from '../components/Header'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dashboard() {
  return (
    <div>
      <Header insideDashboard/>
        <div style={{marginTop:'150px'}} className='container-fluid mb-4 text-black'>
          <h1>Welcome <span className='text-warning'>User</span></h1>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <MyProjects/>
            </div>
            <div className="col-lg-4">
              <Profile/>
            </div>
          </div>
          </div>
    </div>
  )
}

export default Dashboard