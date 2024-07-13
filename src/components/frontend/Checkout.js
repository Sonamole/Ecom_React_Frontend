import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Checkout() {

    const navigate = useNavigate();

    if (!localStorage.getItem('auth_token')) {
        navigate('/');
        swal("Warning", "Login in to go to cart page", "error");

    }

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState([]);


    var totalCartPrice = 0;
    const [checkout, setCheckout] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',

});




    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/cart`).then(response => {
            // console.log(response);
            if (isMounted) {
                if (response.data.status === 200) {
                    setCart(response.data.cart);
                    setLoading(false);
                }
                else if (response.data.status === 401) {
                    navigate('/');
                    swal("Warning", response.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleInput=(e)=>{
        e.persist();
        setCheckout({...checkout,[e.target.name]:e.target.value});
    }

    const placeOrder=(e)=>{
        e.preventDefault();
        const data={
            firstname:checkout.firstname,
            lastname:checkout.lastname,
            phone:checkout.phone,
            email:checkout.email,
            address:checkout.address,
            city:checkout.city,
            state:checkout.state,
            zipcode:checkout.zipcode,

        }
        console.log(data);

        axios.post('/api/place-order',data).then(response=>{
            console.log(response);
            if(response.data.status===200)
            {
                swal('Order Placed Successfully',response.data.message,"success")
                setError([])
                navigate('/thank-you')
            }
            else if(response.data.status===422)
            {
                swal('All fields required',"","error")
                setError(response.data.errors)

            }

        })
    }

    if (loading) {
        return <h4>Loading Checkout</h4>;
    }
var checkout_HTMl='';
    if (cart.length > 0) {
        checkout_HTMl =<div>

<div className="row">
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Basic Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label >First Name</label>
                                                    <input type="text" onChange={handleInput} value={checkout.firstname} name='firstname' className='form-control' />
                                                    <small className='text-danger'> {error.firstname}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label >Last Name</label>
                                                    <input type="text"  name='lastname' onChange={handleInput} value={checkout.lastname} className='form-control' />
                                                    <small className='text-danger'> {error.lastname}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3" >
                                                    <label >Phone number</label>
                                                    <input type="text" name='phone' onChange={handleInput} value={checkout.phone} className='form-control' />
                                                    <small className='text-danger'> {error.phone}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label >Email Address</label>
                                                    <input type="text" name='email' onChange={handleInput} value={checkout.email} className='form-control' />
                                                    <small className='text-danger'> {error.email}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-3">
                                                    <label > Full address</label>
                                                    <textarea rows="3" onChange={handleInput} value={checkout.address} className='form-control' name="address" id=""></textarea>
                                                    <small className='text-danger'> {error.address}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >City</label>
                                                    <input type="text" name='city' onChange={handleInput} value={checkout.city} className='form-control' />
                                                    <small className='text-danger'> {error.city}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >State</label>
                                                    <input type="text" name='state' onChange={handleInput} value={checkout.state} className='form-control' />
                                                    <small className='text-danger'> {error.state}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >Zipcode</label>
                                                    <input type="text" name='zipcode' onChange={handleInput} value={checkout.zipcode} className='form-control' />
                                                    <small className='text-danger'> {error.zipcode}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group text-end" >

                                                    <button type="text" onClick={placeOrder} className='btn btn-primary'>Checkout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th width="50%">Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, idx) => {
                                            totalCartPrice += item.product.selling_price * item.product_qty;

                                            return (
                                                <tr key={idx}>
                                                    <td>{item.product.name}</td>
                                                    <td>{item.product.selling_price}</td>
                                                    <td>{item.product_qty}</td>
                                                    <td>{item.product.selling_price * item.product_qty}</td>

                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td colSpan="2" className='text-end fw-bold'>Grand total:</td>
                                            <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
        </div>
    }
        else {
            checkout_HTMl =
                <div>
                    <div className="table-responsive">
                        <h4>Your shopping cart in empty.Your are in checkout page</h4>
                    </div>
                </div>
        }

    return (
        <div>
            <div>
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h4>Home/Checkout</h4>
                    </div>
                </div>

                <div className="py-4">
                    <div className="container">
{checkout_HTMl}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout