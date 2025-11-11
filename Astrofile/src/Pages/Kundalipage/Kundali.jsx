import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Kundali.css";
import "./GetAddress.css";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Kundali = () => {
  const navigate = useNavigate()
  const [stepOne, setStepOne] = useState(true);
  const [gender, setGender] = useState(null);
  const [data, setData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [direction, setDirection] = useState()
  const [direction1, setDirection1] = useState()

  const { name } = useParams();

  const [formData, setFormData] = useState({
    serviceId: "",
    name: "",
    phone: "",
    email: "",
    maritalStatus: "",
    dateOfBirth: "",
    birthTime: "",
    countryOrstate: "",
    place: "",
    longitude: "",
    latitude: "",
    comment: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    additionalInfo: "",
    gender: "",
    amount: "", // Add amount for Razorpay
  });

  const getApiData = async () => {
    try {
      const res = await axios.get(`https://api.vedicjyotishe.com/api/get-service-by-name/${name}`);
      console.log(res)
      setData(res.data.data);
      setFormData((prevData) => ({
        ...prevData,
        amount: res.data.data.sericeFinalPrice,
        serviceId: res.data.data._id
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, [name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // State for time selection
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  // Handle time changes and store formatted time
  const handleTimeChange = () => {
    const formattedTime = `${hour}:${minute} ${ampm}`;
    setFormData((prevData) => ({
      ...prevData,
      birthTime: formattedTime,
    }));
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedGender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const inquiryRes = await axios.post(`https://api.vedicjyotishe.com/api/send-service-inquery`, formData);
      const { orderId, amount } = inquiryRes.data.data;

      const options = {
        key: 'rzp_live_uPsGOmFh9PzBLG', 
        amount: amount,
        currency: 'INR',
        name: 'Your Service Name',
        description: 'Service Payment',
        order_id: orderId,
        handler: async function (response) {
          console.log(response);
          // Verify the payment
          const verificationResponse = await axios.post('https://api.vedicjyotishe.com/api/verify-payment', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          console.log("verificationResponse", verificationResponse)
          if (verificationResponse.data.success) {
            alert('Payment successful and verified!');
            setSubmissionStatus("Form submitted and payment successful!");
            navigate('/success');
          } else {
            alert('Payment verification failed. Please try again.');
            setSubmissionStatus("Payment verification failed.");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open(); // Open the Razorpay payment modal
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("There was an error submitting the form.");
    }
  };


  const sendTrue = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.gender || !formData.maritalStatus || !formData.dateOfBirth || !formData.birthTime || !formData.countryOrstate || !formData.place) {
      return alert("Please Fill the required field")
    }
    setStepOne(false)
  }


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [stepOne]);

  return (
    <>
      <Helmet>
        <title>Kundli | Your Kundali Online</title>
        <meta
          name="description"
          content="Get your personalized Kundali by filling out the form. Discover your astrological insights today!"
        />
        <meta name="keywords" content="Kundali, Astrology, Horoscope, Birth Chart" />
        <meta name="author" content="Your Company Name" />
        <link rel="canonical" href="https://yourwebsite.com/kundali" />
      </Helmet>

      <section>
        <div className="container">
          <div className="row">
            <div className="pagetop py-2">
              <div className="pagetitle"><h1>{data.serviceName}</h1></div>
              <div className="changepage">
                <p><Link to={"/"} className="render">Home</Link>{" "}<span><FaAngleRight /> {data.serviceName}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mainbg1">
        <section>
          <div className="container-fluid py-3">
            <div className="row">
              <div className="aboutpage">
                <h1>{data.serviceHeading}</h1>
              </div>
              <div>
                <p className="text-center">{data.serviceDetails}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container py-3 ">
            <div className="row">
              <div className="col-md-5">
                <div className="kundaliganesh">
                  <img src={`https://api.vedicjyotishe.com/${data.serviceImage}`} alt="KundaliGanesh" />
                </div>
              </div>

              <div className="col-md-1"></div>
              <div className="col-md-6 formbg py-3 px-2">
                <div className="container">
                  <div className="col">
                    <div className="formtitle py-3">
                      <h1>Fill the form to get your Inquiry</h1>
                    </div>
                    {stepOne ? (
                      <div>
                        <div className="formsubHeading">
                          <h4>Name & Gender</h4>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">Name<sup className="text-danger">*</sup></label>
                            <input type="text" onChange={handleChange} name="name" className="form-control form-input" placeholder="Your Name here" required />
                          </div>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">Phone<sup className="text-danger">*</sup></label>
                            <input type="number" onChange={handleChange} name="phone" className="form-control form-input" placeholder="Your Number here" required />
                          </div>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">Email<sup className="text-danger">*</sup></label>
                            <input type="email" onChange={handleChange} name="email" className="form-control form-input" placeholder="Your Email here" required />
                          </div>
                          <div className="col-md-10 genderfield mb-2">
                            <label className="form-label">Gender<sup className="text-danger">*</sup></label>
                            <div className="genderbtn">
                              <button type="button" className={`gender-btn btn ${gender === "Male" ? "btn-warning" : ""}`} onClick={() => handleGenderChange("Male")}>Male</button>
                              <button type="button" className={`gender-btn btn ${gender === "Female" ? "btn-warning" : ""}`} onClick={() => handleGenderChange("Female")}>Female</button>
                            </div>
                          </div>
                          <div className="col-md-12 namefield mb-2">
                            <label htmlFor="maritalStatus" className="form-label">Marital Status<sup className="text-danger">*</sup></label>
                            <select name="maritalStatus" onChange={handleChange} id="maritalStatus" className="form-control form-input" required>
                              <option value="" disabled selected>Select Status</option>
                              <option value="married">Married</option>
                              <option value="unmarried">Unmarried</option>
                              <option value="widow_widower">Widow / Widower</option>
                              <option value="divorced">Divorced</option>
                              <option value="live_in">Live-in</option>
                            </select>
                          </div>
                        </div>

                        <div className="formsubHeading">
                          <h4>Birth Details</h4>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">Date<sup className="text-danger">*</sup></label>
                            <input type="date" onChange={handleChange} name="dateOfBirth" className="form-control form-input" required />
                          </div>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">Time<sup className="text-danger">*</sup></label>
                            <div className="d-flex " style={{ marginRight: "80px" }}>
                              {/* Hour Dropdown */}
                              <select
                                value={hour}
                                onChange={(e) => {
                                  setHour(e.target.value);
                                  handleTimeChange();
                                }}
                                className=" form-input me-2"
                              >
                                {Array.from({ length: 12 }, (_, i) => {
                                  const hourValue = (i + 1).toString().padStart(2, '0');
                                  return <option key={hourValue} value={hourValue}>{hourValue}</option>;
                                })}
                              </select>

                              {/* Minute Dropdown */}
                              <select
                                value={minute}
                                onChange={(e) => {
                                  setMinute(e.target.value);
                                  handleTimeChange();
                                }}
                                className="form-input me-2"
                              >
                                {Array.from({ length: 60 }, (_, i) => {
                                  const minuteValue = i.toString().padStart(2, '0');
                                  return <option key={minuteValue} value={minuteValue}>{minuteValue}</option>;
                                })}
                              </select>

                              {/* AM/PM Selector */}
                              <select
                                value={ampm}
                                onChange={(e) => {
                                  setAmpm(e.target.value);
                                  handleTimeChange();
                                }}
                                className=" form-input me-5"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">Country & State<sup className="text-danger">*</sup></label>
                            <input type="text" onChange={handleChange} name="countryOrstate" className="form-control form-input" placeholder="Country & State Of Birth" required />
                          </div>
                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">City<sup className="text-danger">*</sup></label>
                            <input type="text" onChange={handleChange} name="place" className="form-control form-input" placeholder="City Of Birth" required />
                          </div>
                        </div>

                        <div className="formsubHeading">
                          <h4>Direction (if available)</h4>
                          <div className="Longitude">
                            <div className="col-md-8 Longitudefield mb-2">
                              <label className="form-label">Longitude</label>
                              <input type="text" onChange={handleChange} id="longitude" name="longitude" placeholder="if available" className="form-control form-input" />
                            </div>
                            <div className="directionbtn">
                              <button type="button" className={`direction-btn btn ${direction === "East" ? "btn-warning" : ""}`} onClick={() => setDirection("East")}>East</button>
                              <button type="button" className={`direction-btn btn ${direction === "West" ? "btn-warning" : ""}`} onClick={() => setDirection("West")}>West</button>
                            </div>
                          </div>
                          <div className="Longitude">
                            <div className="col-md-8 Longitudefield mb-2">
                              <label className="form-label">Latitude</label>
                              <input type="text" onChange={handleChange} id="Latitude" name="latitude" placeholder="if available" className="form-control form-input" />
                            </div>
                            <div className="directionbtn">
                              <button type="button" className={`direction-btn btn ${direction1 === "North" ? "btn-warning" : ""}`} onClick={() => setDirection1("North")}>North</button>
                              <button type="button" className={`direction-btn btn ${direction1 === "South" ? "btn-warning" : ""}`} onClick={() => setDirection1("South")}>South</button>
                            </div>
                          </div>

                          <div className="col-md-12 namefield mb-2">
                            <label className="form-label">
                              Comment <br /> <span>Facts Relevant to Your Problem (Please specify in detail)</span>
                            </label>
                            <textarea type="text" onChange={handleChange} name="comment" className="form-control form-input" placeholder="Type message" rows="4" required />
                          </div>
                        </div>

                        <div className="container-fluid d-flex justify-content-center align-items-center price-container">
                          <div className="col-md-4 pleasepay">
                            <button className="btn pay-btn" onClick={sendTrue}>Submit</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <section>
                        <div className="container Addresspage">
                          <h3>Address Information</h3>
                          <h6>Please Fill Current Address</h6>
                          {/* Street Address */}
                          <div className="row mb-3">
                            <div className="col-md-12">
                              <label htmlFor="address" className="form-label Addresslab">Street Address</label>
                              <input type="text" onChange={handleChange} name="address" className="form-control Addresscon" id="address" placeholder="1234 Main St" required />
                            </div>
                          </div>

                          {/* Apartment/Unit Number */}
                          <div className="row mb-3">
                            <div className="col-md-12">
                              <label htmlFor="apartment" className="form-label Addresslab">Apartment/Unit</label>
                              <input type="text" onChange={handleChange} name="apartment" className="form-control Addresscon" id="apartment" placeholder="Apartment, suite, unit, etc." required />
                            </div>
                          </div>

                          {/* City */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="city" className="form-label Addresslab">City</label>
                              <input type="text" onChange={handleChange} name="city" className="form-control Addresscon" id="city" placeholder="City" required />
                            </div>

                            {/* State/Province */}
                            <div className="col-md-6">
                              <label htmlFor="state" className="form-label Addresslab">State/Province</label>
                              <input type="text" onChange={handleChange} name="state" className="form-control Addresscon" id="state" placeholder="State or Province" required />
                            </div>
                          </div>

                          {/* Country */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="country" className="form-label Addresslab">Country</label>
                              <input type="text" onChange={handleChange} name="country" className="form-control Addresscon" id="postalCode" placeholder="Country" required />
                            </div>

                            {/* Postal Code */}
                            <div className="col-md-6">
                              <label htmlFor="postalCode" className="form-label Addresslab">Postal Code</label>
                              <input type="number" onChange={handleChange} name="postalCode" className="form-control Addresscon" id="postalCode" placeholder="Postal Code" required />
                            </div>
                          </div>

                          {/* Additional Information */}
                          <div className="row mb-3">
                            <div className="col-md-12">
                              <label htmlFor="additionalInfo" className="form-label Addresslab">Additional Information</label>
                              <textarea name="additionalInfo" onChange={handleChange} className="form-control Addresscon" id="additionalInfo" rows="3" placeholder="Any additional delivery instructions or information (optional)"></textarea>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="container-fluid d-flex justify-content-between align-items-center price-container">
                            <div className="col-md-8 ">
                              <div className="price-details">
                                <p className="original-price">Rs.{data.sericePrice}</p>
                                <p className="discounted-price">Rs. {data.sericeFinalPrice}/-</p>
                              </div>
                            </div>
                            <div className="col-md-4 pleasepay">
                              <button className="btn pay-btn" onClick={handleSubmit}>Pay</button>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Kundali;
