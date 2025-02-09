import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTagline = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tagLine: '',  // Only tagLine based on your model
    });
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        const fetchTagLineData = async () => {
            try {
                const response = await axios.get(`https://www.api.vedicjyotishe.com/api/get-single-tagline/${id}`);
                if (response.status===200) {
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

        fetchTagLineData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            const response = await axios.put(`https://www.api.vedicjyotishe.com/api/update-tagline/${id}`, formData);
            if (response.status===200) {
                toast.success("Tagline updated successfully!");
                navigate("/all-tagline"); // Redirect after success
            } else {
                toast.error(response.data.message || "Failed to update the tagline.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the tagline.");
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
                    <h4>Edit Tagline</h4>
                </div>
                <div className="links">
                    <Link to="/all-taglines" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="tagLine" className="form-label">Tagline</label>
                            <textarea   name='tagLine'  id="tagLine"  className='form-control'
                                value={formData.tagLine}
                                onChange={handleChange} 
                                required ></textarea>
                        </div>
                        <div className="col-12 text-center">
                            <button 
                                type="submit" 
                                disabled={btnLoading} 
                                className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                            >
                                {btnLoading ? "Please Wait..." : "Update Tagline"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditTagline;
