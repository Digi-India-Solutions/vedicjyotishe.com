import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllSamvat = () => {
    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get("https://www.api.vedicjyotishe.com/api/get-samvat");
            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const res = await axios.delete(`https://www.api.vedicjyotishe.com/api/delete-samvat/${id}`);
                if (res.status === 200) {
                    getApiData();
                    toast.success("Record deleted successfully");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete the record");
        }
    };

    const formatDate = (dateString) => {
        // Normalize the date string to ensure valid format
        if (!dateString || typeof dateString !== 'string') return "Invalid Date";

        const normalizedDateString = dateString.replace(/T(\d{1,2}):(\d{1,2}):(\d{1,2})/, (match, p1, p2, p3) => {
            return `T${String(p1).padStart(2, '0')}:${String(p2).padStart(2, '0')}:${String(p3).padStart(2, '0')}`;
        });

        const date = new Date(normalizedDateString);

        // Check if date is valid
        if (isNaN(date.getTime())) return "Invalid Date";

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Extract seconds

        // Format the date and time as needed
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`; // Include seconds
    };
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Samvat</h4>
                </div>
                <div className="links">
                    <Link to="/add-samvat" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                    <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Vikram</th>
                            <th scope="col">Shaka</th>
                            <th scope="col">Nakshatra</th>
                            <th scope="col">Nakshatra Till</th>
                            <th scope="col">Karan</th>
                            <th scope="col">Karan Till</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.Vikram}</td>
                                <td>{item.Shaka}</td>
                                <td>{item.Nakshatra}</td>
                                <td>{formatDate(item.NakshatraTill)}</td>
                                <td>{item.Karan}</td>
                                <td>{formatDate(item.KaranTill)}</td>
                                <td>
                                    <Link to={`/edit-samvat/${item._id}`} className="bt edit">
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className="bt delete">
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllSamvat;