import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewProduct() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const productCount = product.length;

    useEffect(() => {
        let isMounted = true;
        const product_slug = slug;
        axios.get(`/api/fetchproducts/${product_slug}`).then(response => {
            if (isMounted) {
                if (response.data.status === 200) {
                    console.log(response.data.product_data.product);
                    setProduct(response.data.product_data.product);
                    setCategory(response.data.product_data.category);
                    setLoading(false);
                } else if (response.data.status === 400) {
                    swal("Warning", response.data.message, "");
                } else if (response.data.status === 404) {
                    navigate('/collections');
                    swal("Warning", response.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [slug, navigate]);

    if (loading) {
        return <h4>Loading products</h4>;
    } else {
        var showProductList = '';

        if (productCount) {
            showProductList = product.map((item, idx) => {
                return (
                    <div className="col-md-3" key={idx}>
                        <div className="card">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                            {/* <img src="http://localhost:8000/uploads/product/example.jpg" /> */}
                                <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            showProductList = (
                <div className="col-md-12">
                    <h4>No Products Available for {category.name}</h4>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Collections / {category.name}</h4>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
