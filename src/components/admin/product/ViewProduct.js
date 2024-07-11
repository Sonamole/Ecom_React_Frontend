import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ViewProduct() {

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title="View Product";//document: This is a global object that represents the entire HTML document.Tile represents the title of the document, which is typically displayed in the browser's title bar or tab.View Product is the name of that
        axios.get('/api/view-product').then(response=>{
            if(response.data.status===200)
            {
                console.log(response.data.products);
                setProduct(response.data.products);
                setLoading(false)
            }
        })

    }, [])
var display_Productdata="";

    if(loading)
        {
        return <h4>Loading View Products</h4>
        }
    else
        {
            var ProdStatus='';
            display_Productdata=  product.map((item)=>{
                if(item.status=='0')
                {
                    ProdStatus='Shown';
                }
                else if(item.status=='1')
                {
                    ProdStatus='Hidden';
                }
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name}/></td>
                    <td>
                        <Link to={`/admin/edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
                    </td>
                    <td>
                         {ProdStatus}
                        </td>

                </tr>
            )

        })
        }

  return (
    <div className="card px-4 mt-3">
        <div className="card-header">
            <h4>
                <Link to='/admin/add-product' className='btn btn-primary btn-sm float-end'>View Product</Link>
            </h4>
        </div>

        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                           <th>ID</th>
                           <th>Category name</th>
                           <th>Product Name</th>
                           <th>Selling Price</th>
                           <th>Image</th>
                           <th>Edit</th>
                           <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display_Productdata}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  )
}

export default ViewProduct