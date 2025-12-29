import React, { useState } from "react";
import "./Footer.css"; // Assuming custom styles are in Footer.css
import logo from "../../Assets/BrandLogo.png";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2


const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setSubmitted(true);
      setError("");
      try {
        const response = await axios.post("https://api.vedicjyotishe.com/api/create-newsletter", { email });
        console.log("Server response:", response.data);
        setEmail("");
        Swal.fire({
          icon: 'success',
          title: 'Subscribed!',
          text: 'Thank you for subscribing to our newsletter.',
          showConfirmButton: false,
          timer: 2000
        });
      } catch (err) {
        console.error("Error submitting email:", err);
        setError("There was an issue submitting your email. Please try again later.");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an issue submitting your email. Please try again later.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else {
      setError("Please enter a valid email address.");
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };



  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3 ">
              <div className="weblogo py-3">
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="imgdesc">
                <p>
                  Contact us for an in-depth analysis of your Kundali chart,
                  tailored to your specific areas of concern. We ensure complete
                  client confidentiality at all times.
                </p>
              </div>
              <div className="socialLogo">
                <div className="link">
                  <a href="https://x.com/Dparihar17" target="_blank">
                    <FaTwitter />
                  </a>
                </div>
                <div className="link">
                  <a href="https://www.instagram.com/vedic_jyotishe/" target="_blank">
                    <FaInstagram />
                  </a>
                </div>
                <div className="link">
                  <a href="https://www.facebook.com/share/e2cYxP6X9h9YzJ3i/" target="_blank">
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-8 mt-5">
              <div className="row">
                <div className="contact-info">
                  <div className="call-info">
                    <div className="phoneicon">
                      <FiPhone className="phone-icon" />
                    </div>
                    <div className="callnumber">
                      <p>Phone</p>
                      <a href="tel:+919193078392" target="_blank">
                        <h5>+91 9193078392</h5>
                      </a>
                    </div>
                  </div>
                  <div className="Email-info">
                    <div className="mailicon">
                      <HiOutlineMailOpen className="mail-icon" />
                    </div>
                    <div className="mailid">
                      <p>Email id</p>
                      <a href="mailto:VedicJyotishe@outlook.com" target="_blank">
                        <h5> VedicJyotishe@outlook.com</h5>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="user-links">
                    <div className="footer-title">
                      <h3>Useful Links</h3>
                    </div>

                    <ul className="footer-links">
                      <li>
                        <Link to="/" className="inner-Link">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/OurServices" className="inner-Link">
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/About" className="inner-Link">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/Contact" className="inner-Link">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 mt-5">
                  <div className="footer-title">
                    <h3>Subscribe</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="email-form">
                    <input
                      type="email"
                      id="email"
                      className={`email-input ${error ? "input-error" : ""}`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <button type="submit" className="submit-btn">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-line" />
          <p>
            All Right Reserved &#169; {new Date().getFullYear()}{" "}
            <Link to={`/`} className="Linkcss">
              <b>Vedic Jyotishe.</b>
            </Link>{" "}
            Design by{" "}
            <Link
              to={
                "https://www.digiindiasolutions.com/?srsltid=AfmBOooMUTT8BKDo97j5M7mV3g5w8sXr8IGV7ovo1j24aNq5ZzOEzwyi"
              }
              className="Linkcss"
            >
              <b>Digi India Solutions</b>
            </Link>{" "}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
