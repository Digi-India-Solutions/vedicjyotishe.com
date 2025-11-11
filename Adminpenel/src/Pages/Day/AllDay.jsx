import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllDay = () => {
    const [days, setDays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDays();
    }, []);

    const fetchDays = async () => {
        try {
            const response = await axios.get('https://api.vedicjyotishe.com/api/get-day');
            if (response.status === 200) {
                setDays(response.data.data);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Failed to fetch data");
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const res = await axios.delete(`https://api.vedicjyotishe.com/api/delete-day/${id}`);
                if (res.status === 200) {
                    toast.success("Day deleted successfully");
                    fetchDays()
                }
            } catch (error) {
                toast.error("Failed to delete the day");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Day List</h4>
                </div>
                <div className="links">
                    <Link to="/add-day" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>


            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Sun Rise Time</th>
                            <th scope="col">Sun Set Time</th>
                            <th scope="col">Moon Rise Time</th>
                            <th scope="col">Moon Set Time</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="text-center">Loading...</td>
                            </tr>
                        ) : days.length > 0 ? (
                            days.map((day, index) => (
                                <tr key={day._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{day.sunRiseTime}</td>
                                    <td>{day.sunsetTime}</td>
                                    <td>{day.moonRiseTime}</td>
                                    <td>{day.moonsetTime}</td>
                                    <td>
                                        <Link to={`/edit-day/${day._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(day._id)}
                                            className="bt delete"
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllDay;
