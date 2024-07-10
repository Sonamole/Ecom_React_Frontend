import React, { useState, useEffect } from "react";
import { Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import swal from "sweetalert";

function AdminPrivateRoute() {

    const navigate = useNavigate();

    const [authenticated, setAuthenticated] = useState(false); //manages whether the user is authenticated
    const [loading, setLoading] = useState(true);//manages whether the component is still loading data.

    useEffect(() => { //runs once when the component(AdminPrivateRoute.js) mounts(renders) and whenever 'navigate' changes
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/checkingAuthenticated');
                if (response.status === 200) {
                    setAuthenticated(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    swal("Unauthorized", error.response.data.message, "warning");
                    navigate('/login');
                } else {
                    console.error("Error fetching authentication status:", error);
                }
            }
            setLoading(false); //Set loading state to false after fetching data
        };

        fetchData();

        // return () => {
        //     setAuthenticated(false); // reset authenticated state when component unmounts
        // };
    }, [navigate]); // useEffect dependencies array: re-run effect when 'navigate' changes






        axios.interceptors.response.use(function(response) { // use method takes two functions as arguments. The first function handles successful responses, and the second one handles errors.
            return response;
        },function(error)
        {
            if(error.response.status===403)//Access denied
            {
            swal("Forbidden",error.response.data.message,"warning")
            navigate('/403');
            }

            else if(error.response.status===404)//Page not found
            {
                swal("404 error",'Url/page not Found',"warning")
                navigate('/404');
            }
            return Promise.reject(error)
        }

        );







    if (loading) {
        return <h1>Loading...</h1>;
    }

    return authenticated ? (
        <MasterLayout>
            <Outlet /> {/* Renders child routes (/admin/dashboard) matched by the parent route (/admin/) component */}
        </MasterLayout>
    ) : (
        <Navigate to="/login" />
    );
}

export default AdminPrivateRoute;
