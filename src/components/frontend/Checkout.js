import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Checkout() {

    const navigate = useNavigate();
    if(!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning","Login in to go to cart page", "error");

    }

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    var totalCartPrice=0;




    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/cart`).then(response => {
            console.log(response);
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

    if (loading) {
        return <h4>Loading Checkout</h4>;
    }

    return (
        <div>
            <div>
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h4>Checkout /Cart</h4>
                    </div>
                </div>

                <div className="py-4">
                    <div className="container">
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
                                                    <input type="text" name='firstname' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label >Last Name</label>
                                                    <input type="text" name='lastname' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3" >
                                                    <label >Phone number</label>
                                                    <input type="text" name='phone' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label >Email Address</label>
                                                    <input type="text" name='email' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-3">
                                                    <label > Full address</label>
                                                        <textarea rows="3" className='form-control' name="" id=""></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >City</label>
                                                    <input type="text" name='city' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >State</label>
                                                    <input type="text" name='state' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >Zipcode</label>
                                                    <input type="text" name='zipcode' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group mb-3" >
                                                    <label >Phone number</label>
                                                    <input type="text" name='firstname' className='form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group text-end" >

                                                    <button type="text" className='btn btn-primary'>Checkout</button>
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
        {cart.map((item,idx) => {
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
                <td  colSpan="2" className='text-end fw-bold'>Grand total:</td>
                <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
            </tr>
        </tbody>
    </table>
</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout