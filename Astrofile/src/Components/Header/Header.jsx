import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import brandlogo from "../../Assets/BrandLogo.png";
import { IoMenu } from "react-icons/io5";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import axios from "axios"


const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsNavbarOpen(false); // Close the menu when a link is clicked
  };

  const [service, setService] = useState([])

  const getApiData = async () => {
    try {
      const res = await axios.get("https://www.api.vedicjyotishe.com/api/get-service")
      const data = res.data.data
      const filteData = data.filter((x) => x.dropDownStatus === "True")
      setService(filteData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getApiData()
  }, [])
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="top-info">
              <div className="talk">
                <h5>
                  Talk to Astrologers:{" "}
                  <a href="tel:+916366052167" target="_blank" rel="noopener noreferrer">
                    +91 6366052167
                  </a>
                </h5>
              </div>
              <div className="mailIconInfo">
                <div className="mail">
                  <h5>
                    <a href="mailto:VedicJyotishe@outlook.com" target="_blank" rel="noopener noreferrer">
                      VedicJyotishe@outlook.com
                    </a>
                  </h5>
                </div>
                <div className="vertical-separator"></div>
                <div className="social">
                  <h5>
                    Follow us on{" "}
                    <a href="https://x.com/Dparihar17" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>{" "}
                    <a href="https://www.instagram.com/vedic_jyotishe/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>{" "}
                    <a href="https://www.facebook.com/share/e2cYxP6X9h9YzJ3i/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid ">
            <div className="navbar-brand p-0">
              <Link onClick={() => handleLinkClick("/")} to="/">
                <img src={brandlogo} alt="Vedic Jyotishe" className="navbar-logo" />
              </Link>
            </div>

            <div className="navbar-toggler" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
              <IoMenu className="menu" />
            </div>

            {/* <div> */}
              <ul className={`nav-links ${isNavbarOpen ? "active" : ""}`}>
                <li className={`nav-link ${activeLink === "/" ? "active" : ""}`}>
                  <Link onClick={() => handleLinkClick("/")} className="nav-item-link" to="/">Home</Link>
                </li>
                <li className={`nav-link ${activeLink === "/About" ? "active" : ""}`}>
                  <Link onClick={() => handleLinkClick("/About")} className="nav-item-link" to="/About">About</Link>
                </li>
                <li className="dropdown nav-link">
                  <Link to="#" className="nav-item-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Services
                  </Link>
                  <ul className="dropdown-menu">
                    {
                      service.map((item, index) =>
                        <li className="dropdown-item">
                          <Link onClick={() => handleLinkClick("/Service-Details")} to={`Service-Details/${item.serviceName}`}>{item.serviceName}</Link>
                        </li>
                      )
                    }
                    <li className="dropdown-item">
                      <Link onClick={() => handleLinkClick("/OurServices")} to="/OurServices">More Services...</Link>
                    </li>
                  </ul>
                </li>
                <li className={`nav-link ${activeLink === "/Blog" ? "active" : ""}`}>
                  <Link onClick={() => handleLinkClick("/Blog")} className="nav-item-link" to="/Blog">Blog</Link>
                </li>
                <li className={`nav-link ${activeLink === "/Contact" ? "active" : ""}`}>
                  <Link onClick={() => handleLinkClick("/Contact")} className="nav-item-link" to="/Contact">Contact</Link>
                </li>
                <li className={`nav-link ${activeLink === "/Socialfeed" ? "active" : ""}`}>
                  <Link onClick={() => handleLinkClick("/Socialfeed")} className="nav-item-link" to="/Socialfeed">Social Feed</Link>
                </li>
                <li className="chat-now-button">
                  {/* <div className="btnposition"> */}
                  <a
                    href="https://wa.me/916366052167"
                    target="_blank"
                    className="text-light"
                  >
                    CHAT NOW
                  </a>
                  {/* </div> */}
                </li>
              </ul>
            {/* </div> */}
          </div>
        </nav>
      </section >
    </>
  );
};

export default Header;
