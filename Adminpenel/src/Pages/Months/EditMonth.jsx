import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMonth = () => {
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
    const { id } = useParams(); // Assuming you have the month ID in the URL

    const parseDateTime = (dateTime) => {
        if (!dateTime) {
            return { date: '', time: { hours: '', minutes: '', seconds: '' } };
        }
        const [date, time] = dateTime.split('T');
        const [hours, minutes, seconds] = time.split(':');
        return { date, time: { hours, minutes, seconds } };
    };

    useEffect(() => {
        const fetchMonthDetails = async () => {
            try {
                const response = await axios.get(`https://api.vedicjyotishe.com/api/get-month/${id}`);
                const { TithiTill, YogTill, ...monthData } = response.data.data; // Adjusted to access data correctly

                console.log('TithiTill:', TithiTill);
                console.log('YogTill:', YogTill);

                // Check if TithiTill and YogTill are valid before parsing
                const TithiTillParsed = parseDateTime(TithiTill);
                const YogTillParsed = parseDateTime(YogTill);

                setFormData({
                    ...monthData,
                    TithiTillDate: TithiTillParsed.date,
                    TithiTillTime: TithiTillParsed.time,
                    YogTillDate: YogTillParsed.date,
                    YogTillTime: YogTillParsed.time
                });
            } catch (error) {
                console.log(error);
                toast.error("Error fetching month details.");
            }
        };

        fetchMonthDetails();
    }, [id]);

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
        const updatedFormData = {
            ...formData,
            TithiTill: getFullDateTime(TithiTillDate, TithiTillTime),
            YogTill: getFullDateTime(YogTillDate, YogTillTime)
        };

        try {
            const response = await axios.put(`https://api.vedicjyotishe.com/api/update-month/${id}`, updatedFormData);
            if (response.status === 200) {
                toast.success("Month updated successfully!");
                navigate("/all-panchang");
            }
        } catch (error) {
            toast.error("Error updating month");
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
                    <h4>Edit Month</h4>
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
                        <label htmlFor="TithiTillDate" className="form-label">Tithi Till Date</label>
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
                        <label htmlFor="TithiTillTime" className="form-label">Tithi Till Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="TithiTillTime.hours"
                                    value={formData.TithiTillTime.hours}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Hours</option>
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
                                    <option value="" disabled>Minutes</option>
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
                                    <option value="" disabled>Seconds</option>
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
                        <label htmlFor="YogTillDate" className="form-label">Yog Till Date</label>
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
                        <label htmlFor="YogTillTime" className="form-label">Yog Till Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="YogTillTime.hours"
                                    value={formData.YogTillTime.hours}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Hours</option>
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
                                    <option value="" disabled>Minutes</option>
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
                                    <option value="" disabled>Seconds</option>
                                    {renderDropdown('seconds', Array.from({ length: 60 }, (_, i) => i))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Month'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditMonth;
