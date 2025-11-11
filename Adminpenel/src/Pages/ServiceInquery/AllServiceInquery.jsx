import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'react-toastify/dist/ReactToastify.css';

const AllServiceInquiry = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.vedicjyotishe.com/api/get-service-inquery");
            console.log(res)
            setData(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch data.");
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.orderId.includes(search)
    );

    // Function to generate PDF for a specific record
    const generatePDF = async (item) => {
        const doc = new jsPDF("p", "pt", "a4");
        const pdfContent = document.getElementById(`pdf-content-${item._id}`);

        try {
            // Make content visible for rendering, then hide after capture
            pdfContent.style.display = "block";
            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for rendering

            const canvas = await html2canvas(pdfContent, {
                useCORS: true, // Use this option if there are any external images
                backgroundColor: "#fff", // Set background color to avoid transparency issues
            });

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = doc.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (!imgData.startsWith("data:image/png;base64,")) {
                throw new Error("Failed to generate PNG image.");
            }

            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            doc.save(`Service_Inquiry_${item.name}.pdf`);
            pdfContent.style.display = "none"; // Hide again after capturing

        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate PDF. Please try again.");
        }
    };

    const deleteRecord = async(id)=>{
        try {
            const res = await axios.delete("https://api.vedicjyotishe.com/api/delete-service-inquery/" +id)
            if(res.status===200){
                toast.success("Inquery Delete Successfully")
                getApiData()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Service Inquiry</h4>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label>&nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Service Name</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Final Price</th>
                            {/* <th scope="col">Order Status</th> */}
                            <th scope="col">Payment Status</th>
                            <th scope="col">Download PDF</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.serviceId.serviceName}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>₹{item.serviceId.sericeFinalPrice}</td>
                                    {/* <td>{item.paymentStatus === "Complete" ? "Completed" : "Pending"}</td> */}
                                    <td>{item.paymentStatus}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => generatePDF(item)}>Download PDF</button>
                                    </td>
                                    <td><button className='btn btn-danger' onClick={()=>deleteRecord(item._id)}>Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Hidden section to capture PDF content */}
                {filteredData.map(item => (
                    <div
                        key={item._id}
                        id={`pdf-content-${item._id}`}
                        style={{ width: "595px", padding: "20px", display: "none" }}
                    >
                        <h2>Service Inquiry Details</h2>
                        <p><strong>Service Name:</strong> {item.serviceId.serviceName}</p>
                        <p><strong>Service Heading:</strong> {item.serviceId.serviceHeading}</p>
                        {/* <p><strong>Service Details:</strong> {item.serviceId.serviceDetails}</p> */}
                        <p><strong>Customer Name:</strong> {item.name}</p>
                        <p><strong>Phone:</strong> {item.phone}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Gender:</strong> {item.gender}</p>
                        <p><strong>Marital Status:</strong> {item.maritalStatus}</p>
                        <p><strong>Date of Birth:</strong> {item.dateOfBirth}</p>
                        <p><strong>Birth Time:</strong> {item.birthTime}</p>
                        <p><strong>Longitude:</strong> {item.longitude}</p>
                        <p><strong>Latitude:</strong> {item.latitude}</p>
                        <p><strong>Place of Birth:</strong> {item.place}</p>
                        <p><strong>Address:</strong> {item.address}, {item.city}, {item.state}, {item.country} - {item.postalCode}</p>
                        <p><strong>Order ID:</strong> {item.orderId}</p>
                        <p><strong>Payment Status:</strong> {item.paymentStatus}</p>
                        <p><strong>Comment:</strong> {item.comment}</p>
                    </div>
                ))}
            </section>
        </>
    );
};

export default AllServiceInquiry;
