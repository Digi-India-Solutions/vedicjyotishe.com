import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [sidetoggle, setSideToggle] = useState(false);
  const navigate = useNavigate();

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('login'); // Remove login status from sessionStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <h2>Vedic Jyotishe Admin Panel</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>

        <div className={`rightNav ${sidetoggle ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/dashboard" onClick={handletoggleBtn}>
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/all-service-query" onClick={handletoggleBtn}>
                <i className="fa-brands fa-cc-discover"></i> Manage Service Query
              </Link>
            </li>
            <li>
              <Link to="/all-newsletter-query" onClick={handletoggleBtn}>
                <i className="fa-brands fa-cc-discover"></i> News Letter Query
              </Link>
            </li>
            <li>
              <Link to="/all-contact-query" onClick={handletoggleBtn}>
                <i className="fa-brands fa-cc-discover"></i> Contact Inquery
              </Link>
            </li>
            <li>
              <Link to="/all-panchang" onClick={handletoggleBtn}>
                <i className="fa-solid fa-tag"></i> Manage Panchang
              </Link>
            </li>
            <li>
              <Link to="/all-social-media" onClick={handletoggleBtn}>
                <i className="fa-brands fa-unsplash"></i> Manage Social Media
              </Link>
            </li>
            <li>
              <Link to="/all-blogs" onClick={handletoggleBtn}>
                <i className="fa-solid fa-tag"></i> Manage Blogs
              </Link>
            </li>
            <li>
              <Link to="/all-service" onClick={handletoggleBtn}>
                <i className="fa-brands fa-cc-discover"></i> Manage Service
              </Link>
            </li>
            <li>
              <Link to="/all-tagline" onClick={handletoggleBtn}>
                <i className="fa-brands fa-cc-discover"></i> Manage TagLine
              </Link>
            </li>
            <button className="logout mb-5" onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
