// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import "./Kundali.css";
// import { FaAngleRight } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const Kundali = () => {
//   const [stepOne, setStepOne] = useState(true);
//   const [gender, setGender] = useState(null);
//   const [direction, setDirection] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     maritalStatus: "",
//     birthDate: "",
//     birthTime: "",
//     countryState: "",
//     place: "",
//     longitude: "",
//     latitude: "",
//     comment: "",
//     streetAddress: "",
//     apartment: "",
//     city: "",
//     state: "",
//     country: "",
//     postalCode: "",
//     additionalInfo: ""
//   });
//   const [submissionStatus, setSubmissionStatus] = useState("");

//   const { name } = useParams();
//   const [data, setData] = useState({});

//   const getApiData = async () => {
//     try {
//       const res = await axios.get("https://www.api.vedicjyotishe.com/api/get-service-by-name/" + name);
//       console.log(res);
//       setData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   // };

//   useEffect(() => {
//     getApiData();
//   }, []);

//   const sendTrue = () => {
//     setStepOne(false);
//   };

//   useEffect(() => {
//     window.scrollTo({
//       top: 20,
//       behavior: "smooth",
//     });
//   }, [stepOne]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Post the form data to your API
//       const res = await axios.post("https://www.api.vedicjyotishe.com/api/submit-kundali", formData);
//       console.log(res.data);
//       setSubmissionStatus("Form submitted successfully!"); // Success message
//       // Reset form or handle further logic if needed
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         maritalStatus: "",
//         birthDate: "",
//         birthTime: "",
//         countryState: "",
//         place: "",
//         longitude: "",
//         latitude: "",
//         comment: "",
//         streetAddress: "",
//         apartment: "",
//         city: "",
//         state: "",
//         country: "",
//         postalCode: "",
//         additionalInfo: ""
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmissionStatus("There was an error submitting the form.");
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Kundli | Your Kundali Online</title>
//         <meta
//           name="description"
//           content="Get your personalized Kundali by filling out the form. Discover your astrological insights today!"
//         />
//         <meta name="keywords" content="Kundali, Astrology, Horoscope, Birth Chart" />
//         <meta name="author" content="Your Company Name" />
//         <link rel="canonical" href="https://yourwebsite.com/kundali" />
//       </Helmet>

//       <section>
//         <div className="container">
//           <div className="row">
//             <div className="pagetop py-2">
//               <div className="pagetitle"><h1>{data.serviceName}</h1></div>
//               <div className="changepage">
//                 <p><Link to={"/"} className="render">Home</Link>{" "}<span><FaAngleRight /> {data.serviceName}</span></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mainbg1">
//         <section>
//           <div className="container-fluid py-3">
//             <div className="row">
//               <div className="aboutpage">
//                 <h1>{data.serviceHeading}</h1>
//               </div>
//               <div>
//                 <p className="text-center">{data.serviceDetails}</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section>
//           <div className="container py-3 ">
//             <div className="row">
//               <div className="col-md-5">
//                 <div className="kundaliganesh">
//                   <img src={`https://www.api.vedicjyotishe.com/${data.serviceImage}`} alt="KundaliGanesh" />
//                 </div>
//               </div>

//               <div className="col-md-1"></div>
//               <div className="col-md-6 formbg py-3 px-2">
//                 <div className="container">
//                   <div className="col">
//                     <div className="formtitle py-3">
//                       <h1>Fill the form to get your Inquiry</h1>
//                     </div>
//                     {stepOne ? (
//                       <form onSubmit={handleSubmit}>
//                         <div>
//                           <div className="formsubHeading">
//                             <h4>Name & Gender</h4>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Name</label>
//                               <input
//                                 type="text"
//                                 name="name"
//                                 className="form-control form-input"
//                                 placeholder="Your Name here"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Phone</label>
//                               <input
//                                 type="number"
//                                 name="phone"
//                                 className="form-control form-input"
//                                 placeholder="Your Number here"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Email</label>
//                               <input
//                                 type="email"
//                                 name="email"
//                                 className="form-control form-input"
//                                 placeholder="Your Email here"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-10 genderfield mb-2">
//                               <label className="form-label">Gender</label>
//                               <div className="genderbtn">
//                                 <button
//                                   type="button"
//                                   className={`gender-btn btn ${gender === "Male" ? "btn-warning" : ""}`}
//                                   onClick={() => setGender("Male")}
//                                 >
//                                   Male
//                                 </button>
//                                 <button
//                                   type="button"
//                                   className={`gender-btn btn ${gender === "Female" ? "btn-warning" : ""}`}
//                                   onClick={() => setGender("Female")}
//                                 >
//                                   Female
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
//                               <select
//                                 name="maritalStatus"
//                                 id="maritalStatus"
//                                 className="form-control form-input"
//                                 onChange={handleChange}
//                                 required
//                               >
//                                 <option value="" disabled selected>Select Status</option>
//                                 <option value="married">Married</option>
//                                 <option value="unmarried">Unmarried</option>
//                                 <option value="widow_widower">Widow / Widower</option>
//                                 <option value="divorced">Divorced</option>
//                                 <option value="live_in">Live-in</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div className="formsubHeading">
//                             <h4>Birth Details</h4>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Date</label>
//                               <input
//                                 type="date"
//                                 name="birthDate"
//                                 className="form-control form-input"
//                                 value={formData.birthDate}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Time</label>
//                               <input
//                                 type="time"
//                                 name="birthTime"
//                                 className="form-control form-input"
//                                 value={formData.birthTime}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Country & State</label>
//                               <input
//                                 type="text"
//                                 name="countryState"
//                                 className="form-control form-input"
//                                 placeholder="Enter Country & State"
//                                 value={formData.countryState}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Place</label>
//                               <input
//                                 type="text"
//                                 name="place"
//                                 className="form-control form-input"
//                                 placeholder="Enter Place"
//                                 value={formData.place}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Longitude</label>
//                               <input
//                                 type="text"
//                                 name="longitude"
//                                 className="form-control form-input"
//                                 placeholder="Enter Longitude"
//                                 value={formData.longitude}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Latitude</label>
//                               <input
//                                 type="text"
//                                 name="latitude"
//                                 className="form-control form-input"
//                                 placeholder="Enter Latitude"
//                                 value={formData.latitude}
//                                 onChange={handleChange}
//                                 required
//                               />
//                             </div>
//                           </div>

//                           <div className="formsubHeading">
//                             <h4>Additional Information</h4>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Comment</label>
//                               <textarea
//                                 name="comment"
//                                 className="form-control form-input"
//                                 placeholder="Your Comment here"
//                                 value={formData.comment}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Street Address</label>
//                               <input
//                                 type="text"
//                                 name="streetAddress"
//                                 className="form-control form-input"
//                                 placeholder="Your Street Address here"
//                                 value={formData.streetAddress}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Apartment</label>
//                               <input
//                                 type="text"
//                                 name="apartment"
//                                 className="form-control form-input"
//                                 placeholder="Your Apartment Number here"
//                                 value={formData.apartment}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">City</label>
//                               <input
//                                 type="text"
//                                 name="city"
//                                 className="form-control form-input"
//                                 placeholder="Your City here"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">State</label>
//                               <input
//                                 type="text"
//                                 name="state"
//                                 className="form-control form-input"
//                                 placeholder="Your State here"
//                                 value={formData.state}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Country</label>
//                               <input
//                                 type="text"
//                                 name="country"
//                                 className="form-control form-input"
//                                 placeholder="Your Country here"
//                                 value={formData.country}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Postal Code</label>
//                               <input
//                                 type="text"
//                                 name="postalCode"
//                                 className="form-control form-input"
//                                 placeholder="Your Postal Code here"
//                                 value={formData.postalCode}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                             <div className="col-md-12 namefield mb-2">
//                               <label className="form-label">Additional Info</label>
//                               <textarea
//                                 name="additionalInfo"
//                                 className="form-control form-input"
//                                 placeholder="Any additional info"
//                                 value={formData.additionalInfo}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                           </div>
//                           <button type="submit" className="btn btn-primary">
//                             Submit
//                           </button>
//                         </div>
//                       </form>
//                     ) : (
//                       <div>
//                         <h4>Your request has been submitted!</h4>
//                       </div>
//                     )}
//                     {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>
//     </>
//   );
// };

// export default Kundali;
