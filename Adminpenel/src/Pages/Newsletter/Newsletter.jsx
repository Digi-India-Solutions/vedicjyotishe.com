import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get("https://api.vedicjyotishe.com/api/get-newsletter");
                setEmails(response.data.data);
            } catch (err) {
                console.error("Error fetching emails:", err);
                setError("Failed to load emails.");
            }
        };

        fetchEmails();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.vedicjyotishe.com/api/delete-newsletter/${id}`);
            setEmails(emails.filter(email => email._id !== id));
        } catch (error) {
            console.error("Error deleting email:", error);
            setError("Failed to delete email.");
        }
    };

    const handleStatusChange = async (id) => {
        try {
            await axios.put(`https://api.vedicjyotishe.com/api/update-newsletter/${id}`, { status: "Complete" });
            setEmails(emails.map(email => 
                email._id === id ? { ...email, status: "Complete" } : email
            ));
        } catch (error) {
            console.error("Error updating status:", error);
            setError("Failed to update status.");
        }
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Newsletter Emails</h4>
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Email</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                                        {error}
                                    </td>
                                </tr>
                            ) : emails.length > 0 ? (
                                emails.map((email, index) => (
                                    <tr key={email._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{email.email}</td>
                                        <td>{formatDate(email.createdAt)}</td>
                                        <td>
                                            <button
                                                className={`btn ${email.status === "Complete" ? "btn-success" : "btn-warning"}`}
                                                onClick={() => handleStatusChange(email._id)}
                                                disabled={email.status === "Complete"}
                                            >
                                                {email.status === "Complete" ? "Complete" : "Pending"}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => handleDelete(email._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>No emails found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Newsletter;
