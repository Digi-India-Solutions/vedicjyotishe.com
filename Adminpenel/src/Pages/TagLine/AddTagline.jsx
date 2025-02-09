import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTagline = () => {
    const [formData, setFormData] = useState({
        tagLine: '', // Field for tagLine
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { tagLine } = formData;
        if (!tagLine) {
            toast.error("Tagline is required.");
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post('https://www.api.vedicjyotishe.com/api/create-tagline', formData); // Update with correct API endpoint
            if (response.status === 201) {
                toast.success("Tagline added successfully!");
                navigate('/all-tagline'); // Redirect to all taglines page
            } else {
                toast.error(response.data.message || "Failed to add tagline.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the tagline.");
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
                    <h4>Add Tagline</h4>
                </div>
                <div className="links">
                    <Link to="/all-tagline" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="tagLine" className="form-label">Tagline</label>
                        <textarea name="tagLine" id="" value={formData.tagLine} className="form-control"
                            onChange={handleChange} ></textarea>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Tagline"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddTagline;
