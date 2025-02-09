import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllService = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://www.api.vedicjyotishe.com/api/get-service');
            console.log(response)
            if (response.status === 200) {
                setServices(response.data.data);
            } else {
                setError('Failed to fetch services');
            }
        } catch (err) {
            setError('An error occurred while fetching services');
        } finally {
            setLoading(false);
        }
    };


    // Fetch services from the API
    useEffect(() => {
        fetchServices();
    }, []);

    // Handle delete action (optional, can be added later)
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("https://www.api.vedicjyotishe.com/api/delete-service/" + id)
            if (res.status === 200) {
                toast.success(res.data.message)
                fetchServices()
            }
        } catch (error) {
            console.log(error)
        }
        console.log(`Delete service with ID: ${id}`);
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Service</h4>
                </div>
                <div className="links">
                    <Link to="/add-service" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>
            <section className="mt-2 d-table table-responsive">
                {loading && <p>Loading services...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S No.</th>
                                <th scope="col">Service Name</th>
                                <th scope="col">Service Heading</th>
                                <th scope="col">Service Price</th>
                                <th scope="col">Service Logo</th>
                                <th scope="col">Service Image</th>
                                <th scope="col">Drop Down</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={service._id}>
                                    <td>{index + 1}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.serviceHeading}</td>
                                    <td>&#8377;{service.sericeFinalPrice}</td>
                                    <td>
                                        <img src={`https://www.api.vedicjyotishe.com/${service.serviceLogo}`} alt={service.serviceName} style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>
                                        <img src={`https://www.api.vedicjyotishe.com/${service.serviceImage}`} alt={service.serviceName} style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>{service.dropDownStatus}</td>
                                    <td>
                                        <Link to={`/edit-service/${service._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(service._id)}>Delete <i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
};

export default AllService;
