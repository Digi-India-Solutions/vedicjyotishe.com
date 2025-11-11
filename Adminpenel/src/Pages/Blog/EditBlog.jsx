import axios from 'axios';
import JoditEditor from 'jodit-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBlog = () => {
    const { id } = useParams(); // Get blog ID from URL parameters
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [formData, setFormData] = useState({
        blogHeading: '',
        blogDetails: '',
        blogDescription: '',
        blogImage: null,
    });

    // Fetch blog data by ID on component load
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://api.vedicjyotishe.com/api/get-single-blog/${id}`);
                if (response.data.success) {
                    const { blogHeading, blogDetails, blogDescription, blogImage } = response.data.data;
                    setFormData({
                        blogHeading,
                        blogDetails,
                        blogDescription,
                        blogImage: null, // Set initial image to null for possible new upload
                    });
                } else {
                    toast.error('Failed to load blog details.');
                }
            } catch (error) {
                toast.error('Error fetching blog details.');
            }
        };

        fetchBlog();
    }, [id]);

    // Handle input field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change for image
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            blogImage: e.target.files[0],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('blogHeading', formData.blogHeading);
        dataToSend.append('blogDetails', formData.blogDetails);
        dataToSend.append('blogDescription', formData.blogDescription);
        if (formData.blogImage) {
            dataToSend.append('blogImage', formData.blogImage);
        }

        try {
            const response = await axios.put(`https://api.vedicjyotishe.com/api/update-blog/${id}`, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Blog updated successfully!');
                navigate("/all-blogs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Blog</h4>
                </div>
                <div className="links">
                    <Link to="/all-blogs" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="blogHeading" className="form-label">Blog Heading</label>
                        <input
                            type="text"
                            name='blogHeading'
                            className="form-control"
                            id="blogHeading"
                            placeholder='Blog Heading.......'
                            value={formData.blogHeading}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="blogDetails" className="form-label">Blog Details</label>
                        <textarea
                            name="blogDetails"
                            id="blogDetails"
                            className='form-control'
                            rows={5}
                            placeholder='Blog Details.....'
                            value={formData.blogDetails}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="blogDescription" className="form-label">Blog Description</label>
                        <JoditEditor
                            value={formData.blogDescription}
                            onChange={newContent => setFormData((prevData) => ({ ...prevData, blogDescription: newContent }))}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="blogImage">Blog Image</label>
                        <input
                            type="file"
                            name="blogImage"
                            id="blogImage"
                            className='form-control'
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={btnLoading} className={`${btnLoading ? 'not-allowed' : 'allowed'}`}>
                            {btnLoading ? "Please Wait..." : "Update Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBlog;
