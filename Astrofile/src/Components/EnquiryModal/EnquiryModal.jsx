import React, { useState, useEffect } from "react";
import "./EnquiryModal.css";
import axios from "axios";
import { Toaster, toast } from "sonner";

const EnquiryModal = ({ isOpen, onClose, selectedCourse }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobileNo: "",
    courseName: selectedCourse || "",
    country: "India",
    state: "",
    city: "",
    language: "English",
    workingProfessional: "",
    currentRole: "",
    studiedAstrology: "",
    astrologyLevel: "",
    learningPurpose: "",
    otherPurpose: "",
    timePerWeek: "",
    preferredDays: "",
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
        toast.success("Your enquiry has been submitted successfully! We will get back to you soon.");
        setSuccessMessage("Enquiry submitted successfully!");
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          mobileNo: "",
          courseName: selectedCourse || "",
          country: "India",
          state: "",
          city: "",
          language: "English",
          workingProfessional: "",
          currentRole: "",
          studiedAstrology: "",
          astrologyLevel: "",
          learningPurpose: "",
          otherPurpose: "",
          timePerWeek: "",
          preferredDays: "",
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
    <>
      <Toaster />
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
          {/* Details Section */}
          <div className="form-section-label">Details</div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name *"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address *"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <div className="mobile-number-wrapper">
              <input
                type="text"
                value={formData.countryCode}
                readOnly
                className="country-code-input"
              />
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                placeholder="Mobile Number *"
                className="mobile-number-input"
              />
            </div>
          </div>

          {/* Working Professional */}
          <div className="form-group">
            <label>Are you currently a working professional?</label>
            <div className="checkbox-group">
              {["Yes", "No"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="radio"
                    name="workingProfessional"
                    value={option}
                    checked={formData.workingProfessional === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Current Role (Optional) */}
          {["Yes", "No"].includes(formData.workingProfessional) && (
            <div className="form-group">
              <input
                type="text"
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="Your current role / profession (optional)"
              />
            </div>
          )}

          {/* Studied Astrology */}
          <div className="form-group">
            <label>Have you studied astrology earlier?</label>
            <div className="checkbox-group">
              {["Yes", "No"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="radio"
                    name="studiedAstrology"
                    value={option}
                    checked={formData.studiedAstrology === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Astrology Level */}
          {formData.studiedAstrology === "Yes" && (
            <div className="form-group">
              <label>Your current level of astrology knowledge:</label>
              <div className="checkbox-group">
                {["Beginner", "Intermediate", "Advanced"].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="radio"
                      name="astrologyLevel"
                      value={option}
                      checked={formData.astrologyLevel === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Course Selection */}
          <div className="form-group">
            <label>Interested Course *</label>
            <select
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            >
              <option value="">Select Interested Course</option>
              {[...courses].reverse().map((course, index) => (
                <option key={index} value={course.courseName}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Learning Purpose */}
          <div className="form-group">
            <label>Purpose of learning astrology:</label>
            <div className="checkbox-group">
              {["Personal interest", "Professional practice", "Research / advanced study", "Teaching"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="radio"
                    name="learningPurpose"
                    value={option}
                    checked={formData.learningPurpose === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="learningPurpose"
                  value="Other"
                  checked={formData.learningPurpose === "Other"}
                  onChange={handleChange}
                />
                Other:
                {formData.learningPurpose === "Other" && (
                  <input
                    type="text"
                    name="otherPurpose"
                    value={formData.otherPurpose}
                    onChange={handleChange}
                    placeholder="Please specify"
                    style={{ marginLeft: "8px", flex: "1" }}
                  />
                )}
              </label>
            </div>
          </div>

          {/* Time Dedication */}
          <div className="form-group">
            <label>Time you can dedicate weekly for study:</label>
            <div className="checkbox-group">
              {["2–4 hrs", "4–6 hrs", "6+ hrs"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="radio"
                    name="timePerWeek"
                    value={option}
                    checked={formData.timePerWeek === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Days */}
          <div className="form-group">
            <label>Preferred days of learning:</label>
            <div className="checkbox-group">
              {["Weekdays", "Weekends"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="radio"
                    name="preferredDays"
                    value={option}
                    checked={formData.preferredDays === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div className="form-section-label">Address</div>
          <div className="form-group">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country *</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {formData.country === "India" && (
            <div className="form-row">
              <div className="form-group">
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required={formData.country === "India"}
                >
                  <option value="">Select State *</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="City *"
                />
              </div>
            </div>
          )}

          {formData.country !== "India" && formData.country && (
            <div className="form-group">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City *"
              />
            </div>
          )}

          {/* Language */}
          <div className="form-group">
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

          {/* Message */}
          <div className="form-group">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional message or questions"
              rows="3"
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
    </>
  );
};

export default EnquiryModal;
