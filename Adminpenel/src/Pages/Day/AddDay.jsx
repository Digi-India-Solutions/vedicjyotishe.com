import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDay = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sunRiseTime: { hours: '00', minutes: '00', seconds: '00' },
        sunsetTime: { hours: '00', minutes: '00', seconds: '00' },
        moonRiseTime: { hours: '00', minutes: '00', seconds: '00' },
        moonsetTime: { hours: '00', minutes: '00', seconds: '00' }
    });

    const handleTimeChange = (e, field, timeType) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [timeType]: value
            }
        }));
    };

    const formatTime = ({ hours, minutes, seconds }) => `${hours}:${minutes}:${seconds}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formattedData = {
            sunRiseTime: formatTime(formData.sunRiseTime),
            sunsetTime: formatTime(formData.sunsetTime),
            moonRiseTime: formatTime(formData.moonRiseTime),
            moonsetTime: formatTime(formData.moonsetTime)
        };

        try {
            const response = await axios.post('https://www.api.vedicjyotishe.com/api/create-day', formattedData);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/all-panchang");
            }
            setFormData({
                sunRiseTime: { hours: '00', minutes: '00', seconds: '00' },
                sunsetTime: { hours: '00', minutes: '00', seconds: '00' },
                moonRiseTime: { hours: '00', minutes: '00', seconds: '00' },
                moonsetTime: { hours: '00', minutes: '00', seconds: '00' }
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal Server Error");
        } finally {
            setIsLoading(false);
        }
    };

    const generateOptions = (range) =>
        Array.from({ length: range }, (_, i) => (
            <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
        ));

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Day</h4>
                </div>
                <div className="links">
                    <Link to="/all-panchang" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    {['sunRiseTime', 'sunsetTime', 'moonRiseTime', 'moonsetTime'].map((timeField, index) => (
                        <div className="col-md-6" key={index}>
                            <label className="form-label">{timeField.replace(/([A-Z])/g, ' $1').trim()}</label>
                            <div className="row">
                                <div className="col-4">
                                    <select className="form-control" value={formData[timeField].hours} onChange={(e) => handleTimeChange(e, timeField, 'hours')}>
                                        {generateOptions(24)}
                                    </select>
                                    <span className="form-text">Hours</span>
                                </div>
                                <div className="col-4">
                                    <select className="form-control" value={formData[timeField].minutes} onChange={(e) => handleTimeChange(e, timeField, 'minutes')}>
                                        {generateOptions(60)}
                                    </select>
                                    <span className="form-text">Minutes</span>
                                </div>
                                <div className="col-4">
                                    <select className="form-control" value={formData[timeField].seconds} onChange={(e) => handleTimeChange(e, timeField, 'seconds')}>
                                        {generateOptions(60)}
                                    </select>
                                    <span className="form-text">Seconds</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Day"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddDay;
