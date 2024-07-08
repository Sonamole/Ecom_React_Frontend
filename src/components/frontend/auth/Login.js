import React ,{useState} from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'


function Login() {

const navigate=useNavigate();

  const [login, setLogin] = useState({
    email:'',
    password:'',
    error_list:[],
  })


  const handleInput=(e)=>{
    e.persist();
    setLogin({
      ...login,
      [e.target.name]:e.target.value
    });
  }

  const loginSubmit=(e)=>{
    e.preventDefault();

    const data={
      email:login.email,
      password:login.password,
    }

    axios.get(`sanctum/csrf-cookie`).then(response => {
    console.log("Sanctum in login working");
    axios.post(`api/login`,data).then(response=>{

      if(response.data.status===200){
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('auth_name', response.data.username);
        swal("Sucess",response.data.message,"success")
        navigate('/');
      }
      else if(response.data.status===401){
        swal("Warning",response.data.message,"warning")
      }

      else{
        setLogin({ ...login, error_list: response.data.validation_errors });

      }

    });
  });
  }


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
                  <form onSubmit={loginSubmit}>
                    <div className="form-group mb-3">
                     <label>Email</label>
                     <input type="text" name='email' onChange={handleInput} value={login.email} className='form-control' />
                     <span>{login.error_list.email}</span>
                    </div>

                    <div className="form-group mb-3">
                     <label>Password</label>
                     <input type="text" name='password' onChange={handleInput} value={login.password} className='form-control' />
                     <span>{login.error_list.password}</span>
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