import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewCategory() {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    //In your useEffect hook, you want to perform an asynchronous task (like fetching data) when the component mounts. However, sometimes the component might unmount before the task completes. If you try to update the component's state after it has unmounted, it can cause errors.

    useEffect(() => { //// Initially, when the useEffect runs, we assume the component is mounted.
        let isMountered = true //This flag helps us keep track of whether the component is currently mounted.Mounting refers to the moment when a React component is inserted into the DOM (Document Object Model) and becomes visible to the user.This happens when the component is first created and rendered.
        axios.get('/api/getCategory').then(response => {
            //When the response comes back, you first check if the component is still mounted (isMountered is true). If it is, you update the component's state.
            if (isMountered) {
                if (response.data.status) {
                    // console.log(response.data.category);
                    setCategory(response.data.category)
                    setLoading(false)
                }
            }
        });

        //The cleanup function runs when the component is about to unmount. It sets isMountered to false, indicating that the component is no longer mounted.Unmounting refers to the moment when a React component is removed from the DOM.
        return () => {
            isMountered = false;
        }

    }, []);
//Mounting: Your component appears on the screen. useEffect runs, and isMountered is set to true.
// Data Fetching: You fetch data from an API. This takes some time, so it happens in the background.
// Check Before State Update: When the data comes back, you check if the component is still on the screen (isMountered is true). If yes, you update the state.
// Unmounting: If the user navigates away or the component is removed from the screen before the data comes back, the cleanup function runs and sets isMountered to false.
// Preventing Errors: If the data comes back after the component has unmounted, the state won't be updated because isMountered is false.

    if (loading) {
        return <h4>Loading category</h4>
    }
    else {
        var showCategoryList = '';
        showCategoryList = category.map(item => {
            return (
                <div className="col-md-4" key={item.id} >
                    <div className="card">
                        <Link to="">
                            <img src="" className='w-100' alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`/collections/${item.slug}`}>
                                <h5>{item.name} </h5>
                            </Link>

                        </div>

                    </div>
                </div>

            )
        })
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Category Page</h4>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ViewCategory