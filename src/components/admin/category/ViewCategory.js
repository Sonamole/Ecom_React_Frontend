import React,{useState,useEffect} from 'react'
import { Link  } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
      axios.get('/api/view-category').then(response=>{
        // console.log(response.data.category);
        if(response.status===200)
        {
            setCategory(response.data.category)
        }
        setLoading(false);

      });

    }, [])

    const deleteCategory=(e,id)=>{
        e.preventDefault();
        const thisClicked=e.currentTarget;//  // Get the button element that was clicked
        thisClicked.innerText="Deleting";//  // Change the button text to "Deleting"

        axios.delete(`api/delete-category/${id}`).then(response=>{
            if(response.data.status===200)
            {
                swal("Success",response.data.message,"success");
                thisClicked.closest("tr").remove();// // Remove the entire table row that contains the clicked button

            }
            else if(response.data.status===404)
            {
                swal("Success",response.data.message,"success");
                thisClicked.innerText="Delete ";//// Change the button text back to "Delete"


            }

        })


    }

    var Viewcategory_HTMLTABLE='';
    if(loading)
    {
        return  <h4>Loading Category</h4>
    }
    else{
        Viewcategory_HTMLTABLE=
        category.map((item)=>{
            return(
                <tr key={item.id}>

                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>

                    <td><Link to={ `/admin/edit-category/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
                    <td><button type='button' onClick={(e)=>deleteCategory(e,item.id)} className='btn btn-danger btn-sm'>Delete</button></td>
                    {/* //e: The event object that is passed to the function when the button is clicked.Then passing the event object e and item.id as arguments. item.id represents the ID of the category you want to delete. */}
                </tr>
            )
        });
    }

  return (
  <div className="container px-4">
    <div className="card mt-4">
    <div className="card-header">
        <h4>Category List
        <Link to="/admin/add-category" className='btn btn-primary btn-sm float-end'>Add Category</Link>
        </h4>
    </div>

    <div className="card-body">
        <table className='table table-bordered table-striped '>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                 {Viewcategory_HTMLTABLE}
            </tbody>
        </table>
    </div>
  </div>
  </div>
  )
}

export default ViewCategory