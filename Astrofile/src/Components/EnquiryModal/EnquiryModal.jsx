import React, { useState, useEffect } from "react";
import "./EnquiryModal.css";
import axios from "axios";

const EnquiryModal = ({ isOpen, onClose, selectedCourse }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobileNo: "",
    courseName: selectedCourse || "",
    state: "",
    city: "",
    country: "India",
    language: "English",
    message: "",
  });

  const [courses, setCourses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hardcoded Indian states
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

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
      setCourses(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd");
      const data = await res.json();

      const countryList = data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
        callingCode: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
      }));

      countryList.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countryList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      fetchCountries();
      setStates(indianStates);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      // Find the selected country and get its calling code
      const selectedCountry = countries.find((c) => c.name === value);
      const newCountryCode = selectedCountry?.callingCode || "+1";

      setFormData({
        ...formData,
        [name]: value,
        countryCode: newCountryCode,
        state: "", // Reset state when country changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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
          countryCode: "+91",
          mobileNo: "",
          courseName: selectedCourse || "",
          state: "",
          city: "",
          country: "",
          language: "English",
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
          <div className="form-row">
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
          </div>

          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile Number *</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={formData.countryCode}
                readOnly
                style={{
                  flex: "0 0 80px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f5f5f5",
                }}
              />
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                placeholder="Mobile Number"
                style={{ flex: "1" }}
              />
            </div>
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
              {[...courses].reverse().map((course, index) => (
                <option key={index} value={course.courseName}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {formData.country === "India" && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required={formData.country === "India"}
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
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter your city"
                />
              </div>
            </div>
          )}

          {formData.country !== "India" && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter your city"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="language">Preferred Language *</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
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
            {loading ? "Submitting..." : "Enquire Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
