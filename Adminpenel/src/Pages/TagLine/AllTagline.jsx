import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTagline = () => {
    const [tagline, setTagline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSocialMediaData = async () => {
            try {
                const response = await axios.get('https://api.vedicjyotishe.com/api/get-tagline');
                console.log(response)
                if (response.status===200) {
                    setTagline(response.data.data);
                } else {
                    toast.error(response.data.message || "Failed to fetch data.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching data.");
                console.error(error);
            } finally {
                setIsLoading(false); // End loading
            }
        };

        fetchSocialMediaData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                // Make your DELETE request here
                const response = await axios.delete(`https://api.vedicjyotishe.com/api/delete-tagline/${id}`);
                if (response.status===200) {
                    toast.success("Tag Line deleted successfully!");
                    setTagline((prevData) => prevData.filter(item => item._id !== id));
                } else {
                    toast.error(response.data.message || "Failed to delete the link.");
                }
            } catch (error) {
                toast.error("An error occurred while deleting the link.");
                console.error(error);
            }
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Tag Line </h4>
                </div>
                <div className="links">
                    <Link to="/add-tagline" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Tag Line</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="text-center">Loading...</td>
                            </tr>
                        ) : tagline.length > 0 ? (
                            tagline.map((item, index) => (
                                <tr key={item._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.tagLine}</td>
                                    <td>
                                        <Link to={`/edit-tagline/${item._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(item._id)}>
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default AllTagline;
