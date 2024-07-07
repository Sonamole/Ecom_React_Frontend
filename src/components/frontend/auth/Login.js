import React from 'react'
import Navbar from '../../../layouts/frontend/Navbar'

function Login() {
  return (
    <div>
    <Navbar/>
    <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h1>Login</h1>
                  </div>
                  <div className="card-body">
                  <form action="">
                    <div className="form-group mb-3">
                     <label>Email</label>
                     <input type="text" name='email' value='' className='form-control' />
                    </div>

                    <div className="form-group mb-3">
                     <label>Password</label>
                     <input type="text" name='password' value='' className='form-control' />
                    </div>



                    <div className="form-group mb-3">
                      <button type='submit' className='btn btn-primary'>Login</button>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
        </div>
      </div>
  </div>
  )
}

export default Login