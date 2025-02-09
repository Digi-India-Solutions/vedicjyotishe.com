import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetInTouch = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.api.vedicjyotishe.com/api/get-record');
                if (response.data.success) {
                    setRecords(response.data.data); // Update state with fetched data
                }
            } catch (error) {
                console.error("Error fetching records", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle status update
    const updateStatus = async (id) => {
        try {
            const response = await axios.put(`https://www.api.vedicjyotishe.com/api/update-record/${id}`, { status: "Complete" });
            if (response.data.success) {
                setRecords(prevRecords =>
                    prevRecords.map(record =>
                        record._id === id ? { ...record, status: "Complete" } : record
                    )
                );
            }
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    // Handle record deletion
    const deleteRecord = async (id) => {
        try {
            const response = await axios.delete(`https://www.api.vedicjyotishe.com/api/delete-record/${id}`);
            if (response.data.success) {
                setRecords(prevRecords => prevRecords.filter(record => record._id !== id));
            }
        } catch (error) {
            console.error("Error deleting record", error);
        }
    };

    // Format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Get In Touch Inquiries</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
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
                                <th scope="col">Phone Number</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr key={record._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{record.name}</td>
                                    <td>{record.email}</td>
                                    <td>{record.phone}</td>
                                    <td>{formatDate(record.createdAt)}</td>
                                    <td style={{ color: record.status === "Pending" ? "red" : "green" }}>
                                        {record.status}
                                    </td>
                                    <td>
                                        {record.status === "Pending" && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => updateStatus(record._id)}
                                            >
                                                Mark as Complete
                                            </button>
                                        )}
                                        {record.status === "Complete" && (
                                            <button
                                                className="btn btn-secondary"
                                                disabled
                                            >
                                                Completed
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-danger ml-2"
                                            onClick={() => deleteRecord(record._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default GetInTouch;
