import React, { useState, useEffect } from "react";
import "./EnquiryModal.css";
import axios from "axios";

const EnquiryModal = ({ isOpen, onClose, selectedCourse }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    courseName: selectedCourse || "",
    state: "",
    city: "",
    message: "",
  });
  const [courses, setCourses] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        courseName: selectedCourse || "",
      }));
    }
  }, [selectedCourse, isOpen]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://api.vedicjyotishe.com/api/get-course");
      const data = res.data.data;
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get("https://api.vedicjyotishe.com/api/get-states");
      const data = res.data.data;
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async (state) => {
    if (!state) {
      setCities([]);
      return;
    }
    try {
      const res = await axios.get(`https://api.vedicjyotishe.com/api/get-cities/${state}`);
      const data = res.data.data;
      setCities(data);
    } catch (error) {
      console.log(error);
      setCities([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      fetchStates();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
      fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://api.vedicjyotishe.com/api/add-enquiry",
        formData
      );

      if (response.data.success) {
        setSuccessMessage("Enquiry submitted successfully!");
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          courseName: selectedCourse || "",
          state: "",
          city: "",
          message: "",
        });

        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to submit enquiry"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Start Your Astrology Journey</h2>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile Number *</label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              placeholder="Your Mobile Number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseName">Course Name *</label>
            <select
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            >
              <option value="">Select a Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course.courseName}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select a State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={!formData.state}
            >
              <option value="">Select a City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional message or questions"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
