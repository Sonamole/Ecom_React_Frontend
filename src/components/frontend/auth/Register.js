import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister(register => ({
      ...register,
      [e.target.name]: e.target.value
    }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    }

    axios.get('sanctum/csrf-cookie').then(response => {
      console.log('sanctum working',response);
      axios.post('api/register', data).then(response => {
        console.log('post working');
        if (response.data.status === 200) {
          console.log(response.data);
          localStorage.setItem('auth_token', response.data.token);
          localStorage.setItem('auth_name', response.data.username);
          swal("Success", response.data.message, "success");
          navigate('/');
        } else {
          console.log("Error working");
          setRegister({ ...register, error_list: response.data.validation_errors });
        }
      });
    });
  }



  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1>Register</h1>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input type="text" name='name' onChange={handleInput} value={register.name} className='form-control' />
                    <span>{register.error_list.name}</span>
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input type="text" name='email' onChange={handleInput} value={register.email} className='form-control' />
                    <span>{register.error_list.email}</span>
                  </div>

                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input type="password" name='password' onChange={handleInput} value={register.password} className='form-control' />
                    <span>{register.error_list.password}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button type='submit' className='btn btn-primary'>Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;