import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.vedicjyotishe.com/api/get-enquiry');
                if (response.data.success) {
                    setEnquiries(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching enquiries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle status update
    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`https://api.vedicjyotishe.com/api/update-enquiry/${id}`, { status: newStatus });
            if (response.data.success) {
                setEnquiries(prevEnquiries =>
                    prevEnquiries.map(enquiry =>
                        enquiry._id === id ? { ...enquiry, status: newStatus } : enquiry
                    )
                );
                Swal.fire({
                    title: "Success!",
                    text: "Status updated successfully",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error updating status", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update status",
                icon: "error"
            });
        }
    };

    // Handle enquiry deletion
    const deleteEnquiry = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://api.vedicjyotishe.com/api/delete-enquiry/${id}`);
                    if (response.data.success) {
                        setEnquiries(prevEnquiries => prevEnquiries.filter(enquiry => enquiry._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Enquiry has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error("Error deleting enquiry", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete enquiry",
                        icon: "error"
                    });
                }
            }
        });
    };

    // Format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "danger";
            case "Contacted":
                return "warning";
            case "Enrolled":
                return "success";
            case "Rejected":
                return "secondary";
            default:
                return "info";
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>Course Enquiries</h4>
                </div>
                <div className="links">
                    <p>Total Enquiries: <strong>{enquiries.length}</strong></p>
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile No.</th>
                                <th scope="col">Course</th>
                                <th scope="col">State</th>
                                <th scope="col">City</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.length > 0 ? (
                                enquiries.map((enquiry, index) => (
                                    <tr key={enquiry._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{enquiry.name}</td>
                                        <td>{enquiry.email}</td>
                                        <td>{enquiry.mobileNo}</td>
                                        <td>{enquiry.courseName}</td>
                                        <td>{enquiry.state}</td>
                                        <td>{enquiry.city}</td>
                                        <td>{formatDate(enquiry.createdAt)}</td>
                                        <td>
                                            <span className={`badge bg-${getStatusColor(enquiry.status)}`}>
                                                {enquiry.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={enquiry.status}
                                                onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                                                style={{ marginBottom: '5px' }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Enrolled">Enrolled</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteEnquiry(enquiry._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No enquiries found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default AllEnquiries;
