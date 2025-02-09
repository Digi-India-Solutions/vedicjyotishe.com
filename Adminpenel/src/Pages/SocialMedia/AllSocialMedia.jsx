import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllSocialMedia = () => {
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSocialMediaData = async () => {
            try {
                const response = await axios.get('https://www.api.vedicjyotishe.com/api/get-all-vedio');
                if (response.data.success) {
                    setSocialMediaData(response.data.data);
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
                const response = await axios.delete(`https://www.api.vedicjyotishe.com/api/delete-vedio/${id}`);
                if (response.data.success) {
                    toast.success("Social media link deleted successfully!");
                    setSocialMediaData((prevData) => prevData.filter(item => item._id !== id));
                } else {
                    toast.error(response.data.message || "Failed to delete the link.");
                }
            } catch (error) {
                toast.error("An error occurred while deleting the link.");
                console.error(error);
            }
        }
    };

       // Function to transform YouTube URL to embed URL
       const getEmbedUrl = (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Social Media </h4>
                </div>
                <div className="links">
                    <Link to="/add-social-media" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                            <th scope="col">Video</th>
                            <th scope="col">Content Heading</th>
                            <th scope="col">Content Details</th>
                            <th scope="col">Show in home page</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="text-center">Loading...</td>
                            </tr>
                        ) : socialMediaData.length > 0 ? (
                            socialMediaData.map((item, index) => (
                                <tr key={item._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <iframe
                                            width="500"
                                            height="200"
                                            src={getEmbedUrl(item.link)}
                                            title={item.contentHeading}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </td>
                                    <td>{item.contentHeading}</td>
                                    <td>{item.contentDetails}</td>
                                    <td>{item.activeStatus ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Link to={`/edit-social-media/${item._id}`} className="bt edit">
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

export default AllSocialMedia;
