import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';//imported to handle HTTP requests to your backend API.
import swal from 'sweetalert';//imported to display nice alert messages to the user.
import { useNavigate } from 'react-router-dom';// navigate to different pages.

function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    error_list: [],
  });//The initial state object has four properties and initially its empty.name,email and password holds a string and error_list holds an array

  const handleInput = (e) => {//handle input changes in a form and update the state accordingly.This function is intended to handle input events (like when a user types into a text field).
    e.persist();//By calling e.persist(), you ensure that the event object and its properties (like e.target.name and e.target.value) remain accessible even after the event handler completes(which means even if user user stops typing).
    setRegister(register => ({ //  // Calls the setRegister method to update register function to update the state at the moment when user types something.
      ...register,//uses the spread operator to copy all properties(name,email,password) of the current register state into a new object.
      [e.target.name]: e.target.value //// e.target.name is the name attribute of the input element that triggered.e.target.value is the current value of that input element.
    }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();//prevents the default form submission behavior, which is to reload the page and prepares the data to be sent to the server.

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    }

    axios.get('sanctum/csrf-cookie').then(response => { 
      //When the axios.get('sanctum/csrf-cookie') request(get request) is sent, the EnsureFrontendRequestsAreStateful middleware in laravel intercepts it.then , Laravel generates a CSRF token and sets it in a cookie in user browser named XSRF-TOKEN.
      console.log('sanctum working',response);
      axios.post('api/register', data).then(response => { //.then(response => { ... }) is a promise method that runs when the POST request is successful.
        console.log('post working',response);
        if (response.data.status === 200) {
          console.log(response.data);
          localStorage.setItem('auth_token', response.data.token);//This stores the authentication token received from the server in the browser's localStorage.
          localStorage.setItem('auth_name', response.data.username);
          swal("Success", response.data.message, "success");
          navigate('/');
        } else {
          console.log("Error working");
          setRegister({ ...register, error_list: response.data.validation_errors });
          //This updates the register state with the validation errors received from the server.{ ...register } copies the current state.error_list: response.data.validation_errors sets the error_list field with the validation errors from the server.
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