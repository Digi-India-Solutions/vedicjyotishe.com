import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSocialMedia = () => {
    const [formData, setFormData] = useState({
        link: '',
        contentHeading: '',
        contentDetails: '',
        activeStatus: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        const { link, contentHeading, contentDetails } = formData;
        if (!link || !contentHeading || !contentDetails) {
            toast.error("All fields are required.");
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post('https://www.api.vedicjyotishe.com/api/create-social-media', formData);
            if (response.status===200) {
                toast.success("Social media link added successfully!");
                navigate('/all-social-media'); 
            } else {
                toast.error(response.data.message || "Failed to add social media link.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the social media link.");
            console.error(error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Social Media</h4>
                </div>
                <div className="links">
                    <Link to="/all-social-media" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="link" className="form-label">YouTube Link</label>
                        <input 
                            type="text" 
                            name='link' 
                            className="form-control" 
                            id="link" 
                            value={formData.link}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="contentHeading" className="form-label">Content Heading</label>
                        <input 
                            type="text" 
                            name='contentHeading' 
                            className="form-control" 
                            id="contentHeading" 
                            value={formData.contentHeading}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="contentDetails" className="form-label">Content Details</label>
                        <textarea 
                            name="contentDetails" 
                            id="contentDetails" 
                            className="form-control" 
                            rows={5}
                            value={formData.contentDetails}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="col-md-12">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name="activeStatus" 
                                id="active" 
                                checked={formData.activeStatus}
                                onChange={handleChange} 
                            />
                            <label className="form-check-label" htmlFor="active">
                                Active
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Social Media"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddSocialMedia;
