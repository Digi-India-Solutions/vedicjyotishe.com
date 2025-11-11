import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSamvat = () => {
    const [formData, setFormData] = useState({
        Vikram: '',
        Shaka: '',
        Nakshatra: '',
        NakshatraTillDate: '',
        NakshatraTillTime: { hours: '', minutes: '', seconds: '' },
        Karan: '',
        KaranTillDate: '',
        KaranTillTime: { hours: '', minutes: '', seconds: '' }
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

        const { NakshatraTillDate, NakshatraTillTime, KaranTillDate, KaranTillTime } = formData;
        const newFormData = {
            ...formData,
            NakshatraTill: getFullDateTime(NakshatraTillDate, NakshatraTillTime),
            KaranTill: getFullDateTime(KaranTillDate, KaranTillTime)
        };

        try {
            const response = await axios.post('https://api.vedicjyotishe.com/api/create-samvat', newFormData);
            if(response.status===200){
                toast.success("New Samvat created successfully!");
                navigate("/all-panchang");
            }
        } catch (error) {
            toast.error("Error creating new Samvat");
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
                    <h4>Add Samvat</h4>
                </div>
                <div className="links">
                    <Link to="/all-panchang" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
            <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="Vikram" className="form-label">Vikram</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Vikram"
                            name="Vikram"
                            value={formData.Vikram}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Shaka" className="form-label">Shaka</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Shaka"
                            name="Shaka"
                            value={formData.Shaka}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="Nakshatra" className="form-label">Nakshatra</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Nakshatra"
                            name="Nakshatra"
                            value={formData.Nakshatra}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="NakshatraTillDate" className="form-label">NakshatraTill Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="NakshatraTillDate"
                            name="NakshatraTillDate"
                            value={formData.NakshatraTillDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="NakshatraTillTime" className="form-label">NakshatraTill Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="NakshatraTillTime.hours"
                                    value={formData.NakshatraTillTime.hours}
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
                                    name="NakshatraTillTime.minutes"
                                    value={formData.NakshatraTillTime.minutes}
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
                                    name="NakshatraTillTime.seconds"
                                    value={formData.NakshatraTillTime.seconds}
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
                        <label htmlFor="Karan" className="form-label">Karan</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Karan"
                            name="Karan"
                            value={formData.Karan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="KaranTillDate" className="form-label">KaranTill Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="KaranTillDate"
                            name="KaranTillDate"
                            value={formData.KaranTillDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="KaranTillTime" className="form-label">KaranTill Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="KaranTillTime.hours"
                                    value={formData.KaranTillTime.hours}
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
                                    name="KaranTillTime.minutes"
                                    value={formData.KaranTillTime.minutes}
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
                                    name="KaranTillTime.seconds"
                                    value={formData.KaranTillTime.seconds}
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
                            {isLoading ? "Please Wait..." : "Add Samvat"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddSamvat;
