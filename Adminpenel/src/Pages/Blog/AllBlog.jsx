import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'bootstrap';

const AllBlog = () => {
    const [blogs, setBlogs] = useState([]); // State to hold blog data
    const [selectedImage, setSelectedImage] = useState(''); // State to hold selected image for modal
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('https://www.api.vedicjyotishe.com/api/get-blog');
            if (response.data.success) {
                setBlogs(response.data.data); // Set blogs state with the fetched data
            } else {
                toast.error('Failed to fetch blogs.'); // Handle error
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching blogs.'); // Handle error
        }
    };

    useEffect(() => {
        fetchBlogs(); // Call the fetch function
    }, []);

    // Function to open the modal with the selected image
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true); // Show the modal
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage(''); // Clear the image when closing the modal
    };

    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete("https://www.api.vedicjyotishe.com/api/delete-blog/" + id)
            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message)
                fetchBlogs()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Blogs</h4>
                </div>
                <div className="links">
                    <Link to="/add-blog" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order</option>
                        <option>Descending Order</option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Blog Heading</th>
                            <th scope="col">Blog Details</th>
                            <th scope="col">Blog Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={blog._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{blog.blogHeading}</td>
                                <td>{blog.blogDetails}</td>
                                <td>
                                    <img
                                        src={`https://www.api.vedicjyotishe.com/${blog.blogImage}`}
                                        alt={blog.blogHeading}
                                        style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                                        onClick={() => handleImageClick(`https://www.api.vedicjyotishe.com/${blog.blogImage}`)} // Set the image source when clicked
                                    />
                                </td>
                                <td>
                                    <Link to={`/edit-blog/${blog._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                </td>
                                <td>
                                    <button className="bt delete" onClick={() => deleteBlog(blog._id)}>Delete <i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Modal for displaying selected image */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="imageModalLabel">Blog Image</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedImage} alt="Selected Blog" className="img-fluid" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllBlog;
