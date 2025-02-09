import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDay = () => {
    const [dayData, setDayData] = useState({
        sunRiseTime: { hours: '00', minutes: '00', seconds: '00' },
        sunsetTime: { hours: '00', minutes: '00', seconds: '00' },
        moonRiseTime: { hours: '00', minutes: '00', seconds: '00' },
        moonsetTime: { hours: '00', minutes: '00', seconds: '00' }
    });
    const [btnLoading, setBtnLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDayData = async () => {
            try {
                const response = await axios.get(`https://www.api.vedicjyotishe.com/api/get-day/${id}`);
                if (response.status === 200) {
                    const { sunRiseTime, sunsetTime, moonRiseTime, moonsetTime } = response.data.data;
                    setDayData({
                        sunRiseTime: parseTime(sunRiseTime),
                        sunsetTime: parseTime(sunsetTime),
                        moonRiseTime: parseTime(moonRiseTime),
                        moonsetTime: parseTime(moonsetTime),
                    });
                } else {
                    toast.error("Failed to load day data");
                }
            } catch (error) {
                toast.error("Error fetching day data");
            }
        };
        fetchDayData();
    }, [id]);

    const parseTime = (time) => {
        const [hours, minutes, seconds] = time.split(":");
        return { hours, minutes, seconds };
    };

    const handleTimeChange = (e, field, timeType) => {
        const { value } = e.target;
        setDayData((prev) => ({
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
        setBtnLoading(true);

        const formattedData = {
            sunRiseTime: formatTime(dayData.sunRiseTime),
            sunsetTime: formatTime(dayData.sunsetTime),
            moonRiseTime: formatTime(dayData.moonRiseTime),
            moonsetTime: formatTime(dayData.moonsetTime)
        };

        try {
            const response = await axios.put(`https://www.api.vedicjyotishe.com/api/update-day/${id}`, formattedData);
            if (response.status === 200) {
                toast.success("Day record updated successfully");
                navigate("/all-panchang");
            } else {
                toast.error("Failed to update day record");
            }
        } catch (error) {
            toast.error("Error updating day record");
        } finally {
            setBtnLoading(false);
        }
    };

    const generateOptions = (range) =>
        Array.from({ length: range }, (_, i) => (
            <option key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
            </option>
        ));

    return (
        <>
            <ToastContainer />
            <div className="container">
                <div className="bread mb-4">
                    <div className="head">
                        <h4>Edit Day</h4>
                    </div>
                    <div className="links">
                        <Link to="/all-panchang" className="btn btn-secondary">
                            Back <i className="fa-regular fa-circle-left"></i>
                        </Link>
                    </div>
                </div>

                <div className="d-form">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        {['sunRiseTime', 'sunsetTime', 'moonRiseTime', 'moonsetTime'].map((timeField, index) => (
                            <div className="col-md-6" key={index}>
                                <label className="form-label">{timeField.replace(/([A-Z])/g, ' $1').trim()}</label>
                                <div className="row g-2">
                                    <div className="col-md-4">
                                        <select
                                            className="form-select"
                                            value={dayData[timeField].hours}
                                            onChange={(e) => handleTimeChange(e, timeField, 'hours')}
                                        >
                                            {generateOptions(24)}
                                        </select>
                                        <span className="form-text">Hours</span>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className="form-select"
                                            value={dayData[timeField].minutes}
                                            onChange={(e) => handleTimeChange(e, timeField, 'minutes')}
                                        >
                                            {generateOptions(60)}
                                        </select>
                                        <span className="form-text">Minutes</span>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className="form-select"
                                            value={dayData[timeField].seconds}
                                            onChange={(e) => handleTimeChange(e, timeField, 'seconds')}
                                        >
                                            {generateOptions(60)}
                                        </select>
                                        <span className="form-text">Seconds</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-12 text-center">
                            <button
                                type="submit"
                                className={`btn btn-primary ${btnLoading ? 'disabled' : ''}`}
                                disabled={btnLoading}
                            >
                                {btnLoading ? "Please Wait..." : "Update Day Record"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

export default EditDay;
