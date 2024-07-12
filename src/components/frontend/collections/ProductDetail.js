import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProductDetail() {


    const navigate = useNavigate();
    const {product_slug, category_slug } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(response => {
            if (isMounted) {
                if (response.data.status === 200) {
                    setProduct(response.data.product);
                    setLoading(false);
                } else if (response.data.status === 404) {
                    navigate('/collections');
                    swal("Warning", response.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [product_slug, category_slug, navigate]);

     //Quantity Increment and Decrement in Hooks
     const handleDecrement=()=>{
        if(quantity>1)
        {
            setQuantity(prevCount=>prevCount-1)
        }

    }

    const handleIcrement=()=>{
        if(quantity<10)
            {
        setQuantity(prevCount=>prevCount+1)
            }
    }

    const submitAddtoCart=(e)=>{
        e.preventDefault();
        const data={
            product_id:product.id,
            product_qty:quantity
        }
        // console.log(data);

        axios.post('/api/add-to-cart',data).then(response=>{
            console.log(response);
            if(response.data.status===201)
            {
                console.log(response);
                swal("Success",response.data.message,"success")
            }
            else if(response.data.status===409)
            {
                swal("Warning",response.data.message,"warning")
            }
            else if(response.data.status===401)
            {
                swal("Error",response.data.message,"error")
            }
            else if(response.data.status===404)
            {
                swal("Warning",response.data.message,"warning")
            }

        })
    }

    if (loading) {
        return <h4>Loading product detail</h4>;
    }
    else {
        var avail_stock = '';
        if (product.qty > 0) {

            avail_stock = <div>
                <label className='btn-sm btn-success px-4 mt-2'>In stock</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>

                            <div type='text' className='form-control text-center'>
                                {quantity}
                            </div>
                            <button type='button'  onClick={handleIcrement}  className='input-group-text'>+</button>
                        </div>
                    </div>
                    <div className="col-md-3 mt-2">
                        <button type='button' onClick={submitAddtoCart} className='btn btn-primary w-100'>Add to cart</button>
                    </div>
                </div>
            </div>
        }

        else {
            avail_stock = <div>
                <label className='btn-sm btn-danger px-4 mt-2'>Out of stock</label>
            </div>

        }

    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Collections /{product.category.name} /{product.name}</h4>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`http://localhost:8000/${product.image}`} alt={product.name} className='w-100' />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {product.name}
                                <span className='float-end badge btn-sm btn-danger badge-pill'>{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className='mb-1'>
                                {product.selling_price}
                                <s className='ms-2'>{product.original_price}</s>
                            </h4>
                            <div>

                                {avail_stock}

                            </div>
                            <button type='button' className='btn btn-danger mt-3'> Add to wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProductDetail