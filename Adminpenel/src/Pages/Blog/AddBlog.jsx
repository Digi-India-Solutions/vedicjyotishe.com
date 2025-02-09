import axios from 'axios';
import JoditEditor from 'jodit-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        blogHeading: '',
        blogDetails: '',
        blogDescription: '',
        blogImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            blogImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('blogHeading', formData.blogHeading);
        dataToSend.append('blogDetails', formData.blogDetails);
        dataToSend.append('blogDescription', formData.blogDescription);
        if (formData.blogImage) {
            dataToSend.append('blogImage', formData.blogImage);
        }

        try {
            // Replace with your API endpoint
            const response = await axios.post('https://www.api.vedicjyotishe.com/api/add-blog', dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(response.status===200){
                toast.success('Blog added successfully!');
                navigate("/all-blogs")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Blog</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
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
                            required
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
                            required
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="blogDescription" className="form-label">Blog Description</label>
                        <JoditEditor
                            value={formData.blogDescription}
                            onChange={newContent => setFormData((prevData) => ({ ...prevData, blogDescription: newContent }))}
                            required
                            // config={{
                            //     placeholder: 'Blog Description.....',
                            //     height: 400, // Set height for the editor
                            // }}
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
                            required
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBlog;
