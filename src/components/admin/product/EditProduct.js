import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

function EditProduct() {

    const {id}=useParams();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);
    const [allcheckbox, setCheckboxes] = useState([])

    const [picture,setPicture]=useState([]);
    const [errorlist,setError]=useState([]);

    const [categorylist, setCategorylist] = useState([]);
    const [product, setProduct] = useState({
    category_id:'',
    slug:'',
    name:'',
    description:'',

    meta_title:'',
    meta_keyword:'',
    meta_description:'',

    selling_price:'',
    original_price:'',
    qty:'',
    brand:'',

});



const handleInput=(e)=>{
    e.persist();
    setProduct({...product,[e.target.name]:e.target.value})
}

const handleImage=(e)=>{
    e.persist();
    console.log({image:e.target.files[0]});
    setPicture({image:e.target.files[0]});

}

const handleCheckbox=(e)=>{
    e.persist();
    setCheckboxes({...allcheckbox,[e.target.name]:e.target.checked})
}

const updateProduct=(e)=>{
    e.preventDefault();

    const formData=new FormData()//FormData is a built-in JavaScript object used to construct a set of key/value pairs representing form fields and their values, which can be easily sent using the fetch API
    formData.append('image',picture.image);//This adds a key/value pair to the formData object.
    formData.append('category_id',product.category_id);
    formData.append('slug',product.slug);
    formData.append('name',product.name);
    formData.append('description',product.description);

    formData.append('meta_title',product.meta_title);
    formData.append('meta_keyword',product.meta_keyword);
    formData.append('meta_description',product.meta_description);

    formData.append('selling_price',product.selling_price);
    formData.append('original_price',product.original_price);
    formData.append('qty',product.qty);
    formData.append('brand',product.brand);
    formData.append('featured',allcheckbox.featured ? '1':'0');
    formData.append('popular',allcheckbox.popular ? '1':'0');
    formData.append('status',allcheckbox.status ? '1':'0');




      axios.post(`api/update-product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response=>{

        if(response.data.status===200)
        {
            console.log(allcheckbox);
            swal("Success",response.data.message,"success")//swal: This is the function from the SweetAlert library used to display a popup alert."Success": This is the title of the alert. It appears at the top of the popup."success": This is the type of alert. SweetAlert uses this string to style the alert with appropriate icons and colors to indicate success. Other possible types include "warning", "error", "info", etc.
            setError([]);
        }

        else if(response.data.status===422){
            swal("All fields are mandatory","","error")
            setError(response.data.errors)
        }
        else if(response.data.status===404){

            swal("Error",response.data.message,"error")
            navigate('/admin/view-product')
        }

    })
}


    useEffect(() => {
        axios.get(`/api/all-category`).then(response=>{
            if(response.data.status===200)
            {
                setCategorylist(response.data.category);
            }

        });

        axios(`/api/edit-product/${id}`).then(response=>{
           if(response.data.status===200)
           {
            console.log(response.data.product);
            setProduct(response.data.product);
            setCheckboxes(response.data.product);

           }
           else if(response.data.status===404)
           {
            swal('Error',response.data.message,"error");
            navigate('/admin/view-product')
           }
           setLoading(false);


        })

    }, [id,navigate]);

if(loading)
{
    return <h4>Edit Prodcut data is loading.....</h4>
}


    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="/admin/view-product" className="btn btn-primary bt-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                <form onSubmit={updateProduct} encType='multipart/form-data'>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seotags-tab" data-bs-toggle="pill" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">Seo-tags</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="pill" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other details</button>
                        </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane card-body border fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className="form-group mb-3">
                                <select name="category_id" onChange={handleInput} value={product.category_id} className='form-control'>
                                <option>Select Category</option>
                                    {
                                        categorylist.map((item)=>{
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }

                                </select>
                                <small className='text-danger'>{errorlist.category_id}</small>
                            </div>

                            <div className="form-group mb-3">
                                <label>Slug</label>
                                <input type="text"  onChange={handleInput} value={product.slug}  name='slug' className='form-control' />
                                <small className='text-danger'>{errorlist.slug}</small>
                            </div>

                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" onChange={handleInput} value={product.name}  name='name' className='form-control' />
                                <small className='text-danger'>{errorlist.name}</small>
                            </div>

                            <div className="form-group mb-3">
                                <label> Description</label>
                                <input type="text"  onChange={handleInput} value={product.description}  name='description' className='form-control' />
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotabs-tab">
                            <div className="form-group mb-3">
                                <label>Meta Title</label>
                                <input type="text"   onChange={handleInput} value={product.meta_title} name='meta_title' className='form-control' />
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Keyword</label>
                                <input type="text"  onChange={handleInput} value={product.meta_keyword}  name='meta_keyword' className='form-control' />
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Description</label>
                                <input type="text"  onChange={handleInput} value={product.meta_description}  name='meta_description' className='form-control' />
                                <small className='text-danger'>{errorlist.meta_title}</small>
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                            <div className="row">
                            <div className="col-md-4 form-group mb-3">
                                <label>Selling Price</label>
                                <input type="text" onChange={handleInput} value={product.selling_price}  name='selling_price' className='form-control' />
                                <small className='text-danger'>{errorlist.selling_price}</small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Original Price</label>
                                <input type="text"  onChange={handleInput} value={product.original_price} name='original_price' className='form-control' />
                                <small className='text-danger'>{errorlist.original_price}</small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label> Quantity</label>
                                <input type="text" onChange={handleInput} value={product.qty}  name='qty' className='form-control' />
                                <small className='text-danger'>{errorlist.qty}</small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Brand</label>
                                <input type="text"  onChange={handleInput} value={product.brand}  name='brand' className='form-control' />
                                <small className='text-danger'>{errorlist.brand}</small>
                            </div>
                            <div className="col-md-8 form-group mb-3">
                                <label>Image</label>
                                <input type="file"  onChange={handleImage} name='image' className='form-control' />
                                <img src={`http://localhost:8000/${product.image}`} width="50px"/>
                                <small className='text-danger'>{errorlist.image}</small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Featured (Checked-shown)</label>
                                <input type="checkbox"  onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ?  true:false}  name='featured' className='w-50 h-50' />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Popular (Checked-shown)</label>
                                <input type="checkbox"  onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true:false} name='popular'className='w-50 h-50' />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Status (Checked-hidden)</label>
                                <input type="checkbox"  onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false} name='status' className='w-50 h-50' />
                            </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary px-4 mt-2'>Submit</button>
                   </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct