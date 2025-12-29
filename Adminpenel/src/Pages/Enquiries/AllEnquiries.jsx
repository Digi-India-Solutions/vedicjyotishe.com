import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    // View enquiry details
    const viewDetails = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowModal(true);
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
                                <th scope="col">Location</th>
                                <th scope="col">Working</th>
                                <th scope="col">Studied Astrology</th>
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
                                        <td>{enquiry.countryCode} {enquiry.mobileNo}</td>
                                        <td>{enquiry.courseName}</td>
                                        <td>{enquiry.city}, {enquiry.state || ''} {enquiry.country}</td>
                                        <td>{enquiry.workingProfessional || '-'}</td>
                                        <td>{enquiry.studiedAstrology || '-'}</td>
                                        <td>{formatDate(enquiry.createdAt)}</td>
                                        <td>
                                            <span className={`badge bg-${getStatusColor(enquiry.status)}`}>
                                                {enquiry.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info mb-1"
                                                onClick={() => viewDetails(enquiry)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                View
                                            </button>
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
                                    <td colSpan="11" className="text-center">No enquiries found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Enquiry Details Modal */}
            {showModal && selectedEnquiry && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enquiry Details - {selectedEnquiry.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="text-primary border-bottom pb-2">Personal Details</h6>
                                        <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                                        <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                                        <p><strong>Mobile:</strong> {selectedEnquiry.countryCode} {selectedEnquiry.mobileNo}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-primary border-bottom pb-2">Address</h6>
                                        <p><strong>Country:</strong> {selectedEnquiry.country}</p>
                                        <p><strong>State:</strong> {selectedEnquiry.state || 'N/A'}</p>
                                        <p><strong>City:</strong> {selectedEnquiry.city}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="text-primary border-bottom pb-2">Professional Background</h6>
                                        <p><strong>Working Professional:</strong> {selectedEnquiry.workingProfessional || 'N/A'}</p>
                                        <p><strong>Current Role:</strong> {selectedEnquiry.currentRole || 'N/A'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-primary border-bottom pb-2">Astrology Background</h6>
                                        <p><strong>Studied Earlier:</strong> {selectedEnquiry.studiedAstrology || 'N/A'}</p>
                                        <p><strong>Current Level:</strong> {selectedEnquiry.astrologyLevel || 'N/A'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="text-primary border-bottom pb-2">Course Interest</h6>
                                        <p><strong>Course:</strong> {selectedEnquiry.courseName}</p>
                                        <p><strong>Purpose:</strong> {selectedEnquiry.learningPurpose || 'N/A'} {selectedEnquiry.learningPurpose === 'Other' ? `- ${selectedEnquiry.otherPurpose}` : ''}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-primary border-bottom pb-2">Learning Preferences</h6>
                                        <p><strong>Time per Week:</strong> {selectedEnquiry.timePerWeek || 'N/A'}</p>
                                        <p><strong>Preferred Days:</strong> {selectedEnquiry.preferredDays || 'N/A'}</p>
                                        <p><strong>Language:</strong> {selectedEnquiry.language}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-12">
                                        <h6 className="text-primary border-bottom pb-2">Additional Information</h6>
                                        <p><strong>Message:</strong> {selectedEnquiry.message || 'No message provided'}</p>
                                        <p><strong>Status:</strong> <span className={`badge bg-${getStatusColor(selectedEnquiry.status)}`}>{selectedEnquiry.status}</span></p>
                                        <p><strong>Submitted:</strong> {formatDate(selectedEnquiry.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllEnquiries;
