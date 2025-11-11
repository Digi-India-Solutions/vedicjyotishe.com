import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSamvat = () => {
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
                const response = await axios.get(`https://api.vedicjyotishe.com/api/get-samvat/${id}`);
                const { NakshatraTill, KaranTill, ...monthData } = response.data.data; // Adjusted to access data correctly

                console.log('NakshatraTill:', NakshatraTill);
                console.log('KaranTill:', KaranTill);

                // Check if NakshatraTill and KaranTill are valid before parsing
                const NakshatraTillParsed = parseDateTime(NakshatraTill);
                const KaranTillParsed = parseDateTime(KaranTill);

                setFormData({
                    ...monthData,
                    NakshatraTillDate: NakshatraTillParsed.date,
                    NakshatraTillTime: NakshatraTillParsed.time,
                    KaranTillDate: KaranTillParsed.date,
                    KaranTillTime: KaranTillParsed.time
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

        const { NakshatraTillDate, NakshatraTillTime, KaranTillDate, KaranTillTime } = formData;
        const updatedFormData = {
            ...formData,
            NakshatraTill: getFullDateTime(NakshatraTillDate, NakshatraTillTime),
            KaranTill: getFullDateTime(KaranTillDate, KaranTillTime)
        };

        try {
            const response = await axios.put(`https://api.vedicjyotishe.com/api/update-samvat/${id}`, updatedFormData);
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
                        <label htmlFor="NakshatraTillDate" className="form-label">Nakshatra Till Date</label>
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
                        <label htmlFor="NakshatraTillTime" className="form-label">Nakshatra Till Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="NakshatraTillTime.hours"
                                    value={formData.NakshatraTillTime.hours}
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
                                    name="NakshatraTillTime.minutes"
                                    value={formData.NakshatraTillTime.minutes}
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
                                    name="NakshatraTillTime.seconds"
                                    value={formData.NakshatraTillTime.seconds}
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
                        <label htmlFor="KaranTillDate" className="form-label">Karan Till Date</label>
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
                        <label htmlFor="KaranTillTime" className="form-label">Karan Till Time</label>
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-control"
                                    name="KaranTillTime.hours"
                                    value={formData.KaranTillTime.hours}
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
                                    name="KaranTillTime.minutes"
                                    value={formData.KaranTillTime.minutes}
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
                                    name="KaranTillTime.seconds"
                                    value={formData.KaranTillTime.seconds}
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
                            {isLoading ? 'Updating...' : 'Update Samvat'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditSamvat;
