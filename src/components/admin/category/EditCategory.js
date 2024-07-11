import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

function EditCategory(props) {

    const navigate=useNavigate();
    const {id}=useParams();

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState([]);




    useEffect(() => {

        axios.get(`/api/edit-category/${id}`).then(response=>{
            if(response.data.status===200)
            {
                setCategory(response.data.category)

            }
            else if(response.data.status===404){
                swal("Error",response.data.message,"error")
                navigate('/admin/view-category')
            }
            setLoading(false)

        });


    }, [id,navigate]); //he dependency array [id, navigate] specifies when the useEffect hook should run. It will run the effect whenever id or navigate changes. This ensures the effect runs whenever the category ID or the navigation function changes.

    const handleInput = (e) => {
        const {
            name,
            value,
            type,
            checked } = e.target;
        setCategory({
            ...category,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const updateCategory = (e) => {
        e.preventDefault();
        const data=category;
        axios.put(`/api/update-category/${id}`,data).then(response=>{
            if(response.data.status===200)
            {
                swal("Success",response.data.message,"success")
                setError([]);
                navigate('/admin/view-category');
            }
            else if(response.data.status===422)
            {
               swal("All fields are mandatory","","error")
               setError(response.data.errors);
            }
            else if (response.data.status===404)
            {
                swal("Error",response.data.message,"error")
                navigate('/admin/view-category')
            }

        });

    }

    if(loading)
        {
            return  <h4>Loading Edit Category</h4>
        }



    return (

        <div className="container px-4">
            <div className="card mt-4">
                <h1>Edit Category</h1>


                <form onSubmit={updateCategory} >
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="home-tab-pane"
                                aria-selected="true"
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="seo-tags-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#seo-tags"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected="false"
                            >
                                Seo Tags
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div
                            className="tab-pane fade show active"
                            id="home-tab-pane"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                        >
                            <div className="card p-3">
                                <div className="mb-3">
                                    <label className="form-label">Slug</label>
                                    <input
                                        type="text"
                                        onChange={handleInput}
                                        value={category.slug}
                                        className="form-control"
                                        name="slug"
                                    />
                                     <small className='text-danger'>{error.slug}</small>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        onChange={handleInput}
                                        value={category.name}
                                        className="form-control"
                                        name="name"
                                    />
                                    <small className='text-danger'>{error.name}</small>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        onChange={handleInput}
                                        value={category.description}
                                        className="form-control"
                                        name="description"
                                    ></textarea>
                                </div>
                                <div className="mb-3 form-check">
                                    <label>Status</label>
                                    <input
                                        type="checkbox"
                                        onChange={handleInput}
                                        checked={category.status}
                                        className="form-check-input"
                                        id="statusCheckbox"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="statusCheckbox"
                                    >
                                        Status (0 - shown, 1 - hidden)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                            <div className="card p-3">
                                <div className="mb-3">
                                    <label className="form-label">Meta title</label>
                                    <input
                                        type="text"
                                        onChange={handleInput}
                                        value={category.meta_title}
                                        className="form-control"
                                        name="meta_title"
                                    />
                                     <small className='text-danger'>{error.meta_title}</small>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Meta Keyword</label>
                                    <textarea
                                        onChange={handleInput}
                                        value={category.meta_keyword}
                                        className="form-control"
                                        name="meta_keyword"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Meta Description</label>
                                    <textarea
                                        onChange={handleInput}
                                        value={category.meta_description}
                                        className="form-control"
                                        name="meta_description"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary px-4 float-end" type="submit">
                        Udpate
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditCategory