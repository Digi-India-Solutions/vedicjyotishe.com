import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const AddService = () => {
    const [formData, setFormData] = useState({
        serviceName: '',
        serviceHeading: '',
        serviceDetails: '',
        sericePrice: '',
        sericeDiscount: '',
        sericeFinalPrice: '',
        serviceLogo: null,
        serviceImage: null,
        dropDownStatus: 'False'  // Initialize the dropDownStatus field
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    // Update final price based on price and discount
    useEffect(() => {
        if (formData.sericePrice && formData.sericeDiscount >= 0) {
            const discountedPrice = formData.sericePrice - (formData.sericePrice * formData.sericeDiscount / 100);
            setFormData((prevData) => ({
                ...prevData,
                sericeFinalPrice: discountedPrice.toFixed(2),
            }));
        }
    }, [formData.sericePrice, formData.sericeDiscount]);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Create form data for file upload
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post('https://www.api.vedicjyotishe.com/api/add-service', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/all-service');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating service');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="bread">
                <div className="head">
                    <h4>Add Service</h4>
                </div>
                <div className="links">
                    <Link to="/all-service" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label className="form-label">Service Name</label>
                        <input
                            type="text"
                            name="serviceName"
                            className="form-control"
                            placeholder="Service Name..."
                            value={formData.serviceName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-8">
                        <label className="form-label">Service Heading</label>
                        <input
                            type="text"
                            name="serviceHeading"
                            className="form-control"
                            placeholder="Service Heading"
                            value={formData.serviceHeading}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Service Details</label>
                        <textarea
                            name="serviceDetails"
                            className="form-control"
                            rows={5}
                            placeholder="Service Details..."
                            value={formData.serviceDetails}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Service Price</label>
                        <input
                            type="number"
                            name="sericePrice"
                            className="form-control"
                            placeholder="Service Price"
                            value={formData.sericePrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Service Discount (%)</label>
                        <input
                            type="number"
                            name="sericeDiscount"
                            className="form-control"
                            placeholder="Service Discount"
                            value={formData.sericeDiscount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Service Final Price</label>
                        <input
                            type="number"
                            name="sericeFinalPrice"
                            className="form-control"
                            placeholder="Service Final Price"
                            value={formData.sericeFinalPrice}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Service Logo</label>
                        <input
                            type="file"
                            name="serviceLogo"
                            className="form-control"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Service Image</label>
                        <input
                            type="file"
                            name="serviceImage"
                            className="form-control"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* DropDownStatus Field */}
                    <div className="col-md-4">
                        <label className="form-label">Drop Down Status</label>
                        <select
                            name="dropDownStatus"
                            className="form-control"
                            value={formData.dropDownStatus}
                            onChange={handleChange}
                        >
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'}`} disabled={isLoading}>
                            {isLoading ? "Please Wait..." : "Add Service"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddService;
