import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSocialMedia = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        link: '',
        contentHeading: '',
        contentDetails: '',
        activeStatus: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        const fetchSocialMediaData = async () => {
            try {
                const response = await axios.get(`https://api.vedicjyotishe.com/api/get-single-vedio/${id}`);
                if (response.data.success) {
                    setFormData(response.data.data);
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
    }, [id]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            const response = await axios.put(`https://api.vedicjyotishe.com/api/update-vedio/${id}`, formData);
            if (response.data.success) {
                toast.success("Social media link updated successfully!");
                navigate("/all-social-media")
            } else {
                toast.error(response.data.message || "Failed to update the link.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the link.");
            console.error(error);
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Social Media</h4>
                </div>
                <div className="links">
                    <Link to="/all-social-media" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
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
                                required 
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
                                required 
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
                                required 
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
                                disabled={btnLoading} 
                                className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                            >
                                {btnLoading ? "Please Wait..." : "Update Social Media"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditSocialMedia;
