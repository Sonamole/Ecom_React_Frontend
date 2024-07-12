import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Cart() {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    var totalCartPrice=0;

    if(!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning","Login in to go to cart page", "error");

    }



    const handleDecrement = (cart_id) => {
        // Update the cart state using the setCart function
        setCart((cart) =>
            // Map over each item in the cart to create a new cart array with updated quantities
            cart.map((item) =>
                // Check if the current item's id matches the provided cart_id
                cart_id === item.id
                    // If the item ids match, create a new item object with updated product_qty
                    // Decrement the quantity by 1 if it's greater than 1, otherwise keep it at 0
                    ? {
                        ...item,
                        product_qty: item.product_qty > 1
                            ? item.product_qty - 1 // If product_qty is greater than 1, decrement it by 1
                            : 0 // If product_qty is 1 or less, set it to 0 (though in this case, we only decrement if > 1)
                    }
                    // If the item ids do not match, return the item as it is
                    : item
            )
        );
        // Call the updateCartQuantity function to update the quantity on the server
        updateCartQuantity(cart_id, "dec");
    };


    const handleIncrement = (cart_id) => {
        setCart((cart) =>
            cart.map((item) =>
                cart_id === item.id
                    ? { ...item, product_qty: item.product_qty < 10 ? item.product_qty + 1 : item.product_qty }
                    : item
            )
        );
        updateCartQuantity(cart_id, "inc");
    };

    function updateCartQuantity(cart_id, scope) {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(response => {
            if (response.data.status === 200) {
                // swal("Success", response.data.message, "success");
            }
        });
    }




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



    const deleteCartItem=(e,cart_id)=>{
        e.preventDefault();

        const thisClicked=e.currentTarget;
        thisClicked.innerText='Removing';

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(response=>{
            if(response.data.status===200)
            {
                swal('Success',response.data.message,"success")
                thisClicked.closest("tr").remove();
            }
            else if(response.data.status===404)
            {
                swal('Error',response.data.message,"error")
                thisClicked.innerText='Remove';


            }
        })
    }

    if (loading) {
        return <h4>Loading product detail</h4>;
    }

    var cart_HTMl='';
    if(cart.length>0)
    {
         cart_HTMl=
         <div className="table-responsive">
         <table className="table table-bordered">
             <thead>
                 <tr>
                     <th>Image</th>
                     <th>Product</th>
                     <th className='text-center'>Price</th>
                     <th className='text-center'>Quantity</th>
                     <th className='text-center'>Total Price</th>
                     <th>Remove</th>
                 </tr>
             </thead>
             <tbody>
                 {cart.map((item)=>{
totalCartPrice +=item.product.selling_price*item.product_qty;

                     return(
                         <tr>
                     <td width="10%">
                         <img src={`http://localhost:8000/${item.product.image}`} alt="" width="50px" height="50px"/>
                     </td>
                     <td>{item.product.name}</td>
                     <td width="15%" className='text-center'>{item.product.selling_price}</td>
                     <td  width="15%">
                         <div className="input-group">
                             <button type='button' onClick={()=>handleDecrement(item.id)} className='input-group-text'>-</button>
                             <div className="form-control text-center">{item.product_qty}</div>
                             <button type='button'onClick={()=>handleIncrement(item.id)}  className='input-group-text'>+</button>
                         </div>
                     </td>
                     <td width="15%" className='text-center'>{item.product.selling_price*item.product_qty}</td>
                     <td width="10%">
                     <button type='button' onClick={(e)=>deleteCartItem(e,item.id)} className='btn btn-danger btn-sm'>Remove</button>
                     </td>
                 </tr>

                     )
                 })}

             </tbody>
         </table>
     </div>
    }

    else{
        cart_HTMl=
        <div>
        <div className="table-responsive">
            <h4>Your shopping cart in empty</h4>
            </div>
            </div>
    }

    return (

        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Home /Cart</h4>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                            {cart_HTMl}
                        </div>
<div className="col-md-8">
    <div className="col-md-4">
        <div className="card card-body mt-3">
<h4>Subtotal:
    <span className='float-end'>{totalCartPrice}</span>
</h4>
<h4> Grand Total:
    <span className='float-end'>{totalCartPrice}</span>
</h4>
<Link to='/checkout' className='btn btn-primary'>Checkout</Link>
        </div>
    </div>
</div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default Cart