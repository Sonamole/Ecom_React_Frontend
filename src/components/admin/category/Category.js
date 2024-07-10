import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Category() {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: false,
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: [],
    });

    const handleInput = (e) => { // Define a function to handle input changes.
        const {
            name, // Get the name attribute of the input element.
            value, // Get the value of the input element.
            type, // Get the type of the input element (text, checkbox, etc.).
            checked // Get the checked state of the input element (if checkbox).
        } = e.target; // Destructure properties from the event target.
        setCategory({
            ...category, // Copy the existing state.
            [name]: type === 'checkbox' ? checked : value, // Update the specific input based on its name.
        });
    };


    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug: category.slug,
            name: category.name,
            description: category.description,
            status: category.status,
            meta_title: category.meta_title,
            meta_keyword: category.meta_keyword,
            meta_description: category.meta_description,
        };

        axios.post('api/store-category', data).then((response) => {
            if (response.data.status === 200) {
                swal('Success', response.data.message, 'success');
                setCategory({//// Reset the form fields to their initial state(after form submission)
                    slug: '',
                    name: '',
                    description: '',
                    status: false,
                    meta_title: '',
                    meta_keyword: '',
                    meta_description: '',
                    error_list: [],
                });
            } else if (response.data.status === 401) {
                setCategory({ ...category, error_list: response.data.errors });
            }
        });
    };

    const display_errors = []; // Initialize an array to hold error messages.
    if (category.error_list) { // If there are errors in the error_list:
        if (category.error_list.slug) display_errors.push(category.error_list.slug); // Add slug errors to display_errors.
        if (category.error_list.name) display_errors.push(category.error_list.name); // Add name errors to display_errors.
        if (category.error_list.meta_title) display_errors.push(category.error_list.meta_title); // Add meta_title errors to display_errors.
    }


    return (
        <div className="container mt-4">
            <h1>Add Category</h1>

            {display_errors.map((item, index) => (
                <p key={index}>{item}</p>
            ))}

            <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Category;
