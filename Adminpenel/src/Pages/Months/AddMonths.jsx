import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMonths = () => {
    const [formData, setFormData] = useState({
        Amanta: '',
        Purnimanta: '',
        Tithi: '',
        TithiTillDate: '',
        TithiTillTime: { hours: '', minutes: '', seconds: '' },
        Yog: '',
        YogTillDate: '',
        YogTillTime: { hours: '', minutes: '', seconds: '' }
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("Time")) {
            const [timeType] = name.split('.');
            setFormData({
                ...formData,
                [timeType]: {
                    ...formData[timeType],
                    [name.split('.')[1]]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const getFullDateTime = (date, time) => {
        return `${date}T${time.hours}:${time.minutes}:${time.seconds}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { TithiTillDate, TithiTillTime, YogTillDate, YogTillTime } = formData;
        const newFormData = {
            ...formData,
            TithiTill: getFullDateTime(TithiTillDate, TithiTillTime),
            YogTill: getFullDateTime(YogTillDate, YogTillTime)
        };

        try {
            const response = await axios.post('https://www.api.vedicjyotishe.com/api/create-month', newFormData);
            if(response.status===200){
                toast.success("New Month created successfully!");
                navigate("/all-panchang");
            }
        } catch (error) {
            toast.error("Error creating new month");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderDropdown = (type, range) => (
        range.map((num) => (
            <option key={num} value={num}>
                {num.toString().padStart(2, '0')}
            </option>
        ))
    );

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Months</h4>
                </div>
                <div className="links">
                    <Link to="/all-panchang" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="Amanta" className="form-label">Amanta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Amanta"
                            name="Amanta"
                            value={formData.Amanta}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Purnimanta" className="form-label">Purnimanta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Purnimanta"
                            name="Purnimanta"
                            value={formData.Purnimanta}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="Tithi" className="form-label">Tithi</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Tithi"
                            name="Tithi"
                            value={formData.Tithi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="TithiTillDate" className="form-label">TithiTill Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="TithiTillDate"
                            name="TithiTillDate"
                            value={formData.TithiTillDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="TithiTillTime" className="form-label">TithiTill Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="TithiTillTime.hours"
                                    value={formData.TithiTillTime.hours}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected disabled>Hours</option>
                                    {renderDropdown('hours', Array.from({ length: 24 }, (_, i) => i))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="TithiTillTime.minutes"
                                    value={formData.TithiTillTime.minutes}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected disabled>Minutes</option>
                                    {renderDropdown('minutes', Array.from({ length: 60 }, (_, i) => i))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="TithiTillTime.seconds"
                                    value={formData.TithiTillTime.seconds}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected disabled>Seconds</option>
                                    {renderDropdown('seconds', Array.from({ length: 60 }, (_, i) => i))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="Yog" className="form-label">Yog</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Yog"
                            name="Yog"
                            value={formData.Yog}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="YogTillDate" className="form-label">YogTill Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="YogTillDate"
                            name="YogTillDate"
                            value={formData.YogTillDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="YogTillTime" className="form-label">YogTill Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="YogTillTime.hours"
                                    value={formData.YogTillTime.hours}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected disabled>Hours</option>
                                    {renderDropdown('hours', Array.from({ length: 24 }, (_, i) => i))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="YogTillTime.minutes"
                                    value={formData.YogTillTime.minutes}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected disabled>Minutes</option>
                                    {renderDropdown('minutes', Array.from({ length: 60 }, (_, i) => i))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="YogTillTime.seconds"
                                    value={formData.YogTillTime.seconds}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected disabled>Seconds</option>
                                    {renderDropdown('seconds', Array.from({ length: 60 }, (_, i) => i))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Month"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMonths;
